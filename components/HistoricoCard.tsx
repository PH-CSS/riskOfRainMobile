// components/HistoricoCard.tsx
import { View, Text, Image } from 'react-native';

// Interface local para evitar conflitos
interface HistoryItem {
  room: string;
  action: 'aberto' | 'fechado';
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
    <View className="mb-3 flex-row items-center justify-between border border-yellow-500 bg-darkgray p-3 rounded-lg">
      {/* Imagem e informações do cômodo */}
      <View className="flex-1 flex-row items-center">
        <Image 
          source={{ uri: image }} 
          className="mr-4 h-16 w-16 rounded-lg" 
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
          action === 'aberto' ? 'bg-green-500' : 'bg-red-500'
        }`}>
        <Text className="font-ChakraPetch_bold text-sm text-white">
          {action === 'aberto' ? 'ABERTO' : 'FECHADO'}
        </Text>
      </View>
    </View>
  );
}