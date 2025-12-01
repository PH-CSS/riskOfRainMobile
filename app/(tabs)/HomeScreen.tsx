// app/(tabs)/HomeScreen.tsx
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import RoomCard from '../../components/RoomCard';
import { useState, useMemo } from 'react';
import { useRoomsFirebase } from '../../hooks/useRoomsFirebase';

export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Tudo');
  const { rooms, loading, closeAllRooms, openAllRooms } = useRoomsFirebase();

  // Filtros dinâmicos baseados nos rooms disponíveis
  const filters = useMemo(() => {
    // Remove duplicatas e cria filtros únicos
    const uniqueRoomTypes = [...new Set(rooms.map((room) => room.title))];

    const dynamicFilters = [
      { label: 'Tudo', value: 'Tudo' },
      ...uniqueRoomTypes.map((roomType) => ({
        label: roomType,
        value: roomType,
      })),
    ];

    console.log('🎯 Filtros dinâmicos gerados:', dynamicFilters);
    return dynamicFilters;
  }, [rooms]);

  // Filtra os rooms baseado no filtro selecionado
  const filteredRooms = useMemo(() => {
    if (selectedFilter === 'Tudo') return rooms;
    return rooms.filter((room) => room.title === selectedFilter);
  }, [rooms, selectedFilter]);

  // Verifica se todos os rooms estão fechados
  const allRoomsOpen = rooms.length > 0 && rooms.every((room) => !room.isEnabled);
  // Verifica se todos os rooms estão abertos
  const allRoomsClosed = rooms.length > 0 && rooms.every((room) => room.isEnabled);

  // Texto dinâmico para o botão "Fechar tudo"
  const getCloseAllText = () => {
    if (allRoomsClosed) return 'Abrir tudo';
    if (allRoomsOpen) return 'Fechar tudo';
    return 'Abrir tudo';
  };

  // Ação do botão "Fechar/Abrir tudo"
  const handleCloseAllPress = async () => {
    if (allRoomsOpen) {
      await openAllRooms();
    } else {
      await closeAllRooms();
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#FFD700" />
        <Text className="mt-4 font-ChakraPetch_medium text-white">Carregando cômodos...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primarydark">
      <ImageBackground
        source={require('../../assets/bg-pattern.png')}
        className="flex-1"
        resizeMode="repeat"
        imageStyle={{ opacity: 0.1 }}>
        <SafeAreaView className="flex-1">
          <Header />

          {/* Filtros de ambientes COM SCROLL HORIZONTAL */}
          <View className="mb-4 px-6">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 5,
                paddingRight: 8,
                paddingVertical: 4,
              }}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.value}
                  onPress={() => setSelectedFilter(filter.value)}
                  className={
                    selectedFilter === filter.value
                      ? 'bg-primary01 px-5 py-2 '
                      : 'border border-primary01 px-5 py-2 '
                  }
                  style={{
                    minWidth: 80,
                    // Sombra para o botão selecionado
                    shadowColor: selectedFilter === filter.value ? '#CBA135' : 'transparent',
                    shadowOffset:
                      selectedFilter === filter.value
                        ? { width: 0, height: 2 }
                        : { width: 0, height: 0 },
                    shadowOpacity: selectedFilter === filter.value ? 0.3 : 0,
                    shadowRadius: selectedFilter === filter.value ? 4 : 0,
                    elevation: selectedFilter === filter.value ? 3 : 0,
                  }}>
                  <Text
                    className={
                      selectedFilter === filter.value
                        ? 'text-center font-ChakraPetch_medium text-base text-black'
                        : 'text-center font-ChakraPetch_medium text-base text-white'
                    }
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Status e botões */}
          <View className="mb-4 px-6">
            <View className="my-4 flex-row items-center">
              <View className="h-px flex-1 bg-primary01" />
              <Text className="mx-2 font-ChakraPetch_medium text-sm text-gray-400">
                Sessão de controle
              </Text>
              <View className="h-px flex-1 bg-primary01" />
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1 items-center justify-center border border-primary01 bg-transparent px-2 py-3 ">
                <Text className="text-center font-ChakraPetch_medium text-base text-white">
                  {rooms.filter((room) => room.isEnabled).length} ativos
                </Text>
              </View>

              <TouchableOpacity
                className="flex-1 items-center justify-center border border-primary01 bg-transparent px-2 py-3 "
                onPress={handleCloseAllPress}
                disabled={rooms.length === 0}>
                <Text className="text-center font-ChakraPetch_medium text-base text-white">
                  {getCloseAllText()}
                </Text>
              </TouchableOpacity>

              <View className="flex-1 items-center justify-center border border-primary01 bg-transparent px-2 py-3 ">
                <Text className="text-center font-ChakraPetch_medium text-base text-white">
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
          <ScrollView
            className="mb-3 mt-4 flex-1 px-6 pb-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Indicador de filtro ativo */}
            {selectedFilter !== 'Tudo' && (
              <View className="mb-4 flex-row items-center justify-between bg-primarydark/50  px-4 py-2">
                <Text className="font-ChakraPetch_medium text-sm text-gray-300">
                  Filtrado por:{' '}
                  <Text className="font-ChakraPetch_bold text-primary01">{selectedFilter}</Text>
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedFilter('Tudo')}
                  className="bg-primary01/20 px-3 py-1">
                  <Text className="font-ChakraPetch_medium text-xs text-primary01">Limpar</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Lista de rooms */}
            <View className="gap-4">
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
            </View>

            {/* Estado vazio */}
            {filteredRooms.length === 0 && !loading && (
              <View className="items-center justify-center py-16">
                <Text className="mb-2 text-center font-ChakraPetch_medium text-lg text-gray-400">
                  {rooms.length === 0
                    ? 'Nenhum cômodo configurado'
                    : `Nenhum cômodo do tipo "${selectedFilter}" encontrado`}
                </Text>
                <Text className="text-center font-ChakraPetch_medium text-sm text-gray-500">
                  {rooms.length === 0
                    ? 'Configure seus dispositivos ESP no perfil'
                    : 'Tente selecionar outro filtro'}
                </Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
