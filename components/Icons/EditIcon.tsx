// components/Icons/EditIcon.tsx
import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface EditIconProps {
  color?: string;
  size?: number;
}

const EditIcon: React.FC<EditIconProps> = ({ 
  color = "#DBB33A", 
  size = 14 // Tamanho menor para ficar ao lado do texto
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
    />
    <Path
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
    />
  </Svg>
)

export default EditIcon