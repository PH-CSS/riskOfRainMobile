// components/RoomCard.tsx
import { View, Text, Image } from 'react-native';
import ToggleSwitch from './ToggleSwitch';
import EditRoomName from './EditRoomName';
import { useHistory } from '../app/contexts/HistoryContext';
import { useRoomsFirebase } from '../hooks/useRoomsFirebase';
import { useState } from 'react';

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
  const [roomName, setRoomName] = useState(title);

  const handleSwitchToggle = async (newValue: boolean) => {
    const success = await updateRoomState(id, newValue);
    if (success) {
      const action = newValue ? 'aberto' : 'fechado';
      addHistoryItem(roomName, action, subtitle, image);
    } else {
      console.error('❌ Falha ao atualizar estado do cômodo');
    }
  };

  const handleNameUpdated = (newName: string) => {
    setRoomName(newName);
    console.log('🔄 Nome do cômodo atualizado localmente:', newName);
  };

  return (
    <View className="mb-3 flex-row items-center justify-between border border-yellow-500 bg-darkgray p-4">
      <View className="flex-row items-center flex-1">
        {/* Imagem fixa à esquerda */}
        <Image 
          source={{ uri: image }} 
          className="h-16 w-16 " 
          defaultSource={require('../assets/default-room.jpg')}
        />

        {/* Conteúdo do meio + toggle à direita */}
        <View className="flex-row items-center justify-between flex-1 ml-4">
          {/* Informações do cômodo */}
          <View className="flex-1 mr-4">
            {/* Linha do título e ícone de edição */}
            <View className="flex-row items-center mb-1">
              <Text className="text-lg font-bold text-white mr-2 flex-shrink">
                {roomName}
              </Text>
              <EditRoomName 
                roomId={id}
                currentName={roomName}
                onNameUpdated={handleNameUpdated}
              />
            </View>
            
            {/* Subtítulo */}
            <Text className="text-sm text-gray-400 mb-1">{subtitle}</Text>
            
            {/* Status */}
            <View className="flex-row items-center">
              <View className={`w-2 h-2  mr-2 ${isEnabled ? 'bg-green-400' : 'bg-red-400'}`} />
              <Text className={`text-xs ${isEnabled ? 'text-green-400' : 'text-red-400'}`}>
                {isEnabled ? 'Janela fechada' : 'Janela aberta'}
              </Text>
            </View>
          </View>

          <View className="flex-shrink-0">
            <ToggleSwitch 
              onToggle={handleSwitchToggle} 
              value={isEnabled}
            />
          </View>
        </View>
      </View>
    </View>
  );
}