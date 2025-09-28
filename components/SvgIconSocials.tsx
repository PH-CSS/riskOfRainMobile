import React from "react";
import Svg, { Path, Mask, G, SvgProps } from "react-native-svg";
import { TouchableOpacity } from "react-native";

interface CustomSvgProp extends SvgProps {
  extraPath?: React.ReactNode;
  background?: React.ReactNode;
}

const SvgIcon = ({ width = 46, height = 46, extraPath, background, ...props }: CustomSvgProp) => (
  <TouchableOpacity onPress={() => console.log("SVG clicado!")}>
    <Svg
      width={width}
      height={height}
      viewBox="0 0 46 46" // área original do SVG
      fill="none"
      {...props}
    >

      {background}

      {/* Path dourado de fora */}
      <Path
        fill="#DBB33A"
        d="M46 24 34.5 36h-2.078l11.5-12L23 2.168 2.077 24l11.501 12H11.5L0 24 23 0l23 24Z"
      />

      {/* Máscara para limitar o ícone central */}
      <Mask
        id="mask0"
        width={16}
        height={16}
        x={15}
        y={16}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
      >
        <Path fill="#D9D9D9" d="M15 16h16v16H15z" />
      </Mask>

      {/* Ícone dourado do meio (aplicando a máscara) */}


      {extraPath}


      {/* Caminhos extras se forem passados */}
    </Svg>
  </TouchableOpacity>
);

export default SvgIcon;
