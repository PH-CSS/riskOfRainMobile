// app/LoginScreen.tsx
import { View, Text, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { Path } from "react-native-svg";
import { Input } from "../components/Input";
import SvgIcon from "../components/SvgLoginComponent";
import { useRouter } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginScreen() {
  const router = useRouter();
  const { login, user, loading, authChecked } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Use ref para controlar redirecionamentos duplicados
  const redirecting = useRef(false);

  // Monitora mudanças no estado de autenticação
  useEffect(() => {
    console.log('👀 LoginScreen - Monitorando autenticação:');
    console.log('   👤 User:', user ? user.email : 'null');
    console.log('   ⏳ Loading:', loading);
    console.log('   ✅ Auth checked:', authChecked);

    // Previne redirecionamentos duplicados
    if (redirecting.current) {
      console.log('🛑 Redirecionamento já em andamento...');
      return;
    }

    // Redireciona quando temos usuário E o auth foi verificado E não está loading
    if (user && authChecked && !loading) {
      console.log('🎯 Redirecionando para HomeScreen...');
      redirecting.current = true;
      
      // Pequeno delay para garantir tudo está carregado
      setTimeout(() => {
        router.replace("/(tabs)/HomeScreen");
        redirecting.current = false;
      }, 1000);
    }
  }, [user, loading, authChecked, router]);

  const handleLogin = async () => {
    console.log("Botão pressionado - Início da função");
    
    if (!email.trim() || !password.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }
    
    if (!email.includes("@")) {
      Alert.alert("Erro", "Por favor, insira um email válido");
      return;
    }
    
    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    console.log("Campos preenchidos, fazendo login...");
    setIsLoading(true);
    
    try {
      const result = await login(email, password);
      console.log('📋 Resultado do login:', result);
      
      if (result.success) {
        console.log("✅ Login realizado com sucesso - aguardando redirecionamento...");
      } else {
        Alert.alert("Erro no login", result.error || "Erro desconhecido");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro inesperado");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-primarydark">
      {/* Background Image com styling correto */}
      <ImageBackground 
        source={require("../assets/bg-pattern.png")} 
        className="flex-1"
        resizeMode="repeat"
        imageStyle={{ opacity: 0.1 }} // Controla a opacidade diretamente
      >
        <View className="flex-1 px-8 justify-center">
          {/* Título */}
          <Text className="text-5xl font-MajorMonoDisplay text-white mb-10">
            Realize o{"\n"}login
          </Text>

          {/* Inputs */}
          <Text className="text-white mb-1 text-sm">Email</Text>
          <Input 
            placeholder="email@gmail.com" 
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <View className="mt-4" />
          
          <Text className="text-white mb-1 text-sm">Senha</Text>
          <Input 
            placeholder="********" 
            secureTextEntry 
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />

          {/* Esqueceu a senha */}
          <TouchableOpacity className="mt-2">
            <Text className="text-white text-sm">Esqueceu sua senha?</Text>
          </TouchableOpacity>

          {/* Botão principal -> chama handleLogin */}
          <TouchableOpacity 
            className={`bg-yellow-500 rounded-lg p-4 mt-6 ${isLoading ? 'opacity-50' : ''}`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text className="text-black font-bold text-center text-lg">
              {isLoading ? "ENTRANDO..." : "LOGAR"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-primary01" />
            <Text className="text-white px-2">Ou entre com</Text>
            <View className="flex-1 h-px bg-primary01" />
          </View>

          {/* Social Buttons SVG */}
          <View className="flex-row justify-evenly w-full">
            <TouchableOpacity>
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
            </TouchableOpacity>
            
            <TouchableOpacity>
              <SvgIcon 
                width={60} 
                height={60} 
                extraPath={
                  <Path 
                    fill="#DBB33A" 
                    d="M30.517 19.718c.099.57.148 1.149.147 1.728 0 2.586-.924 4.773-2.533 6.253h.002c-1.406 1.3-3.34 2.051-5.633 2.051a8.5 8.5 0 1 1 0-17 8.182 8.182 0 0 1 5.686 2.213l-2.426 2.426a4.622 4.622 0 0 0-3.26-1.275c-2.217 0-4.101 1.496-4.773 3.51a5.1 5.1 0 0 0 0 3.255h.003c.675 2.012 2.556 3.508 4.773 3.508 1.146 0 2.13-.294 2.892-.812h-.003a3.932 3.932 0 0 0 1.7-2.583H22.5v-3.273h8.017Z" 
                  />
                } 
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}