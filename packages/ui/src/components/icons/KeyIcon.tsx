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
    <Svg fill="none" height={size} stroke={color} viewBox="0 0 15 15" width={size} {...svgProps}>
      <Path
        d="M10.0722 4.86901L12.2799 2.6614M13.5413 1.3999L12.2799 2.6614L13.5413 1.3999ZM7.47987 7.46138C7.80555 7.78273 8.06445 8.16532 8.24166 8.58713C8.41887 9.00895 8.51089 9.46165 8.51242 9.91917C8.51395 10.3767 8.42497 10.83 8.25059 11.253C8.07621 11.676 7.81988 12.0603 7.49636 12.3838C7.17284 12.7073 6.78852 12.9637 6.36553 13.1381C5.94254 13.3124 5.48923 13.4014 5.03171 13.3999C4.57418 13.3984 4.12148 13.3063 3.69967 13.1291C3.27786 12.9519 2.89526 12.693 2.57392 12.3673C1.94199 11.7131 1.59232 10.8367 1.60023 9.92716C1.60813 9.01757 1.97298 8.14747 2.61618 7.50427C3.25938 6.86107 4.12947 6.49623 5.03906 6.48832C5.94865 6.48042 6.82496 6.83009 7.47924 7.46201L7.47987 7.46138ZM7.47987 7.46138L10.0722 4.86901L7.47987 7.46138ZM10.0722 4.86901L11.9645 6.76125L14.1721 4.55364L12.2799 2.6614L10.0722 4.86901Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  )
}

Icon.displayName = 'KeyIcon'

export const KeyIcon = memo<IconProps>(Icon)
