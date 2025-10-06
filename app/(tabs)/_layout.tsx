import '../../global.css';
import { Tabs } from 'expo-router';
import { ImageBackground, Text, View } from 'react-native';
import IconCase from '~/components/IconCase';
import { Add } from '~/components/icons';

export default function TabLayout() {
  return (
    // <View style={{ flex: 1 }}>

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1A1A1A',
            borderColor: '#DBB33A',
            borderTopWidth: 2,
            height: 64,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          },
        }}
        // tabBar={(props) => <MyTabBar {...props} />}
      >
        <Tabs.Screen
          name="HomeScreen"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <View
                className="w-fit items-center gap-1 "
                style={{ transform: [{ translateY: -8 }] }}>
                <IconCase className="size-12 bg-secundarydark" Icon={<Add />} />,
                <Text className="w-full text-nowrap font-ChakraPetch_light text-sm leading-3  text-white">
                  Home
                </Text>
              </View>
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="janelas"
          options={{
            title: 'Janelas',
            tabBarIcon: ({ focused }) => (
              <View
                className="w-fit items-center gap-1 "
                style={{ transform: [{ translateY: -8 }] }}>
                <IconCase className="size-12 bg-secundarydark" Icon={<Add />} />,
                <Text className="w-full text-nowrap font-ChakraPetch_light text-sm leading-3  text-white">
                  Janelas
                </Text>
              </View>
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="Add"
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                className="w-fit items-center gap-1 "
                style={{ transform: [{ translateY: -13 }] }}>
                <IconCase className="size-12 bg-secundarydark" Icon={<Add />} />,
                <Text className="w-full text-nowrap font-ChakraPetch_light text-sm leading-3  text-white">
                  Add
                </Text>
              </View>
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="Historico"
          options={{
            title: 'Histórico',
            tabBarIcon: ({ focused }) => (
              <View
                className="w-fit items-center gap-1 "
                style={{ transform: [{ translateY: -8 }] }}>
                <IconCase className="size-12 bg-secundarydark" Icon={<Add />} />,
                <Text className="w-full text-nowrap font-ChakraPetch_light text-sm leading-3  text-white">
                  Histórico
                </Text>
              </View>
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="Perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ focused }) => (
              <View
                className="w-fit items-center gap-3 "
                style={{ transform: [{ translateY: -13 }] }}>
                <IconCase data-focus={focused} className={`size-12 ${focused ?  "bg-primary01" : "bg-secundarydark" }`} Icon={<Add  color={focused ? "#1A1A1A" : "#DBB33A"}/>} />,
                <Text className="w-full text-nowrap font-ChakraPetch_light text-sm leading-3  text-white">
                  Perfil
                </Text>
              </View>
            ),
            tabBarShowLabel: false,
          }}
        />
      </Tabs>
    // </View>
  );
}
