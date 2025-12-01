import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Bell, Plus } from "lucide-react-native";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUserWeb } from '../hooks/useUserWeb';
import { useRouter } from "expo-router";

export default function Header() {
  const { user } = useAuth();
  const { userWebData, loading: userWebLoading } = useUserWeb(); // ← Renomear para evitar conflito
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [cachedImage, setCachedImage] = useState<string | null>(null);
  const router = useRouter();

  const getUserName = () => {
    if (userWebData?.name) return userWebData.name;
    if (user?.name) return user.name;
    return 'Usuário';
  };

  // Função para formatar o nome
  const formatName = (name: string) => {
    const firstName = name.split(' ')[0];
    if (firstName.length > 10) {
      return firstName.substring(0, 10) + '...';
    }
    return firstName;
  };

  const profilePicture = userWebData?.profilePicture || null;

  // DEBUG: Verificar o que está acontecendo
  useEffect(() => {
    console.log("🔍 DEBUG Header:", {
      userWebLoading,
      userWebData: !!userWebData,
      profilePicture,
      imageLoading,
      imageError
    });
  }, [userWebLoading, userWebData, profilePicture, imageLoading, imageError]);

  // Cache da imagem - CORRIGIDO
  useEffect(() => {
    // Se não tem profilePicture, vai usar a imagem padrão
    if (!profilePicture) {
      console.log("📸 Sem profilePicture, usando imagem padrão");
      setImageLoading(false);
      setImageError(true); // Força usar a imagem padrão
      return;
    }

    // Se tem profilePicture e é diferente da cache
    if (profilePicture && profilePicture !== cachedImage) {
      console.log("🔄 Pré-carregando imagem:", profilePicture);
      setImageLoading(true);
      setImageError(false);
      
      Image.prefetch(profilePicture)
        .then(() => {
          console.log("✅ Imagem pré-carregada!");
          setCachedImage(profilePicture);
          setImageLoading(false);
        })
        .catch((error) => {
          console.log("❌ Erro no pré-carregamento:", error);
          setImageError(true);
          setImageLoading(false);
        });
    }
  }, [profilePicture, cachedImage]);

  // Função para navegar para a tela de Perfil
  const handleProfilePress = () => {
    console.log("📱 Navegando para Perfil...");
    router.push('/Perfil');
  };

  // Determinar o que mostrar na imagem
  const renderProfileImage = () => {
    // Se ainda está carregando os dados do userWeb
    if (userWebLoading) {
      return (
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
      );
    }

    // Se está carregando uma imagem específica
    if (imageLoading && profilePicture) {
      return (
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
      );
    }

    // Se tem erro OU não tem profilePicture → mostrar imagem padrão
    if (imageError || !profilePicture) {
      return (
        <Image
          source={require("../assets/defaultAvatar.png")}
          style={{
            width: 70, 
            height: 70,
            transform: [{ rotate: "-45deg" }],
            resizeMode: "cover",
          }}
          onLoad={() => console.log("✅ Imagem padrão carregada!")}
        />
      );
    }

    // Se tem profilePicture válida
    return (
      <Image
        source={{ uri: profilePicture }}
        style={{
          width: 70, 
          height: 70,
          transform: [{ rotate: "-45deg" }],
          resizeMode: "cover",
        }}
        onLoad={() => console.log("✅ Imagem do perfil carregada!")}
        onError={() => {
          console.log("❌ Falha ao carregar imagem do perfil");
          setImageError(true);
        }}
      />
    );
  };

  return (
    <View className="flex-row justify-between items-center my-4 mt-6 mb-10 px-6 p-4 pt-6">
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
            {renderProfileImage()}
          </View>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center ml-4">
        <View>
          <Text className="text-white font-MajorMonoDisplay capitalize text-3xl">
            HI {formatName(getUserName())}
          </Text>
          <Text className="text-gray-400 font-ChakraPetch_light text-lg">
            Casa de {getUserName()} ▽
          </Text>
        </View>
      </View>
    </View>
  );
}