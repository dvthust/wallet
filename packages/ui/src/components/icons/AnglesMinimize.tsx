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
    <Svg fill="none" height={size} viewBox="0 0 18 18" width={size} {...svgProps}>
      <Path
        d="M12.5302 12.9698C12.8235 13.263 12.8235 13.7371 12.5302 14.0303C12.384 14.1766 12.192 14.25 12 14.25C11.808 14.25 11.6159 14.1766 11.4697 14.0303L8.99997 11.5606L6.53024 14.0303C6.23699 14.3236 5.76294 14.3236 5.46969 14.0303C5.17644 13.7371 5.17644 13.263 5.46969 12.9698L8.46969 9.96975C8.76294 9.6765 9.23699 9.6765 9.53024 9.96975L12.5302 12.9698ZM8.46969 8.0303C8.61594 8.17655 8.80797 8.25003 8.99997 8.25003C9.19197 8.25003 9.38399 8.17655 9.53024 8.0303L12.5302 5.0303C12.8235 4.73705 12.8235 4.263 12.5302 3.96975C12.237 3.6765 11.7629 3.6765 11.4697 3.96975L8.99997 6.43948L6.53024 3.96975C6.23699 3.6765 5.76294 3.6765 5.46969 3.96975C5.17644 4.263 5.17644 4.73705 5.46969 5.0303L8.46969 8.0303Z"
        fill={color}
      />
    </Svg>
  )
}

Icon.displayName = 'AnglesMinimize'

export const AnglesMinimize = memo<IconProps>(Icon)
