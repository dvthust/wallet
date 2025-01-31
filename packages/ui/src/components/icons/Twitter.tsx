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
    <Svg fill="none" height={size} viewBox="0 0 16 13" width={size} {...svgProps}>
      <Path
        d="M13.955 2.99252C13.9625 3.12002 13.9625 3.25501 13.9625 3.39001C13.9625 7.39501 10.8725 12.0075 5.21749 12.0075C3.47749 12.0075 1.8575 11.5125 0.5 10.65C0.7475 10.68 0.987504 10.6875 1.2425 10.6875C2.6825 10.6875 4.0025 10.2075 5.06 9.39751C3.71 9.36751 2.5775 8.49751 2.1875 7.29751C2.375 7.32751 2.57 7.34251 2.765 7.34251C3.0425 7.34251 3.32 7.30501 3.575 7.23751C2.165 6.95251 1.1075 5.73751 1.1075 4.26751V4.23001C1.52 4.45501 1.9925 4.59751 2.495 4.61251C1.67 4.06501 1.1225 3.14251 1.1225 2.09251C1.1225 1.53001 1.2725 1.01251 1.5425 0.562511C3.0575 2.40001 5.33 3.60001 7.88 3.73501C7.835 3.51001 7.805 3.27751 7.805 3.04501C7.805 1.37251 9.1775 0.0150146 10.88 0.0150146C11.765 0.0150146 12.5675 0.382506 13.1225 0.967506C13.82 0.840006 14.48 0.585017 15.0725 0.240017C14.8475 0.945017 14.36 1.53751 13.7225 1.90501C14.3375 1.83751 14.9375 1.67251 15.4925 1.44001C15.0725 2.04001 14.5475 2.57251 13.9475 3.00751L13.955 2.99252Z"
        fill={color}
      />
    </Svg>
  )
}

Icon.displayName = 'Twitter'

export const Twitter = memo<IconProps>(Icon)
