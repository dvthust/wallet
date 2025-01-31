import React, { useCallback, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { i18n } from 'src/app/i18n'
import { SearchEtherscanItem } from 'src/components/explore/search/items/SearchEtherscanItem'
import { SearchNFTCollectionItem } from 'src/components/explore/search/items/SearchNFTCollectionItem'
import { SearchTokenItem } from 'src/components/explore/search/items/SearchTokenItem'
import { SearchWalletItem } from 'src/components/explore/search/items/SearchWalletItem'
import { SearchResultsLoader } from 'src/components/explore/search/SearchResultsLoader'
import { SectionHeaderText } from 'src/components/explore/search/SearchSectionHeader'
import {
  formatNFTCollectionSearchResults,
  formatTokenSearchResults,
  getSearchResultId,
} from 'src/components/explore/search/utils'
import { AnimatedFlex, Flex } from 'src/components/layout'
import { BaseCard } from 'src/components/layout/BaseCard'
import { Text } from 'src/components/Text'
import {
  NFTCollectionSearchResult,
  SearchResult,
  SearchResultType,
  TokenSearchResult,
  WalletSearchResult,
} from 'src/features/explore/searchHistorySlice'
import { useIsSmartContractAddress } from 'src/features/transactions/transfer/hooks'
import { ChainId } from 'wallet/src/constants/chains'
import { EMPTY_ARRAY } from 'wallet/src/constants/misc'
import { SafetyLevel, useExploreSearchQuery } from 'wallet/src/data/__generated__/types-and-hooks'
import { useENS } from 'wallet/src/features/ens/useENS'
import { logger } from 'wallet/src/features/logger/logger'
import { getValidAddress } from 'wallet/src/utils/addresses'

export const SEARCH_RESULT_HEADER_KEY = 'header'

// Header type used to render header text instead of SearchResult item
export type SearchResultOrHeader =
  | SearchResult
  | { type: typeof SEARCH_RESULT_HEADER_KEY; title: string }

const WalletHeaderItem: SearchResultOrHeader = {
  type: SEARCH_RESULT_HEADER_KEY,
  title: i18n.t('Wallets'),
}
const TokenHeaderItem: SearchResultOrHeader = {
  type: SEARCH_RESULT_HEADER_KEY,
  title: i18n.t('Tokens'),
}
const NFTHeaderItem: SearchResultOrHeader = {
  type: SEARCH_RESULT_HEADER_KEY,
  title: i18n.t('NFT Collections'),
}
const EtherscanHeaderItem: SearchResultOrHeader = {
  type: SEARCH_RESULT_HEADER_KEY,
  title: i18n.t('View on Etherscan'),
}

export interface SearchContext {
  category?: string
  query?: string
  position?: number
  suggestionCount?: number
  isHistory?: boolean // history item click
}

export function SearchResultsSection({ searchQuery }: { searchQuery: string }): JSX.Element {
  const { t } = useTranslation()

  // Search for matching tokens
  const {
    data: searchResultsData,
    loading: searchResultsLoading,
    error,
    refetch,
  } = useExploreSearchQuery({
    variables: { searchQuery, nftCollectionsFilter: { nameQuery: searchQuery } },
  })

  const tokenResults = useMemo<TokenSearchResult[]>(() => {
    if (!searchResultsData || !searchResultsData.searchTokens) return EMPTY_ARRAY
    return formatTokenSearchResults(searchResultsData.searchTokens, searchQuery)
  }, [searchQuery, searchResultsData])

  const nftCollectionResults = useMemo<NFTCollectionSearchResult[]>(() => {
    if (!searchResultsData || !searchResultsData.nftCollections) return EMPTY_ARRAY
    return formatNFTCollectionSearchResults(searchResultsData.nftCollections)
  }, [searchResultsData])

  // Search for matching ENS
  const {
    address: ensAddress,
    name: ensName,
    loading: ensLoading,
  } = useENS(ChainId.Mainnet, searchQuery, true)

  const validAddress: Address | null = getValidAddress(searchQuery, true, false)
    ? searchQuery
    : null

  // Search for matching EOA wallet address
  const { isSmartContractAddress, loading: loadingIsSmartContractAddress } =
    useIsSmartContractAddress(validAddress ?? undefined, ChainId.Mainnet)

  const walletsLoading = ensLoading || loadingIsSmartContractAddress

  const onRetry = useCallback(() => {
    refetch()
  }, [refetch])

  const hasENSResult = ensName && ensAddress
  const hasEOAResult = validAddress && !isSmartContractAddress
  const walletSearchResults: WalletSearchResult[] = useMemo(() => {
    if (hasENSResult) {
      return [
        {
          type: SearchResultType.Wallet,
          address: ensAddress,
          ensName,
        },
      ]
    }
    if (hasEOAResult) {
      return [
        {
          type: SearchResultType.Wallet,
          address: validAddress,
        },
      ]
    }
    return []
  }, [ensAddress, ensName, hasENSResult, hasEOAResult, validAddress])

  const numTotalResults =
    tokenResults.length + nftCollectionResults.length + (hasENSResult || hasEOAResult ? 1 : 0)

  // Only consider queries with the .eth suffix as an exact ENS match
  const exactENSMatch =
    ensName?.toLowerCase() === searchQuery.toLowerCase() && searchQuery.includes('.eth')

  const prefixTokenMatch = tokenResults.find((res: TokenSearchResult) =>
    isPrefixTokenMatch(res, searchQuery)
  )

  const hasVerifiedTokenResults = tokenResults.some(
    (res: TokenSearchResult) =>
      res.safetyLevel === SafetyLevel.Verified || res.safetyLevel === SafetyLevel.MediumWarning
  )
  const hasVerifiedNFTResults = nftCollectionResults.some(
    (res: NFTCollectionSearchResult) => res.isVerified
  )

  const showWalletSectionFirst = exactENSMatch && !prefixTokenMatch
  const showNftCollectionsBeforeTokens = hasVerifiedNFTResults && !hasVerifiedTokenResults

  const sortedSearchResults: SearchResultOrHeader[] = useMemo(() => {
    // Format results arrays with header, and handle empty results
    const nftsWithHeader =
      nftCollectionResults.length > 0 ? [NFTHeaderItem, ...nftCollectionResults] : []
    const tokensWithHeader = tokenResults.length > 0 ? [TokenHeaderItem, ...tokenResults] : []
    const walletsWithHeader =
      walletSearchResults.length > 0 ? [WalletHeaderItem, ...walletSearchResults] : []

    // Rank token and nft results
    const searchResultItems: SearchResultOrHeader[] = showNftCollectionsBeforeTokens
      ? [...nftsWithHeader, ...tokensWithHeader]
      : [...tokensWithHeader, ...nftsWithHeader]

    // Add wallet results at beginning or end
    if (walletsWithHeader.length > 0) {
      if (showWalletSectionFirst) {
        searchResultItems.unshift(...walletsWithHeader)
      } else {
        searchResultItems.push(...walletsWithHeader)
      }
    }

    // Add etherscan items at end
    if (validAddress) {
      searchResultItems.push(EtherscanHeaderItem, {
        type: SearchResultType.Etherscan,
        address: validAddress,
      })
    }

    return searchResultItems
  }, [
    nftCollectionResults,
    showNftCollectionsBeforeTokens,
    showWalletSectionFirst,
    tokenResults,
    validAddress,
    walletSearchResults,
  ])

  if (searchResultsLoading || walletsLoading) return <SearchResultsLoader />

  if (error) {
    return (
      <AnimatedFlex entering={FadeIn} exiting={FadeOut} pt="spacing24">
        <BaseCard.ErrorState
          retryButtonLabel="Retry"
          title={t("Couldn't load search results")}
          onRetry={onRetry}
        />
      </AnimatedFlex>
    )
  }

  return (
    <Flex grow gap="spacing8">
      <FlatList
        ListEmptyComponent={
          <AnimatedFlex entering={FadeIn} exiting={FadeOut} gap="spacing8" mx="spacing8">
            <Text color="textSecondary" variant="bodyLarge">
              <Trans t={t}>
                No results found for <Text color="textPrimary">"{searchQuery}"</Text>
              </Trans>
            </Text>
          </AnimatedFlex>
        }
        data={sortedSearchResults}
        keyExtractor={getSearchResultId}
        listKey="wallets"
        renderItem={(props): JSX.Element | null => {
          // Find position of search result in list, but exclude header items
          const position =
            props.item.type === SEARCH_RESULT_HEADER_KEY
              ? undefined
              : props.index +
                1 -
                sortedSearchResults
                  .slice(0, props.index + 1)
                  .filter((item) => item.type === SEARCH_RESULT_HEADER_KEY).length
          return renderSearchItem({
            ...props,
            searchContext: {
              query: searchQuery,
              suggestionCount: numTotalResults,
              position,
            },
          })
        }}
      />
    </Flex>
  )
}

// Render function for FlatList of SearchResult items
export const renderSearchItem = ({
  item: searchResult,
  searchContext,
  index,
}: ListRenderItemInfo<SearchResultOrHeader> & {
  searchContext?: SearchContext
}): JSX.Element | null => {
  switch (searchResult.type) {
    case SEARCH_RESULT_HEADER_KEY:
      return <SectionHeaderText mt={index === 0 ? 'none' : 'spacing8'} title={searchResult.title} />
    case SearchResultType.Token:
      return <SearchTokenItem searchContext={searchContext} token={searchResult} />
    case SearchResultType.Wallet:
      return <SearchWalletItem searchContext={searchContext} wallet={searchResult} />
    case SearchResultType.NFTCollection:
      return <SearchNFTCollectionItem collection={searchResult} searchContext={searchContext} />
    case SearchResultType.Etherscan:
      return <SearchEtherscanItem etherscanResult={searchResult} />
    default:
      logger.warn(
        'SearchResultsSection',
        'renderSearchItem',
        `Found invalid list item in search results: ${JSON.stringify(searchResult)}`
      )
      return null
  }
}

function isPrefixTokenMatch(searchResult: TokenSearchResult, query: string): boolean {
  return (
    searchResult.name?.toLowerCase().startsWith(query.toLowerCase()) ||
    searchResult.symbol.toLowerCase().startsWith(query.toLowerCase())
  )
}
