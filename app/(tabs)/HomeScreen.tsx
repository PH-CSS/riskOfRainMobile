// app/(tabs)/HomeScreen.tsx
import { View, ScrollView, Text, SafeAreaView, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import RoomCard from '../../components/RoomCard';
import { useState, useMemo } from 'react';
import { useRoomsFirebase } from '../../hooks/useRoomsFirebase';

export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Tudo');
  const { rooms, loading, closeAllRooms, openAllRooms } = useRoomsFirebase();

  // Gera os filtros dinamicamente baseado nos nomes dos ESPs do banco
  const filters = useMemo(() => {
    // Pega todos os títulos únicos dos rooms
    const uniqueTitles = Array.from(new Set(rooms.map(room => room.title)))
      .filter(title => title && title !== 'Dispositivo'); // Remove valores vazios e padrão
    
    // Cria os filtros dinâmicos
    const dynamicFilters = uniqueTitles.map(title => ({
      label: title,
      value: title
    }));

    // Sempre inclui o filtro "Tudo" no início
    return [
      { label: 'Tudo', value: 'Tudo' },
      ...dynamicFilters
    ];
  }, [rooms]);

  // Filtra os rooms baseado no filtro selecionado
  const filteredRooms = useMemo(() => {
    if (selectedFilter === 'Tudo') return rooms;
    return rooms.filter(room => room.title === selectedFilter);
  }, [rooms, selectedFilter]);

  // Verifica se todos os rooms estão fechados
  const allRoomsClosed = rooms.length > 0 && rooms.every(room => !room.isEnabled);
  // Verifica se todos os rooms estão abertos
  const allRoomsOpen = rooms.length > 0 && rooms.every(room => room.isEnabled);

  // Texto dinâmico para o botão "Fechar tudo"
  const getCloseAllText = () => {
    if (allRoomsClosed) return 'Abrir tudo';
    if (allRoomsOpen) return 'Fechar tudo';
    return 'Fechar tudo';
  };

  // Ação do botão "Fechar/Abrir tudo"
  const handleCloseAllPress = async () => {
    if (allRoomsClosed) {
      await openAllRooms();
    } else {
      await closeAllRooms();
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#FFD700" />
        <Text className="font-ChakraPetch_medium text-white mt-4">Carregando cômodos...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primarydark">
      <ImageBackground
        source={require("../../assets/bg-pattern.png")}
        className="flex-1"
        resizeMode="repeat"
        imageStyle={{ opacity: 0.1 }} // Controla a opacidade do pattern
      >
        <SafeAreaView className="flex-1">
          <Header />

        {/* Filtros de ambientes DINÂMICOS  */}
        <View className="mb-4 px-6">
          <View className="flex-row flex-wrap gap-2">
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.value}
                onPress={() => setSelectedFilter(filter.value)}
                className={
                  selectedFilter === filter.value
                    ? 'bg-primary01 px-4 py-2'
                    : 'border border-primary01 px-4 py-2'
                }
              >
                <Text className={
                  selectedFilter === filter.value
                    ? 'text-sm font-bold text-black'
                    : 'text-sm text-white'
                }>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

          {/* Status e botões */}
          <View className="mb-4 px-6">
            <View className="my-4 flex-row items-center">
              <View className="h-px flex-1 bg-primary01" />
              <Text className="font-ChakraPetch_medium text-gray-400 mx-2">Sessão de controle</Text>
              <View className="h-px flex-1 bg-primary01" />
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1 items-center justify-center border border-primary01 bg-transparent px-4 py-3">
                <Text className="font-ChakraPetch_medium text-center text-base text-white">
                  {rooms.filter(room => room.isEnabled).length} ativos
                </Text>
              </View>
              
              <TouchableOpacity 
                className="flex-1 items-center justify-center border border-primary01 bg-transparent px-4 py-3"
                onPress={handleCloseAllPress}
                disabled={rooms.length === 0}
              >
                <Text className="font-ChakraPetch_medium text-center text-base text-white">
                  {getCloseAllText()}
                </Text>
              </TouchableOpacity>
              
              <View className="flex-1 items-center justify-center border border-primary01 bg-transparent px-4 py-3">
                <Text className="font-ChakraPetch_medium text-center text-base text-white">
                  {rooms.length} total
                </Text>
              </View>
            </View>
          </View>

          {/* Divisor */}
          <View className="my-4 flex-row items-center px-6">
            <View className="h-px flex-1 bg-primary01" />
          </View>

          {/* Conteúdo scrollável */}
          <ScrollView className="flex-1 px-6 pb-4 mt-4" showsVerticalScrollIndicator={false}>
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
            
            {filteredRooms.length === 0 && !loading && (
              <View className="items-center justify-center py-10">
                <Text className="font-ChakraPetch_medium text-gray-400 text-lg">
                  {rooms.length === 0 ? 'Nenhum cômodo configurado' : 'Nenhum cômodo encontrado'}
                </Text>
                <Text className="font-ChakraPetch_medium text-gray-500 text-sm mt-2">
                  Configure seus dispositivos ESP no perfil
                </Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}