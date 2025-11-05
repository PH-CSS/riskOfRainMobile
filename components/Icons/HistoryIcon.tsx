// components/Icons/HistoryIcon.tsx
import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface HistoryIconProps {
  color?: string;
  size?: number;
}

export const HistoryIcon: React.FC<HistoryIconProps> = ({ 
  color = "#DBB33A", 
  size = 24 
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Círculo do relógio */}
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none"/>
    
    {/* Ponteiro das horas */}
    <Path 
      d="M12 8V12L15 15" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
      fill="none"
    />
    
    {/* Marcador do topo */}
    <Path 
      d="M12 3L12 5" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </Svg>
);

export default HistoryIcon;