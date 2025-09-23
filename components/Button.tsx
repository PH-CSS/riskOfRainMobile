// components/Button.tsx
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
}

export function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      className="w-full bg-primary01 py-3 items-center mt-4"
      onPress={onPress}
    >
      <Text className="text-black font-bold text-base">{title}</Text>
    </TouchableOpacity>
  );
}
