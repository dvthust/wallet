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
    <Svg fill="none" height={size} viewBox="0 0 12 12" width={size} {...svgProps}>
      <Path
        d="M6.33333 12H5.66667C5 12 4.66667 11.6667 4.66667 11V1C4.66667 0.333333 5 0 5.66667 0H6.33333C7 0 7.33333 0.333333 7.33333 1V11C7.33333 11.6667 7 12 6.33333 12ZM12 11V4.33333C12 3.66667 11.6667 3.33333 11 3.33333H10.3333C9.66667 3.33333 9.33333 3.66667 9.33333 4.33333V11C9.33333 11.6667 9.66667 12 10.3333 12H11C11.6667 12 12 11.6667 12 11ZM2.66667 11V7C2.66667 6.33333 2.33333 6 1.66667 6H1C0.333333 6 0 6.33333 0 7V11C0 11.6667 0.333333 12 1 12H1.66667C2.33333 12 2.66667 11.6667 2.66667 11Z"
        fill={color}
      />
    </Svg>
  )
}

Icon.displayName = 'ChartBar'

export const ChartBar = memo<IconProps>(Icon)
