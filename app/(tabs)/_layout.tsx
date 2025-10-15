import "../../global.css";
import { Tabs } from "expo-router";
import { View } from "react-native";
import CustomTabBar from "../../components/TabBar";
import { HistoryProvider } from "../contexts/HistoryContext";
import { RoomsProvider } from "../contexts/RoomsContext";

export default function TabLayout() {
  return (
    <HistoryProvider>
      <RoomsProvider> 
        <View style={{ flex: 1 }}>
          <Tabs 
            screenOptions={{ headerShown: false }} 
            tabBar={(props) => <CustomTabBar {...props} />}
          >
            <Tabs.Screen name="HomeScreen" options={{ title: "Home" }} />
            <Tabs.Screen name="janelas" options={{ title: "Janelas" }} />
            <Tabs.Screen name="Add" options={{ title: "Add" }} />
            <Tabs.Screen name="Historico" options={{ title: "Histórico" }} />
            <Tabs.Screen name="Perfil" options={{ title: "Perfil" }} />
          </Tabs>
        </View>
      </RoomsProvider>
    </HistoryProvider>
  );
}