// components/RoomCard.tsx
import { View, Text, Image } from 'react-native';
import ToggleSwitch from './ToggleSwitch';
import { useHistory } from '../app/contexts/HistoryContext';
import { useRoomsFirebase } from '../hooks/useRoomsFirebase';

interface RoomCardProps {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  isEnabled: boolean;
}

export default function RoomCard({ id, title, subtitle, image, isEnabled }: RoomCardProps) {
  const { addHistoryItem } = useHistory();
  const { updateRoomState } = useRoomsFirebase();

  const handleSwitchToggle = async (newValue: boolean) => {
    const success = await updateRoomState(id, newValue);
    if (success) {
      const action = newValue ? 'aberto' : 'fechado';
      addHistoryItem(title, action, subtitle, image);
    } else {
      // Aqui você pode mostrar um alerta de erro se quiser
      console.error('❌ Falha ao atualizar estado do cômodo');
    }
  };

  return (
    <View className="mb-3 flex-row items-center justify-between border border-yellow-500 bg-zinc-900 p-4">
      <View className="flex-row items-center space-x-3 flex-1">
        <Image 
          source={{ uri: image }} 
          className="h-16 w-16" 
          defaultSource={require('../assets/default-room.jpg')}
        />

        <View className="flex-1 ml-4">
          <Text className="text-lg font-bold text-white">{title}</Text>
          <Text className="text-sm text-gray-400">{subtitle}</Text>
          <View className="flex-row items-center mt-1">
            <View className={`w-2 h-2 mr-2 ${isEnabled ? 'bg-green-400' : 'bg-red-400'}`} />
            <Text className={`text-xs ${isEnabled ? 'text-green-400' : 'text-red-400'}`}>
              {isEnabled ? 'Ativo' : 'Inativo'}
            </Text>
          </View>
        </View>
      </View>

      <ToggleSwitch 
        onToggle={handleSwitchToggle} 
        value={isEnabled}
      />
    </View>
  );
}