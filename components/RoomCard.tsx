import { View, Text, Image } from 'react-native';
import ToggleSwitch from './ToggleSwitch';
import { useHistory } from '../app/contexts/HistoryContext';
import { useRooms } from '../app/contexts/RoomsContext';

interface RoomCardProps {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  isEnabled: boolean;
}

export default function RoomCard({ id, title, subtitle, image, isEnabled }: RoomCardProps) {
  const { addHistoryItem } = useHistory();
  const { updateRoomState } = useRooms();

  const handleSwitchToggle = (newValue: boolean) => {
    updateRoomState(id, newValue);
    const action = newValue ? 'aberto' : 'fechado';
    addHistoryItem(title, action, subtitle, image);
  };

  return (
    <View className="mb-3 flex-row items-center justify-between border border-yellow-500 bg-darkgray p-3">
      <View className="flex-row items-center space-x-3">
        <Image source={{ uri: image }} className="mr-4 h-16 w-16 rounded-lg" />
        <View>
          <Text className="text-lg font-bold text-white">{title}</Text>
          <Text className="text-sm text-gray-400">{subtitle}</Text>
        </View>
      </View>

      <ToggleSwitch 
        onToggle={handleSwitchToggle} 
        value={isEnabled} // ← Estado controlado
      />
    </View>
  );
}