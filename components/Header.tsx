import { View, Text, TouchableOpacity, Image } from "react-native";
import { Bell, Plus } from "lucide-react-native";

/**
 * Cabeçalho superior da Home.
 * - Mostra avatar, saudação e botões de ação.
 */
export default function Header() {
  return (
    <View className="flex-row justify-between items-center p-4">
      {/* Avatar e saudação */}
      <View className="flex-row items-center space-x-2">
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          className="w-10 mr-4 h-10 rounded-full"
        />

        <View>
          <Text className="text-white font-bold text-lg">HI MSTOF</Text>
          <Text className="text-gray-400 text-sm">Casa de Mstof ▽</Text>
        </View>
      </View>

      {/* Botões de ação */}
      <View className="flex-row gap-8 space-x-3">
        <TouchableOpacity className="bg-yellow-500 p-2 rounded-full">
          <Plus color="black" size={20} />
        </TouchableOpacity>

        <TouchableOpacity className="bg-yellow-500 p-2 rounded-full">
          <Bell color="black" size={20} />
        </TouchableOpacity>
      </View>
      
    </View>
  );
}
