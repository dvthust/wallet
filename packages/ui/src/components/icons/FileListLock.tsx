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
    <Svg fill={color} height={size} viewBox="0 0 19 20" width={size} {...svgProps}>
      <Path
        d="M9.74982 3.00003V0.750031L14.2498 5.25003H11.9998C10.4198 5.25003 9.74982 4.58003 9.74982 3.00003ZM11.7498 13.6V14C11.2598 14.5 10.9998 15.2 10.9998 16.05V17.7C10.9998 17.87 10.8698 18 10.6998 18H2.99982C0.999817 18 -0.000183105 17 -0.000183105 15V3.00003C-0.000183105 1.00003 0.999817 3.05176e-05 2.99982 3.05176e-05H8.24982V3.00003C8.24982 5.42003 9.57982 6.75003 11.9998 6.75003H14.9998V9.64005C14.9998 9.79004 14.8998 9.90002 14.7498 9.93002C13.0398 10.27 11.7498 11.79 11.7498 13.6ZM4.74982 13C4.74982 12.586 4.41382 12.25 3.99982 12.25C3.58582 12.25 3.24982 12.586 3.24982 13C3.24982 13.414 3.58582 13.75 3.99982 13.75C4.41382 13.75 4.74982 13.414 4.74982 13ZM4.74982 9.00003C4.74982 8.58603 4.41382 8.25003 3.99982 8.25003C3.58582 8.25003 3.24982 8.58603 3.24982 9.00003C3.24982 9.41403 3.58582 9.75003 3.99982 9.75003C4.41382 9.75003 4.74982 9.41403 4.74982 9.00003ZM8.74982 13C8.74982 12.586 8.41382 12.25 7.99982 12.25H6.49982C6.08582 12.25 5.74982 12.586 5.74982 13C5.74982 13.414 6.08582 13.75 6.49982 13.75H7.99982C8.41382 13.75 8.74982 13.414 8.74982 13ZM11.7498 9.00003C11.7498 8.58603 11.4138 8.25003 10.9998 8.25003H6.49982C6.08582 8.25003 5.74982 8.58603 5.74982 9.00003C5.74982 9.41403 6.08582 9.75003 6.49982 9.75003H10.9998C11.4138 9.75003 11.7498 9.41403 11.7498 9.00003ZM18.4998 16.05V18.15C18.4998 19.05 18.0497 19.5 17.1497 19.5H13.8499C12.9499 19.5 12.4998 19.05 12.4998 18.15V16.05C12.4998 15.38 12.7508 14.961 13.2498 14.79V13.6C13.2498 12.359 14.2598 11.35 15.4998 11.35C16.7398 11.35 17.7498 12.359 17.7498 13.6V14.79C18.2488 14.961 18.4998 15.38 18.4998 16.05ZM16.2498 13.6C16.2498 13.186 15.9128 12.85 15.4998 12.85C15.0868 12.85 14.7498 13.186 14.7498 13.6V14.7H16.2498V13.6Z"
        fill={color}
      />
    </Svg>
  )
}

Icon.displayName = 'FileListLock'

export const FileListLock = memo<IconProps>(Icon)
