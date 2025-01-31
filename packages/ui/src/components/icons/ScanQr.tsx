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
    <Svg fill="none" height={size} viewBox="0 0 22 22" width={size} {...svgProps}>
      <Path
        d="M6.92609 1.83331H3.87053C3.33028 1.83331 2.81215 2.04793 2.43013 2.42995C2.04811 2.81197 1.8335 3.33009 1.8335 3.87035V6.92591M20.1668 6.92591V3.87035C20.1668 3.33009 19.9522 2.81197 19.5702 2.42995C19.1882 2.04793 18.67 1.83331 18.1298 1.83331H15.0742M15.0742 20.1666H18.1298C18.67 20.1666 19.1882 19.952 19.5702 19.57C19.9522 19.188 20.1668 18.6699 20.1668 18.1296V15.0741M1.8335 15.0741V18.1296C1.8335 18.6699 2.04811 19.188 2.43013 19.57C2.81215 19.952 3.33028 20.1666 3.87053 20.1666H6.92609M12.1829 12.1827V14.5483M12.1829 16.9139H14.5484V12.1827M14.5482 13.3654H16.9138M16.914 15.7311V16.9139M5.67739 5.08581H9.22578C9.5524 5.08581 9.81717 5.35059 9.81717 5.67721V9.22559C9.81717 9.55221 9.5524 9.81699 9.22578 9.81699H5.67739C5.35077 9.81699 5.08599 9.55221 5.08599 9.22559V5.67721C5.08599 5.35059 5.35077 5.08581 5.67739 5.08581ZM5.67739 12.1827H9.22578C9.5524 12.1827 9.81717 12.4475 9.81717 12.7741V16.3225C9.81717 16.6491 9.5524 16.9139 9.22578 16.9139H5.67739C5.35077 16.9139 5.08599 16.6491 5.08599 16.3225V12.7741C5.08599 12.4475 5.35077 12.1827 5.67739 12.1827ZM12.7743 5.08581H16.3226C16.6493 5.08581 16.914 5.35059 16.914 5.67721V9.22559C16.914 9.55221 16.6493 9.81699 16.3226 9.81699H12.7743C12.4476 9.81699 12.1829 9.55221 12.1829 9.22559V5.67721C12.1829 5.35059 12.4476 5.08581 12.7743 5.08581Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </Svg>
  )
}

Icon.displayName = 'ScanQr'

export const ScanQr = memo<IconProps>(Icon)
