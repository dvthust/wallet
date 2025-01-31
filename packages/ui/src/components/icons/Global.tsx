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
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size} {...svgProps}>
      <Path
        d="M6.82977 12.75C6.97977 15.83 8.01977 18.97 9.82977 21.76C5.58977 20.82 2.35979 17.19 2.02979 12.75H6.82977ZM9.82977 2.23999C5.58977 3.17999 2.35979 6.81 2.02979 11.25H6.82977C6.97977 8.17 8.01977 5.02999 9.82977 2.23999ZM12.1998 2H11.7998L11.4998 2.42999C9.59979 5.12999 8.48977 8.23 8.32977 11.25H15.6698C15.5098 8.23 14.3998 5.12999 12.4998 2.42999L12.1998 2ZM8.32977 12.75C8.48977 15.77 9.59979 18.87 11.4998 21.57L11.7998 22H12.1998L12.4998 21.57C14.3998 18.87 15.5098 15.77 15.6698 12.75H8.32977ZM17.1698 12.75C17.0198 15.83 15.9798 18.97 14.1698 21.76C18.4098 20.82 21.6398 17.19 21.9698 12.75H17.1698ZM21.9698 11.25C21.6398 6.81 18.4098 3.17999 14.1698 2.23999C15.9798 5.02999 17.0198 8.17 17.1698 11.25H21.9698Z"
        fill={color}
      />
    </Svg>
  )
}

Icon.displayName = 'Global'

export const Global = memo<IconProps>(Icon)
