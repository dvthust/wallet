import type { IconProps } from '@tamagui/helpers-icon'
import React, { memo } from 'react'
import { Path, Svg } from 'react-native-svg'
import { getTokenValue, useTheme } from 'tamagui'

const Icon: React.FC<IconProps> = (props) => {
  // isWeb currentColor to maintain backwards compat a bit better, on native uses theme color
  const {
    color: colorProp = '#627EEA',
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
    <Svg fill="none" height={size} viewBox="0 0 18 19" width={size} {...svgProps}>
      <Path
        d="M8.39221 4.7498C8.42146 4.7903 8.43726 4.84054 8.43726 4.89079V14.7863C8.43726 14.955 8.25951 15.057 8.10876 14.982C6.32001 14.0895 4.5252 14.0918 2.73645 14.6011C2.48895 14.6686 2.24902 14.4961 2.24902 14.2486V4.49107C2.24902 4.34632 2.33221 4.20981 2.46271 4.14756C3.69421 3.56106 5.00001 3.39525 6.35901 3.56025C7.20276 3.66225 7.92496 4.10855 8.39221 4.7498ZM15.7498 4.49024V14.2478C15.7498 14.4953 15.5098 14.6678 15.2623 14.6003C13.4743 14.0911 11.6795 14.0888 9.89001 14.9813C9.73926 15.0563 9.56152 14.9543 9.56152 14.7855V4.89005C9.56152 4.8398 9.57732 4.78956 9.60657 4.74906C10.0738 4.10781 10.7968 3.66152 11.639 3.55952C12.998 3.39452 14.3046 3.55958 15.5353 4.14683C15.6666 4.20908 15.7498 4.34549 15.7498 4.49024ZM13.3123 9.50028C13.3123 9.18978 13.0603 8.93778 12.7498 8.93778H11.2498C10.9393 8.93778 10.6873 9.18978 10.6873 9.50028C10.6873 9.81078 10.9393 10.0628 11.2498 10.0628H12.7498C13.0603 10.0628 13.3123 9.81078 13.3123 9.50028ZM14.0623 7.25028C14.0623 6.93978 13.8103 6.68778 13.4998 6.68778H11.2498C10.9393 6.68778 10.6873 6.93978 10.6873 7.25028C10.6873 7.56078 10.9393 7.81278 11.2498 7.81278H13.4998C13.8103 7.81278 14.0623 7.56078 14.0623 7.25028Z"
        fill={color ?? '#627EEA'}
      />
    </Svg>
  )
}

Icon.displayName = 'Book'

export const Book = memo<IconProps>(Icon)
