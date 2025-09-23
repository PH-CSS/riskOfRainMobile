import Svg, { Path, SvgProps  } from "react-native-svg";
import { TouchableOpacity } from "react-native";

interface CustomSvgProp extends SvgProps{
  extraPath?: React.ReactNode;
}

const SvgIcon = ({ width = 44, height = 44, extraPath,  ...props }: CustomSvgProp) => (
 
  <TouchableOpacity onPress={() => console.log("SVG clicado!")}>
    <Svg
      width={width}
      height={height}
      viewBox="0 0 44 44" // define a área de desenho original
      fill="none"
      {...props}
      >
      <Path
        fill="#DBB33A"
        d="M44 22.667 33 34h-1.975l11-11.334L22 2.033 1.974 22.666l11 11.334H11L0 22.667 22 0l22 22.667Z"
      />

      {extraPath}

    </Svg>
  </TouchableOpacity>

);

export default SvgIcon;
