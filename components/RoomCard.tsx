import { View, Text, Image } from 'react-native';
import ToggleSwitch from './ToggleSwitch';
// Update the import path below if HistoryContext is in a different location
import { useHistory } from '../app/contexts/HistoryContext';

/**
 * Cartão de um cômodo (Quarto, Sala, Cozinha).
 */
export default function RoomCard({ title, subtitle, image }: any) {
  const { addHistoryItem } = useHistory();

  const handleSwitchToggle = (isEnabled: boolean) => {
    const action = isEnabled ? 'aberto' : 'fechado';
    addHistoryItem(title, action, subtitle, image);
  };

  return (
    <View className="mb-3 flex-row items-center justify-between border border-yellow-500 bg-darkgray p-3">
      {/* Imagem do cômodo */}
      <View className="flex-row items-center space-x-3">
        <Image source={{ uri: image }} className="mr-4 h-16 w-16 rounded-lg" />
        <View>
          <Text className="text-lg font-bold text-white">{title}</Text>
          <Text className="text-sm text-gray-400">{subtitle}</Text>
        </View>
      </View>

      {/* Botão lateral */}
      <ToggleSwitch onToggle={handleSwitchToggle} />
    </View>
  );
}
