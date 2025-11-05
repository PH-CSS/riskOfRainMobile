// components/Icons/HomeIcon.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HomeIconProps {
  color?: string;
  size?: number;
}

export const HomeIcon: React.FC<HomeIconProps> = ({ 
  color = "#DBB33A", 
  size = 24 
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Telhado */}
    <Path 
      d="M3 10L12 3L21 10" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Corpo da casa */}
    <Path 
      d="M5 10V19C5 19.5523 5.44772 20 6 20H9V16C9 15.4477 9.44772 15 10 15H14C14.5523 15 15 15.4477 15 16V20H18C18.5523 20 19 19.5523 19 19V10" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Porta (opcional) */}
    <Path 
      d="M10 20V15H14V20" 
      fill={color}
    />
  </Svg>
);

export default HomeIcon;