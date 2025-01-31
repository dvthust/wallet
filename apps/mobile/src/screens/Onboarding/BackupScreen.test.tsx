import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { AppStackParamList, OnboardingStackParamList } from 'src/app/navigation/types'
import { ImportType, OnboardingEntryPoint } from 'src/features/onboarding/utils'
import { BackupScreen } from 'src/screens/Onboarding/BackupScreen'
import { OnboardingScreens, Screens } from 'src/screens/Screens'
import { mockWalletPreloadedState } from 'src/test/fixtures'
import { renderWithProviders } from 'src/test/render'
import { render } from 'src/test/test-utils'

const navigationProp = {} as CompositeNavigationProp<
  StackNavigationProp<OnboardingStackParamList, OnboardingScreens.Backup, undefined>,
  NativeStackNavigationProp<AppStackParamList, Screens.Education, undefined>
>
const routeProp = {
  params: {
    importType: ImportType.CreateNew,
    entryPoint: OnboardingEntryPoint.FreshInstallOrReplace,
  },
} as RouteProp<OnboardingStackParamList, OnboardingScreens.Backup>

describe(BackupScreen, () => {
  it('renders backup options when none are completed', async () => {
    const tree = render(<BackupScreen navigation={navigationProp} route={routeProp} />)
    expect(tree.toJSON()).toMatchSnapshot()
  })

  it('renders backup options when some are completed', async () => {
    const tree = renderWithProviders(
      <BackupScreen navigation={navigationProp} route={routeProp} />,
      {
        preloadedState: mockWalletPreloadedState,
      }
    )
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
