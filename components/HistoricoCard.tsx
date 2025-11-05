// components/HistoricoCard.tsx
import { View, Text, Image } from 'react-native';

// Interface local para evitar conflitos
interface HistoryItem {
  room: string;
  action: 'fechado' | 'aberto';
  timestamp: Date;
  subtitle: string;
  image: string;
}

export default function HistoricoCard({ room, action, timestamp, subtitle, image }: HistoryItem) {
  const formatTime = (date: Date) => {
    return date.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo', 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View className="mb-3 flex-row items-center justify-between border border-yellow-500 bg-darkgray p-3 ">
      {/* Imagem e informações do cômodo */}
      <View className="flex-1 flex-row items-center">
        <Image 
          source={{ uri: image }} 
          className="mr-4 h-16 w-16 " 
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="font-ChakraPetch_bold text-lg text-white">{room}</Text>
          <Text className="font-ChakraPetch_medium text-sm text-gray-400">{subtitle}</Text>
          <Text className="font-ChakraPetch_medium mt-1 text-xs text-yellow-500">
            {formatTime(timestamp)}
          </Text>
        </View>
      </View>

      {/* Status da ação */}
      <View
        className={`rounded-full px-3 py-1 ${
          action === 'fechado' ? 'bg-red-500' : 'bg-green-500'
        }`}>
        <Text className="font-ChakraPetch_bold text-sm text-white">
          {action === 'aberto' ? 'JANELA FECHADA' : 'JANELA ABERTA'}
        </Text>
      </View>
    </View>
  );
}