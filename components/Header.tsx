import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Bell, Plus } from "lucide-react-native";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUserWeb } from '../hooks/useUserWeb';
import { useRouter } from "expo-router";

export default function Header() {
  const { user } = useAuth();
  const { userWebData, loading } = useUserWeb();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [cachedImage, setCachedImage] = useState<string | null>(null);
  const router = useRouter(); // Hook de navegação

  const getUserName = () => {
    if (userWebData?.name) return userWebData.name;
    if (user?.name) return user.name;
    return 'Usuário';
  };

  const profilePicture = userWebData?.profilePicture || null;

  // Cache da imagem
  useEffect(() => {
    if (profilePicture && profilePicture !== cachedImage) {
      console.log("🔄 Pré-carregando imagem...");
      setImageLoading(true);
      setImageError(false);
      
      // Pré-carrega a imagem
      Image.prefetch(profilePicture)
        .then(() => {
          console.log("✅ Imagem pré-carregada!");
          setCachedImage(profilePicture);
        })
        .catch((error) => {
          console.log("❌ Erro no pré-carregamento:", error);
          setImageError(true);
        })
        .finally(() => {
          setImageLoading(false);
        });
    }
  }, [profilePicture]);

  // Função para navegar para a tela de Perfil
  const handleProfilePress = () => {
    console.log("📱 Navegando para Perfil...");
    router.push('/Perfil'); // Navega para a tela Perfil
  };

  return (
    <View className="my-4 px-6 p-4 pt-6 ">
      <View className="flex-row justify-between items-center mb-4">
        {/* Container da Foto de Perfil - AGORA CLICÁVEL */}
        <TouchableOpacity 
          onPress={handleProfilePress}
          activeOpacity={0.7}
        >
          <View
            className="justify-center items-center overflow-hidden mb-3 ml-3"
            style={{
              width: 50,
              height: 50,
              borderWidth: 2,
              borderColor: "#CBA135",
              transform: [{ rotate: "45deg" }],
              backgroundColor: "#333",
            }}
          >
            {loading || imageLoading ? (
              <View
                className="justify-center items-center"
                style={{
                  transform: [{ rotate: "-45deg" }],
                  width: 70,
                  height: 70,
                }}
              >
                <ActivityIndicator size="small" color="#FFD700" />
              </View>
            ) : imageError || !profilePicture ? (
              <Image
                source={require("../assets/defaultAvatar.png")}
                style={{
                  width: 70, 
                  height: 70,
                  transform: [{ rotate: "-45deg" }],
                  resizeMode: "cover",
                }}
              />
            ) : (
              <Image
                source={{ uri: profilePicture }}
                style={{
                  width: 70, 
                  height: 70,
                  transform: [{ rotate: "-45deg" }],
                  resizeMode: "cover",
                }}
                onLoad={() => console.log("✅ Imagem renderizada!")}
                onError={() => {
                  console.log("❌ Falha ao renderizar imagem");
                  setImageError(true);
                }}
              />
            )}
          </View>
        </TouchableOpacity>

        <View className="flex-row gap-8 space-x-3">
          <TouchableOpacity className="bg-yellow-500 p-2 rounded-full">
            <Plus color="black" size={20} />
          </TouchableOpacity>
          <TouchableOpacity className="bg-yellow-500 p-2 rounded-full">
            <Bell color="black" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row items-center ">
        <View>
          <Text className="text-white font-MajorMonoDisplay capitalize text-3xl">HI {getUserName()}</Text>
          <Text className="text-gray-400 font-ChakraPetch_light text-lg">Casa de {getUserName()} ▽</Text>
        </View>
      </View>
    </View>
  );
}