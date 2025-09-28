import { View, ScrollView, Text } from 'react-native';
import Header from '../components/Header';
import RoomCard from '../components/RoomCard';
import TabBar from '../components/TabBar';

/**
 * Tela principal (Home).
 */
export default function HomeScreen({ navigation }: any) {
  return (
    <View className="flex-1 bg-black">
      {/* Cabeçalho */}
      <Header />

      {/* Filtros de ambientes */}
      <View className="mb-4 flex-row gap-3 px-6">
        <Text className="bg-yellow-500 px-5 py-2 text-base font-bold text-black">Tudo</Text>
        <Text className="border border-yellow-500 px-5 py-2 text-base text-yellow-500">
          Sala de estar
        </Text>
        <Text className="border border-yellow-500 px-5 py-2 text-base text-yellow-500">Quarto</Text>
        <Text className="border border-yellow-500 px-5 py-2 text-base text-yellow-500">
          Cozinha
        </Text>
      </View>

      {/* Status e botões */}
      <View className="mb-4 px-6">

        <Text className="mb-3 text-base text-gray-400">— Arduino R31RVV91</Text>

        <View className="mb-2 flex-row gap-3">
          <Text className="flex-1 border border-yellow-500 bg-transparent px-4 py-3 text-center text-base text-white">
            a turma malu...
          </Text>
          <Text className="flex-1 border border-yellow-500 bg-transparent px-4 py-3 text-center text-base text-white">
            Fechar tudo
          </Text>
          <Text className="flex-1 border border-yellow-500 bg-transparent px-4 py-3 text-center text-base text-white">
            23ºC/99%
          </Text>
        </View>
      </View>

      {/* Divisor */}
      <View className="my-4 flex-row items-center px-6">
        <View className="h-px flex-1 bg-yellow-500" />
      </View>

      {/* Conteúdo scrollável */}
      <ScrollView className="px-6 pb-4">
        <RoomCard
          title="Quarto"
          subtitle="Perto da cama"
          image="https://i.ibb.co/DW2xQ8F/quarto.jpg"
        />
        <RoomCard title="Sala" subtitle="Perto da TV" image="https://i.ibb.co/fd7qH8N/sala.jpg" />
        <RoomCard
          title="Cozinha"
          subtitle="Perto da pia"
          image="https://i.ibb.co/9qkXcTt/cozinha.jpg"
        />
      </ScrollView>

      {/* Barra de navegação inferior */}
      <TabBar navigation={navigation} />
    </View>
  );
}
