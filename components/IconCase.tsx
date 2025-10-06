import { ReactNode } from 'react';
import { View } from 'react-native';

type IconCaseProps = {
  Icon: ReactNode;
  className?: string;
};

const IconCase = ({ Icon, className = 'size-8 bg-red-500' }: IconCaseProps) => {
  return (
    <View className={className} style={{ transform: [{ rotate: '45deg' }] }}>
      <View className="absolute h-0.5 w-full bg-primary01"></View>
      <View className="absolute h-full w-0.5 bg-primary01"></View>
      <View className="absolute left-full h-2/4 w-0.5 -translate-x-full bg-primary01"></View>
      <View className="absolute top-full h-0.5 w-2/4 -translate-y-full bg-primary01"></View>
      <View
        className=" h-full w-full items-center justify-center"
        style={{ transform: [{ rotate: '-45deg' }, { translateY: -2 }] }}>
        {Icon}
      </View>
    </View>
  );
};

export default IconCase;
