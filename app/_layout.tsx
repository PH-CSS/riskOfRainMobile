import { useFonts, MajorMonoDisplay_400Regular } from '@expo-google-fonts/major-mono-display';
import { ChakraPetch_300Light, ChakraPetch_500Medium } from '@expo-google-fonts/chakra-petch';
import { SplashScreen, Stack } from 'expo-router';
import '../global.css';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();
// teste

export default function Layout() {

    const [fontsLoaded] = useFonts({
      ChakraPetch_300Light, // <- mapping key
      ChakraPetch_500Medium, // <- equivalent to Inter_900Black: Inter_900Black
      MajorMonoDisplay_400Regular
    });
    console.log(fontsLoaded)
        useEffect(() => {
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
      return null;
    }

    // Render the children routes now that all the assets are loaded.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}