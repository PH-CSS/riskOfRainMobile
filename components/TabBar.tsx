import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import SvgIcon from './SvgIconSocials';
import { Path, G } from 'react-native-svg';
import { useRouter, usePathname } from 'expo-router';
import IconCase from './IconCase';
import { Add } from './icons';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

/**
 * Barra de navegação inferior customizada integrada com expo-router.
 */
export default function CustomTabBar({ state, descriptors, navigation }: TabBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { 
      name: 'Home', 
      icon: 'home',
      route: '/(tabs)/HomeScreen' as const
    },
    { 
      name: 'Janelas', 
      icon: 'windows',
      route: '/(tabs)/janelas' as const
    },
    { 
      name: 'Add', 
      icon: 'plus',
      route: '/(tabs)/Add' as const
    },
    { 
      name: 'Histórico', 
      icon: 'clock',
      route: '/(tabs)/Historico' as const
    },
    { 
      name: 'Perfil', 
      icon: 'user',
      route: '/(tabs)/Perfil' as const
    },
  ];

  const getIconContent = (iconName: string, isFocused: boolean) => {
    const iconColor = isFocused ? '#DBB33A' : '#FFFFFF';
    
    switch (iconName) {
      case 'home':
        return {
          background: <Path fill="#343434" d="M34.412 36H12.177L1.059 23.824 23.294 1.588 45.53 24.353 34.412 36Z" />,
          extraPath: (
            <G mask="url(#mask0)">
              <Path
                fill={iconColor}
                d="M19 28.667h2v-4h4v4h2v-6l-4-3-4 3v6ZM17.667 30v-8L23 18l5.333 4v8h-4.666v-4h-1.334v4h-4.666Z"
              />
            </G>
          )
        };
      case 'windows':
        return {
          background: <Path fill="#343434" d="M34.412 36H12.177L1.059 23.824 23.294 1.588 45.53 24.353 34.412 36Z" />,
          extraPath: (
            <G mask="url(#mask0)">
              <Path
                fill={iconColor}
                d="M15 18h6v6h-6v-6zm0 8h6v6h-6v-6zm8-8h6v6h-6v-6zm0 8h6v6h-6v-6z"
              />
            </G>
          )
        };
      case 'plus':
        return {
          background: <Path fill="#343434" d="M34.412 36H12.177L1.059 23.824 23.294 1.588 45.53 24.353 34.412 36Z" />,
          extraPath: (
            <G mask="url(#mask0)">
              <Path
                fill={iconColor}
                d="M22 16h4v4h4v4h-4v4h-4v-4h-4v-4h4v-4z"
              />
            </G>
          )
        };
      case 'clock':
        return {
          background: <Path fill="#343434" d="M34.412 36H12.177L1.059 23.824 23.294 1.588 45.53 24.353 34.412 36Z" />,
          extraPath: (
            <G mask="url(#mask0)">
              <Path
                fill={iconColor}
                d="M23 16v8l6 4m-10-20a12 12 0 1 0 0 24 12 12 0 0 0 0-24z"
                stroke={iconColor}
                strokeWidth="2"
              />
            </G>
          )
        };
      case 'user':
        return {
          background: <Path fill="#343434" d="M34.412 36H12.177L1.059 23.824 23.294 1.588 45.53 24.353 34.412 36Z" />,
          extraPath: (
            <G mask="url(#mask0)">
              <Path
                fill={iconColor}
                d="M23 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 4c-5.333 0-8 2.667-8 8v2h16v-2c0-5.333-2.667-8-8-8z"
              />
            </G>
          )
        };
      default:
        return {
          background: <Path fill="#343434" d="M34.412 36H12.177L1.059 23.824 23.294 1.588 45.53 24.353 34.412 36Z" />,
          extraPath: null
        };
    }
  };

return (
  <SafeAreaView className="bg-black">
    <View className="relative flex-row bg-black pt-2 mb-11">
      <View className="bg-darkgray absolute bottom-0 left-0 h-[60%] w-full border-t-2 border-primary01" />

      {tabs.map((tab, idx) => {
        const isFocused = pathname === tab.route;
        const iconContent = getIconContent(tab.icon, isFocused);

        function handleTabPress(
          route: '/(tabs)/HomeScreen' | '/(tabs)/janelas' | '/(tabs)/Add' | '/(tabs)/Historico' | '/(tabs)/Perfil'
        ): void {
          if (pathname !== route) {
            router.push(route);
          }
        }

        return (
          // <TouchableOpacity
          //   key={idx}
          //   onPress={() => handleTabPress(tab.route)}
          //   className="flex-1 items-center"
          //   activeOpacity={.9}
          // >
          //   <View className="w-full flex-row items-center justify-around">
          //     <SvgIcon
          //       width={60}
          //       height={60}
          //       background={iconContent.background}
          //       extraPath={iconContent.extraPath}
          //     />
          //   </View>
          //   <Text className={`text-xs ${isFocused ? 'text-yellow-500' : 'text-white'}`}>
          //     {tab.name}
          //   </Text>
          // </TouchableOpacity>
                      <IconCase key={idx} className="size-12" Icon={<Add/>}/>

        );
      })}
    </View>
  </SafeAreaView>
);
}