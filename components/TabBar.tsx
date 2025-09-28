import { View, TouchableOpacity, Text } from 'react-native';
import SvgIcon from './SvgIconSocials';
import { Path, G } from 'react-native-svg';

/**
 * Barra de navegação inferior reutilizável.
 */
export default function TabBar({ navigation }: any) {
  const tabs = [
    { name: 'Home', icon: 'home' },
    { name: 'Janelas', icon: 'windows' },
    { name: 'Add', icon: 'plus' },
    { name: 'Histórico', icon: 'clock' },
    { name: 'Perfil', icon: 'user' },
  ];

  return (
    <View className="relative flex-row ">
      <View className="bg-darkgray absolute bottom-0 left-0 h-[60%] w-full border-t-2 border-primary01" />

      {tabs.map((tab, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => navigation.navigate(tab.name)}
          className="flex-1 items-center">
          <View className="w-full flex-row items-center justify-around ">
            <SvgIcon
              width={60}
              height={60}

              background={
                <Path
                  fill="#343434"
                  d="M34.412 36H12.177L1.059 23.824 23.294 1.588 45.53 24.353 34.412 36Z"
                />
              }

              extraPath={
                <G mask="url(#mask0)">
                  <Path
                    fill="#DBB33A"
                    d="M19 28.667h2v-4h4v4h2v-6l-4-3-4 3v6ZM17.667 30v-8L23 18l5.333 4v8h-4.666v-4h-1.334v4h-4.666Z"
                  />
                </G>
              }
            />
          </View>
          <Text className="text-xs text-white">{tab.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
