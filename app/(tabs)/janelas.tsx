import { View, Text, SafeAreaView, ImageBackground } from 'react-native';
import Header from '../../components/Header';

export default function JanelasScreen() {
  return (
    <SafeAreaView className="flex-1">
            <ImageBackground
              source={require('../../assets/bg-pattern.png')}
              className="flex-1 bg-primarydark "
              resizeMode="repeat"
              imageClassName="opacity-10">
      <Header />
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-xl">Tela de Janelas</Text>
      </View>
</ImageBackground>
    </SafeAreaView>
  );
}