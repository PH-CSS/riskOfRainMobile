// components/Input.tsx
import { TextInput, TextInputProps } from "react-native";

export function Input({ ...props }: TextInputProps) {
  return (
    <TextInput
      className="w-full border border-primary01 px-4 py-3 text-white placeholder:text-gray-400"
      placeholderTextColor="#999"
      {...props}
    />
  );
}
