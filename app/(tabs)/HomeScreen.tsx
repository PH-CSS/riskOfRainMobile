import { View, ScrollView, Text, SafeAreaView,  } from 'react-native';
import Header from '../../components/Header';
import RoomCard from '../../components/RoomCard';
import { useState } from 'react';

/**
 * Tela principal (Home).
 */
export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Tudo');
  const filters = [
    { label: 'Tudo' },
    { label: 'Sala de estar' },
    { label: 'Quarto' },
    { label: 'Cozinha' },
  ];

  return (
    // <ImageBackground
    //   source={require("../assets/bg-pattern.png")}
    //   className="flex-1 bg-primarydark "
    //   resizeMode="repeat"
    //   imageClassName="opacity-10"
    // ></ImageBackground>
    <SafeAreaView className="flex-1 bg-black">
      {/* Cabeçalho */}
      <Header />

      {/* Filtros de ambientes */}
      <View className="mb-4 flex-row gap-3 px-6">
        {filters.map((filter) => (
          <Text
            key={filter.label}
            onPress={() => setSelectedFilter(filter.label)}
            className={
              selectedFilter === filter.label
                ? 'bg-yellow-500 px-5 py-2 text-base font-bold text-black'
                : 'border border-yellow-500 px-5 py-2 text-base text-white'
            }>
            {filter.label}
          </Text>
        ))}
      </View>

      {/* Status e botões */}
      <View className="mb-4 px-6">
        <View className="my-4 flex-row items-center ">
          <View className="h-px flex-1 bg-yellow-500" />
          {/* adicionar o nome do arduino pelo use banco de dados */}
          <Text className=" text-gray-400"> Arduino R31RVV91</Text>
          <View className="h-px flex-1 bg-yellow-500" />
        </View>

        <View className="mb-2 flex-row gap-3">
          <View className="flex-1 items-center justify-center border border-yellow-500 bg-transparent px-4 py-3">
            <Text className="text-center text-base text-white">a turma malu...</Text>
          </View>
          <View className="flex-1 items-center justify-center border border-yellow-500 bg-transparent px-4 py-3">
            <Text className="text-center text-base text-white">Fechar tudo</Text>
          </View>
          <View className="flex-1 items-center justify-center border border-yellow-500 bg-transparent px-4 py-3">
            <Text className="text-center text-base text-white">23ºC/99%</Text>
          </View>
        </View>
      </View>

      {/* Divisor */}
      <View className="my-4 flex-row items-center px-6">
        <View className="h-px flex-1 bg-yellow-500" />
      </View>

      {/* Conteúdo scrollável */}
      <ScrollView className="px-6 pb-4">
        {/* Mudar as informações pegando o conteúdo vindo do firebase */}
        <RoomCard
          title="Quarto"
          subtitle="Perto da cama"
          image="https://images.prismic.io/guararapes/955be9d3-b4b4-4337-a51a-90ed60864a06_Areia+e+Sib%C3%A9ria+l+Henrique+Ortis+l+Quarto+l+Foto+Luiz+Franco.png?auto=compress,format"
        />
        <RoomCard
          title="Sala"
          subtitle="Perto da TV"
          image="https://img.freepik.com/fotos-gratis/sala-de-estar-de-luxo-loft-de-renderizacao-3d-com-estante-perto-de-estante_105762-2224.jpg"
        />
        <RoomCard
          title="Cozinha"
          subtitle="Perto da pia"
          image="https://i.pinimg.com/originals/cf/0f/98/cf0f9839d2aea718156891a0d496b95b.png"
        />
      </ScrollView>
    </SafeAreaView>
  );
}