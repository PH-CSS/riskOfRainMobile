import { View, ScrollView, Text, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import Header from '../../components/Header';
import RoomCard from '../../components/RoomCard';
import { useState } from 'react';
import { useRooms } from '../contexts/RoomsContext';

export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Tudo');
  const { rooms, closeAllRooms, openAllRooms } = useRooms();

  const filters = [
    { label: 'Tudo', value: 'Tudo' },
    { label: 'Sala de estar', value: 'Sala' },
    { label: 'Quarto', value: 'Quarto' },
    { label: 'Cozinha', value: 'Cozinha' },
  ];

  // Filtra os rooms baseado no filtro selecionado
  const filteredRooms = rooms.filter(room => {
    if (selectedFilter === 'Tudo') return true;
    return room.title === selectedFilter;
  });

  // Verifica se todos os rooms estão fechados
  const allRoomsClosed = rooms.every(room => !room.isEnabled);
  // Verifica se todos os rooms estão abertos
  const allRoomsOpen = rooms.every(room => room.isEnabled);

  // Texto dinâmico para o botão "Fechar tudo"
  const getCloseAllText = () => {
    if (allRoomsClosed) return 'Abrir tudo';
    if (allRoomsOpen) return 'Fechar tudo';
    return 'Fechar tudo';
  };

  // Ação do botão "Fechar/Abrir tudo"
  const handleCloseAllPress = () => {
    if (allRoomsClosed) {
      openAllRooms();
    } else {
      closeAllRooms();
    }
  };

  return (
        <ImageBackground
          source={require("../../assets/bg-pattern.png")}
          className="flex-1 bg-primarydark "
          resizeMode="repeat"
          imageClassName="opacity-10"
        >

    <SafeAreaView className="flex-1 bg-black">
      <Header />

      {/* Filtros de ambientes */}
      <View className="mb-4 flex-row gap-3 px-6">
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.value}
            onPress={() => setSelectedFilter(filter.value)}
            className={
              selectedFilter === filter.value
                ? 'bg-yellow-500 px-5 py-2'
                : 'border border-yellow-500 px-5 py-2'
            }>
            <Text className={
              selectedFilter === filter.value
                ? 'text-base font-bold text-black'
                : 'text-base text-white'
            }>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Status e botões */}
      <View className="mb-4 px-6">
        <View className="my-4 flex-row items-center">
          <View className="h-px flex-1 bg-yellow-500" />
          <Text className="text-gray-400"> Arduino R31RVV91</Text>
          <View className="h-px flex-1 bg-yellow-500" />
        </View>

        <View className="mb-2 flex-row gap-3">
          <View className="flex-1 items-center justify-center border border-yellow-500 bg-transparent px-4 py-3">
            <Text className="text-center text-base text-white">a turma malu...</Text>
          </View>
          
          <TouchableOpacity 
            className="flex-1 items-center justify-center border border-yellow-500 bg-transparent px-4 py-3"
            onPress={handleCloseAllPress}
          >
            <Text className="text-center text-base text-white">
              {getCloseAllText()}
            </Text>
          </TouchableOpacity>
          
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
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            id={room.id}
            title={room.title}
            subtitle={room.subtitle}
            image={room.image}
            isEnabled={room.isEnabled}
          />
        ))}
        
        {filteredRooms.length === 0 && (
          <View className="items-center justify-center py-10">
            <Text className="text-gray-400 text-lg">
              Nenhum cômodo encontrado
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>

  );
}