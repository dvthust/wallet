import type { IconProps } from '@tamagui/helpers-icon'
import React, { memo } from 'react'
import { Path, Svg } from 'react-native-svg'
import { getTokenValue, isWeb, useTheme } from 'tamagui'

const Icon: React.FC<IconProps> = (props) => {
  // isWeb currentColor to maintain backwards compat a bit better, on native uses theme color
  const {
    color: colorProp = isWeb ? 'currentColor' : undefined,
    size: sizeProp = '$true',
    strokeWidth: strokeWidthProp,
    ...restProps
  } = props
  const theme = useTheme()

  const size = typeof sizeProp === 'string' ? getTokenValue(sizeProp, 'size') : sizeProp

  const strokeWidth =
    typeof strokeWidthProp === 'string' ? getTokenValue(strokeWidthProp, 'size') : strokeWidthProp

  const color = colorProp ?? theme.color.get()

  const svgProps = {
    ...restProps,
    size,
    strokeWidth,
    color,
  }

  return (
    <Svg fill="none" height={size} stroke={color} viewBox="0 0 18 4" width={size} {...svgProps}>
      <Path
        d="M9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Path
        d="M16 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <Path
        d="M2 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Svg>
  )
}

Icon.displayName = 'TripleDots'

export const TripleDots = memo<IconProps>(Icon)
