// screens/LoginScreen.tsx
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Path } from "react-native-svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import  SvgIcon  from "../components/SvgIconSocials";

export default function LoginScreen() {
  
  return (

    
    <ImageBackground
      source={require('../assets/pattern.png')} 
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.91,}} // deixa a imagem mais clara (Esse num especifico)
      resizeMode="cover"
    >

    <View className="flex-1 px-8 justify-center">
      {/* Título */}
      <Text className="text-3xl  text-white font-bold mb-10">REALIZE O{"\n"}LOGIN</Text>

      {/* Inputs */}
      <Text className="text-white mb-1 text-sm">Email</Text>
      <Input placeholder="email.g@gmail.com" keyboardType="email-address" />
      <View className="mt-4" />
      <Text className="text-white mb-1 text-sm">Senha</Text>
      <Input placeholder="12345678" secureTextEntry />

      {/* Esqueceu a senha */}
      <TouchableOpacity className="mt-2">
        <Text className="text-white text-sm">Esqueceu sua senha?</Text>
      </TouchableOpacity>

      {/* Botão principal */}
      <Button title="LOGAR" />

      {/* Divider */}
      <View className="flex-row items-center my-6">
        <View className="flex-1 h-px bg-primary01" />
        <Text className="text-white px-2">Ou entre com</Text>
        <View className="flex-1 h-px bg-primary01" />
      </View>

      {/* Social Buttons SVG*/}
      <View className="flex-row justify-evenly w-full">

        <SvgIcon width={60} height={60} 
          extraPath={
            <Path
            // Maça apple icon svg
              fill="#DBB33A"
              d="M25.12 12.76c-.037-.041-1.364.015-2.52 1.245-1.155 1.228-.978 2.636-.952 2.673.026.036 1.648.092 2.683-1.337s.826-2.54.79-2.582Zm3.592 12.465c-.052-.102-2.52-1.31-2.29-3.636.23-2.324 1.816-2.963 1.84-3.032.026-.069-.647-.84-1.359-1.23a4.072 4.072 0 0 0-1.694-.46c-.117-.003-.523-.101-1.36.123-.55.148-1.79.626-2.132.645-.343.019-1.362-.555-2.457-.707-.702-.132-1.445.14-1.977.349-.532.208-1.542.801-2.249 2.377-.706 1.574-.337 4.069-.072 4.845.264.775.677 2.044 1.38 2.97.624 1.046 1.452 1.771 1.798 2.018.346.246 1.321.41 1.998.07.544-.326 1.526-.514 1.914-.5.387.013 1.15.163 1.931.572.62.21 1.204.122 1.79-.112.587-.234 1.436-1.125 2.427-2.93.375-.84.546-1.293.512-1.362Z"
            /> 
          }
        />

        <SvgIcon width={60} height={60} 
          extraPath={
            <Path
            // Google icon svg
              fill="#DBB33A"
              d="M30.517 19.718c.099.57.148 1.149.147 1.728 0 2.586-.924 4.773-2.533 6.253h.002c-1.406 1.3-3.34 2.051-5.633 2.051a8.5 8.5 0 1 1 0-17 8.182 8.182 0 0 1 5.686 2.213l-2.426 2.426a4.622 4.622 0 0 0-3.26-1.275c-2.217 0-4.101 1.496-4.773 3.51a5.1 5.1 0 0 0 0 3.255h.003c.675 2.012 2.556 3.508 4.773 3.508 1.146 0 2.13-.294 2.892-.812h-.003a3.932 3.932 0 0 0 1.7-2.583H22.5v-3.273h8.017Z"
            />
          }
        />

      </View>

      {/* Cadastro */}
      <TouchableOpacity className="mt-6 items-center">
        <Text className="text-gray-400 text-sm">
          Não tem uma conta?{" "}
          <Text className="text-white underline">Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
</ImageBackground>
    
  );
}
