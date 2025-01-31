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
    <Svg fill={color} height={size} viewBox="0 0 20 12" width={size} {...svgProps}>
      <Path
        d="M19.75 1V5.15405C19.75 5.56805 19.414 5.90405 19 5.90405C18.586 5.90405 18.25 5.56805 18.25 5.15405V2.81104L12.237 8.82397C11.554 9.50697 10.445 9.50697 9.76201 8.82397L7.17601 6.23804C7.07801 6.14004 6.92002 6.14004 6.82202 6.23804L1.52902 11.531C1.38302 11.677 1.19102 11.751 0.999016 11.751C0.807016 11.751 0.615018 11.678 0.469018 11.531C0.176018 11.238 0.176018 10.763 0.469018 10.47L5.76202 5.177C6.44502 4.494 7.55402 4.494 8.23702 5.177L10.823 7.76294C10.921 7.86094 11.079 7.86094 11.177 7.76294L17.19 1.75H14.847C14.433 1.75 14.097 1.414 14.097 1C14.097 0.586 14.433 0.25 14.847 0.25H19C19.098 0.25 19.195 0.270105 19.287 0.308105C19.47 0.384105 19.616 0.530111 19.692 0.714111C19.73 0.805111 19.75 0.902 19.75 1Z"
        fill={color}
      />
    </Svg>
  )
}

Icon.displayName = 'TrendUp'

export const TrendUp = memo<IconProps>(Icon)
