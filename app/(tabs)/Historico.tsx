// app/(tabs)/HistoricoScreen.tsx - VERSÃO OTIMIZADA
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import { memo, useCallback } from 'react';
import Header from '../../components/Header';
import HistoricoCard from '../../components/HistoricoCard';
import { useHistoryFirebase } from '../../hooks/useHistoryFirebase';

// ✅ Use memo para evitar re-renders desnecessários
const HistoricoScreen = memo(function HistoricoScreen() {
  const { history, loading, clearing, clearHistory } = useHistoryFirebase();

  // ✅ useCallback para evitar recriação da função
  const handleClearHistory = useCallback(() => {
    Alert.alert(
      'Limpar Histórico',
      'Tem certeza que deseja limpar todo o histórico? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            const success = await clearHistory();
            if (!success) {
              Alert.alert('Erro', 'Não foi possível limpar o histórico');
            }
          },
        },
      ]
    );
  }, [clearHistory]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ImageBackground
        source={require("../../assets/bg-pattern.png")}
        className="flex-1 bg-primarydark"
        resizeMode="repeat"
        imageStyle={{ opacity: 0.1 }}
      >
        <Header />

        {/* Header do histórico */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <View>
            <Text className="text-2xl font-bold text-white">Histórico</Text>
            <Text className="text-sm text-gray-400">
              {history.length} {history.length === 1 ? 'ação' : 'ações'} registradas
            </Text>
          </View>
          {history.length > 0 && (
            <TouchableOpacity 
              onPress={handleClearHistory} 
              className="rounded border border-red-500 px-4 py-2"
              disabled={clearing}
            >
              {clearing ? (
                <ActivityIndicator size="small" color="#EF4444" />
              ) : (
                <Text className="text-sm font-medium text-red-400">Limpar</Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* Conteúdo - Otimizado com key estável */}
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#FFD700" />
            <Text className="font-ChakraPetch_medium text-white mt-4">
              Carregando histórico...
            </Text>
          </View>
        ) : (
          <ScrollView 
            className="px-6 pb-4" 
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true} // ✅ Otimização para listas grandes
          >
            {history.length === 0 ? (
              <View className="flex-1 items-center justify-center py-20">
                <Text className="font-ChakraPetch_medium text-gray-400 text-lg text-center">
                  {clearing ? 'Limpando histórico...' : 'Nenhuma ação registrada'}
                </Text>
                <Text className="font-ChakraPetch_medium text-gray-500 text-sm mt-2 text-center">
                  {clearing 
                    ? 'Removendo todos os registros...' 
                    : 'As ações aparecerão aqui automaticamente\nquando você usar os dispositivos'
                  }
                </Text>
              </View>
            ) : (
              history.map((item) => (
                <HistoricoCard 
                  key={item.id} 
                  room={item.room}
                  action={item.action}
                  timestamp={item.timestamp}
                  subtitle={item.subtitle}
                  image={item.image}
                />
              ))
            )}
          </ScrollView>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
});

export default HistoricoScreen;