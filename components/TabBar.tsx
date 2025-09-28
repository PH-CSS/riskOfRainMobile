import { View, TouchableOpacity, Text } from 'react-native';
import SvgIcon from './SvgIconSocials';
import { Path } from 'react-native-svg';

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
      <View className="bg-darkgray absolute bottom-0 left-0 h-[60%] w-full border-t border-yellow-500" />

      {tabs.map((tab, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => navigation.navigate(tab.name)}
          className="flex-1 items-center">
          <View className="w-full flex-row items-center justify-around ">
            <SvgIcon
              width={60}
              height={60}
              extraPath={
                <Path
                  fill="#DBB33A"
                  d="M25.12 12.76c-.037-.041-1.364.015-2.52 1.245-1.155 1.228-.978 2.636-.952 2.673.026.036 1.648.092 2.683-1.337s.826-2.54.79-2.582Zm3.592 12.465c-.052-.102-2.52-1.31-2.29-3.636.23-2.324 1.816-2.963 1.84-3.032.026-.069-.647-.84-1.359-1.23a4.072 4.072 0 0 0-1.694-.46c-.117-.003-.523-.101-1.36.123-.55.148-1.79.626-2.132.645-.343.019-1.362-.555-2.457-.707-.702-.132-1.445.14-1.977.349-.532.208-1.542.801-2.249 2.377-.706 1.574-.337 4.069-.072 4.845.264.775.677 2.044 1.38 2.97.624 1.046 1.452 1.771 1.798 2.018.346.246 1.321.41 1.998.07.544-.326 1.526-.514 1.914-.5.387.013 1.15.163 1.931.572.62.21 1.204.122 1.79-.112.587-.234 1.436-1.125 2.427-2.93.375-.84.546-1.293.512-1.362Z"
                />
              }
            />
          </View>
          <Text className="text-xs text-yellow-500">{tab.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
