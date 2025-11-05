// components/Icons/ProfileIcon.tsx
import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface ProfileIconProps {
  color?: string;
  size?: number;
}

export const ProfileIcon: React.FC<ProfileIconProps> = ({ 
  color = "#DBB33A", 
  size = 24 
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Cabeça */}
    <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" fill="none"/>
    
    {/* Corpo */}
    <Path 
      d="M5 20C5 16.134 8.13401 13 12 13C15.866 13 19 16.134 19 20" 
      stroke={color} 
      strokeWidth="2" 
      fill="none"
    />
  </Svg>
);

export default ProfileIcon;