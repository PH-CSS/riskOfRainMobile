// app/(tabs)/_layout.tsx - CORRIGIDO
import '../../global.css';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import IconCase from '../../components/Icons/iconsCase';
import { Add, ProfileIcon, HistoryIcon } from '../../components/Icons/index'; 

export default function TabLayout() {
  return (
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
          paddingBottom: 80,
        },
      }}
    >
      {/* HOME - CORRIGIDO */}
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View
              className="w-fit items-center gap-3"
              style={{ transform: [{ translateY: -3 }] }}>
              <IconCase 
                className={`size-12 ${focused ? "bg-primary01" : "bg-darkgray"}`} // ← ADICIONADO focused
                Icon={<Add color={focused ? "#1A1A1A" : "#DBB33A"}/>} 
              />
              <Text className=" mt-1 w-full text-nowrap font-ChakraPetch_light text-sm leading-3 text-white">
                Home
              </Text>
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />

      {/* HISTÓRICO - CORRIGIDO */}
      <Tabs.Screen
        name="Historico"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ focused }) => (
            <View
              className="w-fit items-center gap-3"
              style={{ transform: [{ translateY: -3 }] }}>
              <IconCase 
                className={`size-12 ${focused ? "bg-primary01" : "bg-darkgray"}`} // ← ADICIONADO focused
                Icon={<HistoryIcon color={focused ? "#1A1A1A" : "#DBB33A"}/>} 
              />
              <Text className=" mt-1 w-full text-nowrap font-ChakraPetch_light text-sm leading-3 text-white">
                Histórico
              </Text>
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />

      {/* PERFIL - JÁ ESTAVA CORRETO */}
      <Tabs.Screen
        name="Perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <View
              className="w-fit items-center gap-3"
              style={{ transform: [{ translateY: -8 }] }}>
              <IconCase 
                className={`size-12 ${focused ? "bg-primary01" : "bg-darkgray"}`} 
                Icon={<ProfileIcon color={focused ? "#1A1A1A" : "#DBB33A"}/>} 
              />
              <Text className=" mt-1 w-full text-nowrap font-ChakraPetch_light text-sm leading-3 text-white">
                Perfil
              </Text>
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}