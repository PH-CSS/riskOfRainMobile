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
    <View className=" font-ChakraPetch_light flex-1 bg-primarydark">
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
            className={` font-ChakraPetch_light bg-yellow-500 p-4 mt-6 ${isLoading ? 'opacity-50' : ''}`}
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

        </View>
      </ImageBackground>
    </View>
  );
}