import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonEmphasis } from 'src/components/buttons/Button'
import { TouchableArea } from 'src/components/buttons/TouchableArea'
import { AnimatedFlex, Flex } from 'src/components/layout'
import { Text } from 'src/components/Text'
import { ElementName } from 'src/features/telemetry/constants'
import { StatusAnimation } from 'src/features/transactions/TransactionPending/StatusAnimation'
import { openTransactionLink } from 'src/utils/linking'
import { ChainId } from 'wallet/src/constants/chains'
import { TransactionDetails, TransactionStatus } from 'wallet/src/features/transactions/types'

type TransactionStatusProps = {
  transaction: TransactionDetails | undefined
  chainId: ChainId
  title: string
  description: string
  onNext: () => void
  onTryAgain: () => void
  transactionType: 'swap' | 'send'
}

function isFinalizedState(status: TransactionStatus): boolean {
  return status === TransactionStatus.Success || status === TransactionStatus.Failed
}

export function TransactionPending({
  transaction,
  title,
  description,
  onNext,
  onTryAgain,
  transactionType,
}: TransactionStatusProps): JSX.Element {
  const { t } = useTranslation()

  const onPressViewTransaction = (): void => {
    if (transaction) {
      openTransactionLink(transaction.hash, transaction.chainId)
    }
  }

  return (
    <AnimatedFlex grow px="spacing12">
      <Flex grow alignItems="center" justifyContent="flex-start" paddingTop="spacing60">
        <Flex alignItems="center" justifyContent="flex-end" paddingTop="spacing16">
          <StatusAnimation status={transaction?.status} transactionType={transactionType} />
        </Flex>
        <Flex alignItems="center" gap="spacing12" justifyContent="flex-start">
          <Text variant="headlineSmall">{title}</Text>
          <Text color="textTertiary" textAlign="center" variant="bodyLarge">
            {description}
          </Text>
          {transaction?.status === TransactionStatus.Failed ? (
            <TouchableArea onPress={onTryAgain}>
              <Text color="accentAction" variant="bodyLarge">
                {t('Try again')}
              </Text>
            </TouchableArea>
          ) : null}
        </Flex>
      </Flex>
      {transaction && isFinalizedState(transaction.status) ? (
        <Button
          emphasis={ButtonEmphasis.Tertiary}
          label={t('View transaction')}
          onPress={onPressViewTransaction}
        />
      ) : null}
      <Button label={t('Close')} name={ElementName.OK} onPress={onNext} />
    </AnimatedFlex>
  )
}
