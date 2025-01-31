import type { IconProps } from '@tamagui/helpers-icon'
import React, { memo } from 'react'
import { Path, Svg } from 'react-native-svg'
import { getTokenValue, useTheme } from 'tamagui'

const Icon: React.FC<IconProps> = (props) => {
  // isWeb currentColor to maintain backwards compat a bit better, on native uses theme color
  const {
    color: colorProp = '#3396FF',
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
    <Svg fill="none" height={size} viewBox="0 0 27 24" width={size} {...svgProps}>
      <Path
        d="M11 3H8C7.46957 3 6.96086 3.21071 6.58579 3.58579C6.21071 3.96086 6 4.46957 6 5V8M24 8V5C24 4.46957 23.7893 3.96086 23.4142 3.58579C23.0391 3.21071 22.5304 3 22 3H19M19 21H22C22.5304 21 23.0391 20.7893 23.4142 20.4142C23.7893 20.0391 24 19.5304 24 19V16"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <Path
        d="M2.86609 15.5631C5.1492 13.479 8.8508 13.479 11.1339 15.5631L11.4087 15.8139C11.5228 15.9181 11.5228 16.087 11.4087 16.1912L10.4687 17.0493C10.4117 17.1014 10.3191 17.1014 10.262 17.0493L9.88393 16.7041C8.29117 15.2502 5.70882 15.2502 4.11607 16.7041L3.71115 17.0737C3.65407 17.1258 3.56151 17.1258 3.50443 17.0737L2.5645 16.2157C2.45035 16.1115 2.45035 15.9426 2.5645 15.8384L2.86609 15.5631ZM13.0778 17.3375L13.9144 18.1012C14.0285 18.2053 14.0285 18.3743 13.9144 18.4785L10.1423 21.9218C10.0281 22.0261 9.84304 22.0261 9.72888 21.9218L7.0517 19.478C7.02315 19.452 6.97688 19.452 6.94833 19.478L4.27119 21.9218C4.15703 22.0261 3.97195 22.0261 3.8578 21.9218L0.0856151 18.4785C-0.0285384 18.3743 -0.0285384 18.2053 0.0856151 18.1011L0.92216 17.3375C1.03632 17.2333 1.2214 17.2333 1.33555 17.3375L4.0128 19.7813C4.04132 19.8074 4.08762 19.8074 4.11614 19.7813L6.79324 17.3375C6.9074 17.2333 7.09248 17.2333 7.20664 17.3375L9.88389 19.7813C9.91241 19.8074 9.95871 19.8074 9.98723 19.7813L12.6644 17.3375C12.7786 17.2333 12.9637 17.2333 13.0778 17.3375V17.3375Z"
        fill={color ?? '#3396FF'}
      />
    </Svg>
  )
}

Icon.displayName = 'ScanQrWc'

export const ScanQrWc = memo<IconProps>(Icon)
