import * as React from 'react';
import Svg, { SvgProps, Mask, Path, G } from 'react-native-svg';

type SvgComponentProps = SvgProps & {
  color?: string;
};

const SvgComponent = ({ color = '#DBB33A', ...props }: SvgComponentProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <Mask
      id="a"
      width={16}
      height={16}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <Path fill="#D9D9D9" d="M0 0h16v16H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={color}
        d="M4 12.667h2v-4h4v4h2v-6l-4-3-4 3v6ZM2.667 14V6L8 2l5.333 4v8H8.667v-4H7.333v4H2.667Z"
      />
    </G>
  </Svg>
);
export default SvgComponent;
