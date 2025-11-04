// hooks/useProfilePictureFree.ts
import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { dbFB } from '../config/firebaseConfig';
import { useAuth } from './useAuth';
import * as ImagePicker from 'expo-image-picker';

// SUA CHAVE DO IMGBB AQUI (obtenha em https://api.imgbb.com/)
const IMGBB_API_KEY = '55f502c5b49d239970236598135ab540'; 

export const useProfilePictureFree = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Upload para ImgBB (serviço gratuito)
  const uploadToImgBB = async (base64Image: string): Promise<string | null> => {
    try {
      console.log('📤 Enviando para ImgBB...');
      
      // Remove o prefixo "data:image/jpeg;base64," se existir
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
      
      const formData = new FormData();
      formData.append('image', base64Data);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('📋 Resposta do ImgBB:', data);
      
      if (data.success) {
        console.log('✅ ImgBB upload success, URL:', data.data.url);
        return data.data.url; // URL da imagem no ImgBB
      } else {
        throw new Error(data.error?.message || 'Erro no upload para ImgBB');
      }
    } catch (error) {
      console.error('❌ Erro no ImgBB:', error);
      return null;
    }
  };

  const saveProfilePictureURL = async (imageUrl: string): Promise<boolean> => {
    if (!user?.uid) return false;

    try {
      const userRef = ref(dbFB, `userWeb/user/${user.uid}`);
      await update(userRef, {
        profilePicture: imageUrl
      });
      console.log('✅ URL da foto salva no Database:', imageUrl);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar URL:', error);
      return false;
    }
  };

  const pickImageFromGallery = async (): Promise<boolean> => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        setError('Permissão para acessar galeria negada');
        return false;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7, // Qualidade boa
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        setUploading(true);
        setError(null);
        
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        console.log('🖼️ Base64 gerado, tamanho:', base64Image.length);
        
        // Faz upload para ImgBB
        const imageUrl = await uploadToImgBB(base64Image);
        
        if (imageUrl) {
          // Salva a URL do ImgBB no Firebase
          const success = await saveProfilePictureURL(imageUrl);
          setUploading(false);
          return success;
        } else {
          setError('Falha no upload para ImgBB');
          setUploading(false);
          return false;
        }
      }
      
      return false;
    } catch (error) {
      setUploading(false);
      console.error('❌ Erro ao selecionar imagem:', error);
      setError('Erro ao selecionar imagem');
      return false;
    }
  };

  const takePhotoWithCamera = async (): Promise<boolean> => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        setError('Permissão para acessar câmera negada');
        return false;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        setUploading(true);
        setError(null);
        
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        console.log('📸 Foto tirada, tamanho Base64:', base64Image.length);
        
        const imageUrl = await uploadToImgBB(base64Image);
        
        if (imageUrl) {
          const success = await saveProfilePictureURL(imageUrl);
          setUploading(false);
          return success;
        } else {
          setError('Falha no upload para ImgBB');
          setUploading(false);
          return false;
        }
      }
      
      return false;
    } catch (error) {
      setUploading(false);
      console.error('❌ Erro ao tirar foto:', error);
      setError('Erro ao tirar foto');
      return false;
    }
  };

  return {
    pickImageFromGallery,
    takePhotoWithCamera,
    uploading,
    error
  };
};