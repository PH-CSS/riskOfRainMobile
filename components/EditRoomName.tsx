// components/EditRoomName.tsx
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { useUserWeb } from '../hooks/useUserWeb';
import EditIcon from './Icons/EditIcon';


interface EditRoomNameProps {
  roomId: string;
  currentName: string;
  onNameUpdated?: (newName: string) => void;
}

export const EditRoomName: React.FC<EditRoomNameProps> = ({ 
  roomId, 
  currentName, 
  onNameUpdated 
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState(currentName);
  const [loading, setLoading] = useState(false);
  const { updateEspDevice } = useUserWeb();

  const handleEditPress = () => {
    setNewName(currentName);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!newName.trim()) {
      Alert.alert('Erro', 'O nome não pode estar vazio');
      return;
    }

    if (newName === currentName) {
      setModalVisible(false);
      return;
    }

    setLoading(true);
    try {
      const success = await updateEspDevice(roomId, { name: newName.trim() });
      
      if (success) {
        console.log('✅ Nome do ESP atualizado:', roomId, newName);
        onNameUpdated?.(newName.trim());
        setModalVisible(false);
      } else {
        Alert.alert('Erro', 'Não foi possível atualizar o nome');
      }
    } catch (error) {
      console.error('❌ Erro ao atualizar nome:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o nome');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNewName(currentName);
    setModalVisible(false);
  };

  return (
    <>
      {/* Botão de edição */}
      <TouchableOpacity 
        onPress={handleEditPress}
        className="p-1"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <EditIcon size={14} color="#DBB33A" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        {/* Container principal com blur */}
        <BlurView
          intensity={30} // Intensidade do blur (0-100)
          tint="dark" // dark, light, ou default
          className="flex-1 justify-center items-center"
        >
          {/* Overlay escuro para melhor contraste */}
          <View className="absolute inset-0 bg-black/30" />
          
          {/* Conteúdo do modal */}
          <View className="bg-darkgray border border-yellow-500 rounded-lg p-6 mx-4 w-80 z-10">
            <Text className="text-white text-lg font-bold mb-4 text-center">
              Editar Nome do Cômodo
            </Text>
            
            <TextInput
              value={newName}
              onChangeText={setNewName}
              placeholder="Digite o novo nome"
              placeholderTextColor="#9CA3AF"
              className=" border border-yellow-500 rounded-lg px-4 py-3 text-white mb-4"
              autoFocus
              maxLength={20}
              onSubmitEditing={handleSave}
            />
            
            <View className="flex-row justify-between space-x-3 gap-3">
              <TouchableOpacity
                onPress={handleCancel}
                className="flex-1 border border-yellow-500 rounded-lg py-3"
                disabled={loading}
              >
                <Text className="text-yellow-500 text-center font-medium">
                  Cancelar
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleSave}
                className="flex-1 bg-yellow-500 rounded-lg py-3"
                disabled={loading || !newName.trim()}
              >
                <Text className="text-black text-center font-medium">
                  {loading ? 'Salvando...' : 'Salvar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    </>
  );
};

export default EditRoomName;