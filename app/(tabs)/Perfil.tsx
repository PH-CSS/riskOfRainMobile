import { View, Text, SafeAreaView } from 'react-native';
import Header from '../../components/Header';
import { ImageBackground } from 'react-native';

export default function PerfilScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require('../../assets/bg-pattern.png')}
        className="flex-1 bg-primarydark "
        resizeMode="repeat"
        imageClassName="opacity-10">
        <Header />
        <View className="flex-1 items-center justify-center">
          <Text className="text-xl text-white">Tela de Perfil</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
