import { View, Text, TouchableOpacity, Image } from "react-native";

/**
 * Cartão de um cômodo (Quarto, Sala, Cozinha).
 * @param {string} title - Nome do cômodo
 * @param {string} subtitle - Texto de apoio
 * @param {string} image - URL da imagem
 */
export default function RoomCard({ title, subtitle, image }: any) {
  return (
    <TouchableOpacity className="bg-black/70 border border-yellow-500 rounded-xl p-3 mb-3 flex-row justify-between items-center">
      {/* Imagem do cômodo */}
      <View className="flex-row items-center space-x-3">
        <Image source={{ uri: image }} className="w-16 h-16 rounded-lg" />
        <View>
          <Text className="text-white text-lg font-bold">{title}</Text>
          <Text className="text-gray-400 text-sm">{subtitle}</Text>
        </View>
      </View>

      {/* Botão lateral */}
      <View className="bg-yellow-500 px-3 py-2 rounded-lg">
        <Text className="text-black font-bold">→</Text>
      </View>
    </TouchableOpacity>
  );
}
