import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useResponsiveProp } from '@shopify/restyle'
import { SharedEventName } from '@uniswap/analytics-events'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useAppDispatch } from 'src/app/hooks'
import { OnboardingStackParamList } from 'src/app/navigation/types'
import { Button, ButtonSize } from 'src/components/buttons/Button'
import { TouchableArea } from 'src/components/buttons/TouchableArea'
import { LandingBackground } from 'src/components/gradients/LandingBackground'
import { Box, Flex } from 'src/components/layout'
import { Screen } from 'src/components/layout/Screen'
import { Text } from 'src/components/Text'
import { useIsDarkMode } from 'src/features/appearance/hooks'
import { createAccountActions } from 'src/features/onboarding/create/createAccountSaga'
import { ImportType, OnboardingEntryPoint } from 'src/features/onboarding/utils'
import { ElementName } from 'src/features/telemetry/constants'
import { OnboardingScreens } from 'src/screens/Screens'
import { openUri } from 'src/utils/linking'
import { hideSplashScreen } from 'src/utils/splashScreen'
import { uniswapUrls } from 'wallet/src/constants/urls'
import {
  PendingAccountActions,
  pendingAccountActions,
} from 'wallet/src/features/wallet/create/pendingAccountsSaga'
import { useTimeout } from 'wallet/src/utils/timing'

type Props = NativeStackScreenProps<OnboardingStackParamList, OnboardingScreens.Landing>

/**
 * Test view for experiment : onboarding-ab-1
 */

export function LandingScreenNew({ navigation }: Props): JSX.Element {
  const dispatch = useAppDispatch()

  const { t } = useTranslation()
  const isDarkMode = useIsDarkMode()

  const onPressCreateWallet = (): void => {
    dispatch(pendingAccountActions.trigger(PendingAccountActions.DELETE))
    dispatch(createAccountActions.trigger())
    navigation.navigate(OnboardingScreens.EditName, {
      importType: ImportType.CreateNew,
      entryPoint: OnboardingEntryPoint.FreshInstallOrReplace,
    })
  }

  const onPressImportWallet = (): void => {
    navigation.navigate(OnboardingScreens.ImportMethod, {
      importType: ImportType.NotYetSelected,
      entryPoint: OnboardingEntryPoint.FreshInstallOrReplace,
    })
  }

  const outerGap = useResponsiveProp({ xs: 'spacing12', sm: 'spacing24' })
  const buttonSize = useResponsiveProp({ xs: ButtonSize.Medium, sm: ButtonSize.Large })
  const pb = useResponsiveProp({ xs: 'spacing12', sm: 'none' })

  // Hides lock screen on next js render cycle, ensuring this component is loaded when the screen is hidden
  useTimeout(hideSplashScreen, 1)

  return (
    <Screen edges={['bottom']}>
      <Flex shrink height="100%" width="100%">
        <LandingBackground />
      </Flex>
      <Flex grow height="auto">
        <Flex grow gap={outerGap} justifyContent="flex-end" mx="spacing16">
          <Button
            hapticFeedback
            eventName={SharedEventName.ELEMENT_CLICKED}
            label={t('Create a new wallet')}
            name={ElementName.CreateAccount}
            size={buttonSize}
            onPress={onPressCreateWallet}
          />
          <TouchableArea
            hapticFeedback
            alignItems="center"
            eventName={SharedEventName.ELEMENT_CLICKED}
            name={ElementName.ImportAccount}
            onPress={onPressImportWallet}>
            <Text color="magentaVibrant" variant="buttonLabelLarge">
              {t('Import or watch a wallet')}
            </Text>
          </TouchableArea>
          <Box mx="spacing24" pb={pb}>
            <Text color="textTertiary" mx="spacing4" textAlign="center" variant="buttonLabelMicro">
              <Trans t={t}>
                By continuing, I agree to the{' '}
                <Text
                  color={isDarkMode ? 'accentActive' : 'accentAction'}
                  variant="buttonLabelMicro"
                  onPress={(): Promise<void> => openUri(uniswapUrls.termsOfServiceUrl)}>
                  Terms of Service
                </Text>{' '}
                and consent to the{' '}
                <Text
                  color={isDarkMode ? 'accentActive' : 'accentAction'}
                  variant="buttonLabelMicro"
                  onPress={(): Promise<void> => openUri(uniswapUrls.privacyPolicyUrl)}>
                  Privacy Policy
                </Text>
                .
              </Trans>
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Screen>
  )
}
