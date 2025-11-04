import { ReactNode } from 'react';
import { View } from 'react-native';

type IconCaseProps = {
  Icon: ReactNode;
  className?: string;
};

const IconCase = ({ Icon, className = 'size-12 bg-red-500' }: IconCaseProps) => {
  return (
    <View className={`overflow-hidden ${className}`} style={{ transform: [{ rotate: '45deg' }] }}>
      {/* Container interno que "desfaz" a rotação para a imagem ficar reta */}
      <View 
        className="h-full w-full items-center justify-center overflow-hidden"
        style={{ transform: [{ rotate: '-45deg' }] }}
      >
        {Icon}
      </View>
      
      {/* Bordas (mantêm a rotação do container pai) */}
      <View className="absolute h-0.5 w-full bg-primary01"></View>
      <View className="absolute h-full w-0.5 bg-primary01"></View>
      <View className="absolute left-full h-2/4 w-0.5 -translate-x-full bg-primary01"></View>
      <View className="absolute top-full h-0.5 w-2/4 -translate-y-full bg-primary01"></View>
    </View>
  );
};

export default IconCase;