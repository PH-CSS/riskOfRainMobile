import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import HistoricoCard from '../../components/HistoricoCard';
import { useHistory } from '../contexts/HistoryContext';

export default function HistoricoScreen() {
  const { history, clearHistory } = useHistory();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Header />

      {/* Header do histórico */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text className="text-xl font-bold text-white">Histórico de Ações</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={clearHistory} className="rounded bg-red-500 px-3 py-1">
            <Text className="text-sm text-white">Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView className="px-6 pb-4">
        {history.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-lg text-gray-500">Nenhuma ação registrada</Text>
            <Text className="mt-2 text-sm text-gray-400">
              Use os switches na tela principal para gerar histórico
            </Text>
          </View>
        ) : (
          history.map((item) => <HistoricoCard key={item.id} {...item} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
