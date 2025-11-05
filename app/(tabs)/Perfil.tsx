// Perfil.tsx
import { 
  View, 
  Text, 
  Image, 
  ActivityIndicator, 
  TouchableOpacity, 
  SafeAreaView, 
  ImageBackground,
  Alert,
  TextInput,
  ScrollView,
  Switch
} from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useUserWeb } from "../../hooks/useUserWeb";
import { useProfilePictureFree } from '../../hooks/useProfilePictureImgBB';
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

export default function Perfil() {
  const { user, loading: authLoading, logout } = useAuth();
  const { userWebData, loading: userWebLoading, updateUserData } = useUserWeb();
  const { pickImageFromGallery, takePhotoWithCamera, uploading, error } = useProfilePictureFree();
  const router = useRouter();

  
  // Estados para edição
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    cpf: '',
    password: ''
  });

  // Atualiza os dados de edição quando userWebData muda
  useEffect(() => {
    if (userWebData) {
      setEditData({
        name: userWebData.name || '',
        email: userWebData.email || '',
        cpf: userWebData.cpf || '',
        password: userWebData.password || ''
      });
    }
  }, [userWebData]);

  // Debugging profilePicture TIPO E VALOR
  useEffect(() => {
  if (userWebData?.profilePicture) {
    console.log('🔍 ProfilePicture type:', typeof userWebData.profilePicture);
    console.log('🔍 ProfilePicture value:', userWebData.profilePicture);
    console.log('🔍 Is string?', typeof userWebData.profilePicture === 'string');
    console.log('🔍 Starts with data:?', userWebData.profilePicture.toString().startsWith('data:image'));
  }
}, [userWebData?.profilePicture]);

  const loading = authLoading || userWebLoading;

  if (loading) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  const handleLogout = async (): Promise<void> => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Sair", 
          onPress: async () => {
            const result = await logout();
            if (result.success) {
              console.log('🔄 Redirecionando para LoginScreen...');
              router.replace("/LoginScreen");
            } else {
              Alert.alert('Erro', 'Falha ao fazer logout: ' + result.error);
            }
          }
        }
      ]
    );
  };

  const handleSaveUserData = async () => {
    try {
      const success = await updateUserData(editData);
      if (success) {
        Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
        setIsEditing(false);
      } else {
        Alert.alert('Erro', 'Falha ao atualizar dados');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar alterações');
    }
  };

  const handleCancel = () => {
    if (userWebData) {
      setEditData({
        name: userWebData.name || '',
        email: userWebData.email || '',
        cpf: userWebData.cpf || '',
        password: userWebData.password || ''
      });
    }
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleCancel();
    } else {
      setIsEditing(true);
    }
  };

  // Função para alterar foto de perfil
    const handleChangeProfilePicture = async () => {
    Alert.alert(
      "Alterar Foto de Perfil",
      "Escolha como deseja alterar sua foto:",
      [
        {
          text: " Tirar Foto",
          onPress: async () => {
            const success = await takePhotoWithCamera();
            if (success) {
              Alert.alert(" Sucesso", "Foto de perfil atualizada!");
            } else {
              Alert.alert(" Erro", "Não foi possível atualizar a foto");
            }
          }
        },
        {
          text: " Escolher da Galeria", 
          onPress: async () => {
            const success = await pickImageFromGallery();
            if (success) {
              Alert.alert(" Sucesso", "Foto de perfil atualizada!");
            } else {
              Alert.alert(" Erro", "Não foi possível atualizar a foto");
            }
          }
        },
        {
          text: "Cancelar",
          style: "cancel"
        }
      ]
    );
  };
  // Converter objetos ESP em array para FlatList
  const espDevices = userWebData?.devices?.Esp ? 
    Object.entries(userWebData.devices.Esp).map(([id, device]) => ({
      id,
      ...device
    })) : [];

  const sensorStatus = userWebData?.devices?.sensor || false;

    const profilePic = userWebData?.profilePicture;
  console.log('🖼️ Tentando carregar imagem:', profilePic);
  
  let imageSource;
  
  if (profilePic && typeof profilePic === 'string') {
    if (profilePic.startsWith('http') || profilePic.startsWith('data:image')) {
      imageSource = { uri: profilePic };
      console.log('✅ Usando URI:', profilePic.substring(0, 50) + '...');
    } else {
      console.log('❌ Formato não suportado:', profilePic.substring(0, 50) + '...');
      imageSource = require("../../assets/defaultAvatar.png");
    }
  } else {
    console.log('❌ Sem profilePicture ou não é string');
    imageSource = require("../../assets/defaultAvatar.png");
  }

  return (
    <ImageBackground
        source={require("../../assets/bg-pattern.png")}
        className="flex-1 bg-primarydark"
        resizeMode="repeat"
        imageStyle={{ opacity: 0.1 }}
    >
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-6 py-2" showsVerticalScrollIndicator={false}>
          
          {/* Cabeçalho */}
          <View className="flex-row items-center justify-between mt-5 mb-8">
            <Text className="font-ChakraPetch_medium text-yellow-500 text-2xl font-bold tracking-wider">PERFIL</Text>
            <View className="flex-row space-x-2">
              <TouchableOpacity 
                onPress={handleEditToggle}
                className="border border-primary01 px-3 py-1"
              >
                <Text className="font-ChakraPetch_medium text-yellow-500 font-semibold">
                  {isEditing ? 'Cancelar' : 'Editar'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleLogout} 
                className="border border-red-500 ml-2 px-3 py-1"
              >
                <Text className="font-ChakraPetch_medium text-red-400 font-semibold">Sair</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Informações do usuário */}
          <View className="items-center mb-8">
            <TouchableOpacity 
              onPress={handleChangeProfilePicture}
              disabled={uploading}
            >
              <View className="justify-center items-center mb-8">
                {/* container em formato de losango */}
                <View
                  className="justify-center items-center overflow-hidden"
                  style={{
                    width: 112,
                    height: 112,
                    borderWidth: 3,
                    borderColor: "#CBA135", // dourado
                    transform: [{ rotate: "45deg" }],
                    backgroundColor: "#333",
                  }}
                >
                  {uploading ? (
                    <View
                      className="justify-center items-center"
                      style={{
                        transform: [{ rotate: "-45deg" }],
                      }}
                    >
                      <ActivityIndicator size="small" color="#FFD700" />
                      <Text className="font-ChakraPetch_medium text-yellow-500 text-xs mt-2">Enviando...</Text>
                    </View>
                  ) : (
                    <Image
                      source={
                        userWebData?.profilePicture
                          ? { uri: userWebData.profilePicture }
                          : require("../../assets/defaultAvatar.png")
                      }
                      style={{
                        width: 150, 
                        height: 150,
                        transform: [{ rotate: "-45deg" }],
                        resizeMode: "cover",
                      }}
                      onError={(e) =>
                        console.log("❌ Erro ao carregar imagem:", e.nativeEvent.error)
                      }
                      onLoad={() => console.log("✅ Imagem carregada com sucesso!")}
                    />
                  )}
                </View>
              </View>

            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleChangeProfilePicture}
              disabled={uploading}
              className="mt-2"
            >
              <Text className="font-ChakraPetch_medium text-yellow-500 text-sm underline">
                {uploading ? 'Enviando foto...' : 'Alterar foto'}
              </Text>
            </TouchableOpacity>


              {/*  NOME DO USUARIO */}
            <View className="my-4 flex-row items-center px-6">
              <View className="h-px flex-1 bg-yellow-500" />
            </View>

              <Text className="font-ChakraPetch_medium  text-white text-4xl font-semibold ">
                {userWebData?.name || user?.name || "Usuário"}
              </Text>

            <View className="my-4 flex-row items-center px-6">
              <View className="h-px flex-1 bg-yellow-500" />
            </View>

            <Text className="font-ChakraPetch_medium text-gray-400 mt-1">{userWebData?.email || user?.email}</Text>
            <Text className="font-ChakraPetch_medium text-gray-500 text-sm mt-1">
              ID: {user?.uid?.substring(0, 8)}...
            </Text>
            
            {/* Botão para alterar foto (apenas visual) */}

          </View>

          {/* Formulário de Edição */}
          <View className="bg-darkgray border border-primary01 p-6 mb-6">
            <Text className="font-ChakraPetch_medium text-yellow-500 text-lg font-bold mb-4 text-center">
              {isEditing ? 'EDITAR INFORMAÇÕES' : 'INFORMAÇÕES DA CONTA'}
            </Text>

            {/* Email */}
            <View className="mb-4">
              <Text className="font-ChakraPetch_medium text-white text-sm mb-2">Email</Text>
              {isEditing ? (
                <TextInput
                  className="bg-zinc-800 border border-primary01 px-4 py-3 text-white"
                  value={editData.email}
                  onChangeText={(text) => setEditData({...editData, email: text})}
                  placeholder="Seu email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text className="font-ChakraPetch_medium text-gray-300 bg-primarydark px-4 py-3">
                  {userWebData?.email || 'Não informado'}
                </Text>
              )}
            </View>

            {/* Nome */}
            <View className="mb-4">
              <Text className="font-ChakraPetch_medium text-white text-sm mb-2">Nome</Text>
              {isEditing ? (
                <TextInput
                  className="bg-primarydark border border-primary01 px-4 py-3 text-white"
                  value={editData.name}
                  onChangeText={(text) => setEditData({...editData, name: text})}
                  placeholder="Seu nome"
                  placeholderTextColor="#9CA3AF"
                />
              ) : (
                <Text className="font-ChakraPetch_medium text-gray-300 bg-primarydark px-4 py-3">
                  {userWebData?.name || 'Não informado'}
                </Text>
              )}
            </View>

            {/* CPF */}
            <View className="mb-4">
              <Text className="font-ChakraPetch_medium text-white text-sm mb-2">CPF</Text>
              {isEditing ? (
                <TextInput
                  className="bg-primarydark border border-primary01 px-4 py-3 text-white"
                  value={editData.cpf}
                  onChangeText={(text) => setEditData({...editData, cpf: text})}
                  placeholder="000.000.000-00"
                  placeholderTextColor="#9CA3AF"
                />
              ) : (
                <Text className="font-ChakraPetch_medium text-gray-300 bg-primarydark px-4 py-3">
                  {userWebData?.cpf || 'Não informado'}
                </Text>
              )}
            </View>

            {/* Senha */}
            <View className="mb-4">
              <Text className="font-ChakraPetch_medium text-white text-sm mb-2">Senha</Text>
              {isEditing ? (
                <TextInput
                  className="bg-primarydark border border-primary01 px-4 py-3 text-white"
                  value={editData.password}
                  onChangeText={(text) => setEditData({...editData, password: text})}
                  placeholder="Sua senha"
                  placeholderTextColor="#9CA3AF"
                />
              ) : (
                <Text className="font-ChakraPetch_medium text-gray-300 bg-primarydark px-4 py-3">
                  ••••••••••
                </Text>
              )}
            </View>

            {/* Botão Salvar (apenas no modo edição) */}
            {isEditing && (
              <TouchableOpacity 
                onPress={handleSaveUserData}
                className="bg-yellow-500 py-3 mt-4"
              >
                <Text className="font-ChakraPetch_medium text-black font-bold text-center text-lg">
                  SALVAR ALTERAÇÕES
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Sensor Global */}
          <View className="bg-darkgray border border-primary01 p-6 mb-6">
            <Text className="font-ChakraPetch_medium text-yellow-500 text-lg font-bold mb-4 text-center">
              SENSOR GLOBAL
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="font-ChakraPetch_medium text-white text-lg">Status do Sensor</Text>
              <Switch
                value={sensorStatus}
                trackColor={{ false: '#767577', true: '#DBB33A' }}
                thumbColor={sensorStatus ? '#f4f3f4' : '#f4f3f4'}
              />
            </View>
            <Text className="font-ChakraPetch_medium text-gray-400 text-sm mt-2">
              {sensorStatus 
                ? 'Sensor estão ativo: O sensor está molhado' 
                : 'Sensor desativado: O sensor está seco'
              }
            </Text>
          </View>

          {/* Estatísticas */}
          <View className="mt-6 border-t border-primary01 pt-4 ">
            <View className="flex-row justify-between ">
              <View className="items-center">
                <Text className="font-ChakraPetch_medium text-yellow-500 text-lg font-bold">{espDevices.length}</Text>
                <Text className="font-ChakraPetch_medium text-gray-400 text-xs">Dispositivos</Text>
              </View>
              <View className="items-center">
                <Text className="font-ChakraPetch_medium text-yellow-500 text-lg font-bold">
                  {espDevices.filter(esp => esp.ativo).length}
                </Text>
                <Text className="font-ChakraPetch_medium text-gray-400 text-xs">Ativos</Text>
              </View>
              <View className="items-center">
                <Text className="font-ChakraPetch_medium text-yellow-500 text-lg font-bold">1</Text>
                <Text className="font-ChakraPetch_medium text-gray-400 text-xs">Conta</Text>
              </View>
            </View>
          </View>

          {/* Rodapé */}
          <View className="mt-6 mb-6 border-t border-primary01 pt-4 pb-8 ">
            <Text className="font-ChakraPetch_medium text-gray-500 text-center text-sm">
              Risk of Rain Mobile © 2025
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}