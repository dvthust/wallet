import React from 'react'
import { FadeIn, FadeOut, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { AnimatedFlex } from 'src/components/layout'
import { Text } from 'src/components/Text'
import { Theme } from 'ui/src/theme/restyle/theme'

export const BANNER_HEIGHT = 45

export type BottomBannerProps = {
  text: string
  icon?: JSX.Element
  backgroundColor?: keyof Theme['colors']
  translateY?: number
}

export function BottomBanner({
  text,
  icon,
  backgroundColor,
  translateY,
}: BottomBannerProps): JSX.Element {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        // need to check for undefined since 0 is falsy
        translateY: withTiming(translateY !== undefined ? -1 * translateY : -1 * BANNER_HEIGHT, {
          duration: 200,
        }),
      },
    ],
  }))

  return (
    <AnimatedFlex
      row
      alignContent="center"
      alignItems="center"
      alignSelf="stretch"
      backgroundColor={backgroundColor ? backgroundColor : 'accentActive'}
      borderColor="backgroundOutline"
      borderRadius="rounded8"
      borderWidth={1}
      bottom={0}
      entering={FadeIn}
      exiting={FadeOut}
      gap="spacing12"
      height={BANNER_HEIGHT}
      justifyContent="flex-start"
      left={0}
      mx="spacing12"
      p="spacing8"
      position="absolute"
      right={0}
      style={animatedStyle}
      zIndex="modal">
      {icon}
      <Text variant="bodySmall">{text}</Text>
    </AnimatedFlex>
  )
}
