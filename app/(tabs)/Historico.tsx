import { View, Text, SafeAreaView } from 'react-native';
import Header from '../../components/Header';

export default function HistoricoScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <Header />
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-xl">Tela de Histórico</Text>
      </View>
    </SafeAreaView>
  );
}