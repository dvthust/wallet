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
    <Svg fill={color} height={size} viewBox="0 0 19 21" width={size} {...svgProps}>
      <Path
        d="M9.75 3.74512V1.49512L14.25 5.99512H12C10.42 5.99512 9.75 5.32512 9.75 3.74512ZM11.75 14.3451V14.7451C11.26 15.2451 11 15.9451 11 16.7951V18.4451C11 18.6151 10.87 18.7451 10.7 18.7451H3C1 18.7451 0 17.7451 0 15.7451V3.74512C0 1.74512 1 0.745117 3 0.745117H8.25V3.74512C8.25 6.16512 9.58 7.49512 12 7.49512H15V10.3851C15 10.5351 14.9 10.6451 14.75 10.6751C13.04 11.0151 11.75 12.5351 11.75 14.3451ZM4.75 13.7451C4.75 13.3311 4.414 12.9951 4 12.9951C3.586 12.9951 3.25 13.3311 3.25 13.7451C3.25 14.1591 3.586 14.4951 4 14.4951C4.414 14.4951 4.75 14.1591 4.75 13.7451ZM4.75 9.74512C4.75 9.33112 4.414 8.99512 4 8.99512C3.586 8.99512 3.25 9.33112 3.25 9.74512C3.25 10.1591 3.586 10.4951 4 10.4951C4.414 10.4951 4.75 10.1591 4.75 9.74512ZM8.75 13.7451C8.75 13.3311 8.414 12.9951 8 12.9951H6.5C6.086 12.9951 5.75 13.3311 5.75 13.7451C5.75 14.1591 6.086 14.4951 6.5 14.4951H8C8.414 14.4951 8.75 14.1591 8.75 13.7451ZM11.75 9.74512C11.75 9.33112 11.414 8.99512 11 8.99512H6.5C6.086 8.99512 5.75 9.33112 5.75 9.74512C5.75 10.1591 6.086 10.4951 6.5 10.4951H11C11.414 10.4951 11.75 10.1591 11.75 9.74512ZM18.5 16.7951V18.8951C18.5 19.7951 18.0499 20.2451 17.1499 20.2451H13.8501C12.9501 20.2451 12.5 19.7951 12.5 18.8951V16.7951C12.5 16.1251 12.751 15.7061 13.25 15.5351V14.3451C13.25 13.1041 14.26 12.0951 15.5 12.0951C16.74 12.0951 17.75 13.1041 17.75 14.3451V15.5351C18.249 15.7061 18.5 16.1251 18.5 16.7951ZM16.25 14.3451C16.25 13.9311 15.913 13.5951 15.5 13.5951C15.087 13.5951 14.75 13.9311 14.75 14.3451V15.4451H16.25V14.3451Z"
        fill={color}
      />
    </Svg>
  )
}

Icon.displayName = 'ViewPhrase'

export const ViewPhrase = memo<IconProps>(Icon)
