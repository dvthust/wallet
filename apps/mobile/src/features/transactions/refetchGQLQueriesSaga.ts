import { GQLQueries } from 'src/data/queries'
import { apolloClient } from 'src/data/usePersistedApolloClient'
import { sendAnalyticsEvent } from 'src/features/telemetry'
import { MobileEventName } from 'src/features/telemetry/constants'
import { delay } from 'typed-redux-saga'
import { PollingInterval } from 'wallet/src/constants/misc'
import {
  PortfolioBalancesDocument,
  PortfolioBalancesQuery,
} from 'wallet/src/data/__generated__/types-and-hooks'
import { fromGraphQLChain } from 'wallet/src/features/chains/utils'
import { TransactionDetails, TransactionType } from 'wallet/src/features/transactions/types'
import {
  buildCurrencyId,
  buildNativeCurrencyId,
  buildWrappedNativeCurrencyId,
  CurrencyId,
  getNativeCurrencyAddressForChain,
} from 'wallet/src/utils/currencyId'
import { ONE_SECOND_MS } from 'wallet/src/utils/time'

type CurrencyIdToBalance = Record<CurrencyId, number>

const REFETCH_INTERVAL = ONE_SECOND_MS
const MAX_REFETCH_ATTEMPTS = PollingInterval.Fast / REFETCH_INTERVAL

export function* refetchGQLQueries(transaction: TransactionDetails) {
  const owner = transaction.from
  const currenciesWithBalToUpdate = getCurrenciesWithExpectedUpdates(transaction)
  const currencyIdToStartingBalance = readBalancesFromCache(owner, currenciesWithBalToUpdate)

  // when there is a new local tx wait 1s then proactively refresh portfolio and activity queries
  yield* delay(REFETCH_INTERVAL)
  apolloClient?.refetchQueries({
    include: [GQLQueries.PortfolioBalances, GQLQueries.TransactionList],
  })

  if (!currencyIdToStartingBalance) return

  let freshnessLag = REFETCH_INTERVAL
  // poll every second until the cache has updated balances for the relevant currencies
  for (let i = 0; i < MAX_REFETCH_ATTEMPTS; i += 1) {
    const currencyIdToUpdatedBalance = readBalancesFromCache(owner, currenciesWithBalToUpdate)
    if (checkIfBalancesUpdated(currencyIdToStartingBalance, currencyIdToUpdatedBalance)) break

    yield* delay(REFETCH_INTERVAL)
    apolloClient?.refetchQueries({
      include: [GQLQueries.PortfolioBalances, GQLQueries.TransactionList],
    })

    freshnessLag += REFETCH_INTERVAL
  }

  sendAnalyticsEvent(MobileEventName.PortfolioBalanceFreshnessLag, {
    freshnessLag,
    updatedCurrencies: Object.keys(currencyIdToStartingBalance),
  })
}

// based on transaction data, determine which currencies we expect to see a balance update on
function getCurrenciesWithExpectedUpdates(
  transaction: TransactionDetails
): Set<CurrencyId> | undefined {
  const currenciesWithBalToUpdate: Set<CurrencyId> = new Set()
  const txChainId = transaction.chainId

  if (transaction.typeInfo.type === TransactionType.FiatPurchase) return undefined

  // All txs besides FOR at least use gas so check for update of gas token
  currenciesWithBalToUpdate.add(buildNativeCurrencyId(txChainId))

  switch (transaction.typeInfo.type) {
    case TransactionType.Swap:
      currenciesWithBalToUpdate.add(transaction.typeInfo.inputCurrencyId.toLowerCase())
      currenciesWithBalToUpdate.add(transaction.typeInfo.outputCurrencyId.toLowerCase())
      break
    case TransactionType.Send:
      currenciesWithBalToUpdate.add(
        buildCurrencyId(txChainId, transaction.typeInfo.tokenAddress).toLowerCase()
      )
      break
    case TransactionType.Wrap:
      currenciesWithBalToUpdate.add(buildWrappedNativeCurrencyId(txChainId))
      break
  }

  return currenciesWithBalToUpdate
}

function readBalancesFromCache(
  owner: string,
  currencyIds: Set<CurrencyId> | undefined
): CurrencyIdToBalance | undefined {
  if (!currencyIds?.size) return undefined
  const currencyIdsToUpdate = new Set(currencyIds)

  const currencyIdToBalance: CurrencyIdToBalance = Array.from(currencyIdsToUpdate).reduce(
    (currIdToBal, currencyId) => ({ ...currIdToBal, [currencyId]: 0 }), // assume 0 balance and update later if found in cache
    {}
  )

  const cachedBalancesData: Maybe<PortfolioBalancesQuery> = apolloClient?.readQuery({
    query: PortfolioBalancesDocument,
    variables: { ownerAddress: owner },
  })

  for (const tokenData of cachedBalancesData?.portfolios?.[0]?.tokenBalances ?? []) {
    const chainId = fromGraphQLChain(tokenData?.token?.chain)
    if (!chainId) continue

    // backend represents native currency addresses as null but client uses a reserved address
    const tokenAddress = tokenData?.token?.address ?? getNativeCurrencyAddressForChain(chainId)
    const currencyId = buildCurrencyId(chainId, tokenAddress).toLowerCase()

    if (currencyIdsToUpdate.has(currencyId)) {
      currencyIdsToUpdate.delete(currencyId)
      currencyIdToBalance[currencyId] = tokenData?.quantity ?? 0
    }

    if (!currencyIdsToUpdate.size) break
  }

  return currencyIdToBalance
}

function checkIfBalancesUpdated(
  balance1: CurrencyIdToBalance,
  balance2: Maybe<CurrencyIdToBalance>
) {
  if (!balance2) return true // if no currencies to check, then assume balances are updated
  const currencyIds = Object.keys(balance1)
  for (const currencyId of currencyIds) {
    if (balance1[currencyId] === balance2[currencyId]) return false
  }

  return true
}
