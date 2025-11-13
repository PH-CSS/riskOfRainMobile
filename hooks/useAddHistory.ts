// hooks/useAddHistory.ts 
import { ref, push, serverTimestamp } from 'firebase/database';
import { dbFB } from '../config/firebaseConfig';
import { useAuth } from './useAuth';

interface AddHistoryParams {
  room: string;
  action: 'fechado' | 'aberto';
  deviceId: string;
  subtitle?: string;
  image?: string;
}

export const useAddHistory = () => {
  const { user } = useAuth();

  const addHistory = async ({
    room,
    action,
    deviceId,
    subtitle = `ESP ${deviceId}`,
    image
  }: AddHistoryParams): Promise<boolean> => {
    if (!user?.uid) {
      console.log('❌ addHistory: User UID não encontrado');
      return false;
    }

    try {
      const historyRef = ref(dbFB, `userWeb/user/${user.uid}/history`);
      
      const historyData = {
        room,
        action,
        deviceId,
        subtitle,
        image: image || getDefaultImage(room),
        timestamp: Date.now() // ← CORREÇÃO: Usa timestamp atual
      };

      console.log('📝 Adicionando histórico:', historyData);
      
      await push(historyRef, historyData);

      console.log('✅ Histórico adicionado com sucesso:', room, action);
      return true;
    } catch (error) {
      console.error('❌ Erro ao adicionar histórico:', error);
      return false;
    }
  };

  return { addHistory };
};

const getDefaultImage = (roomName: string): string => {
  const roomImages: { [key: string]: string } = {
    'Quarto': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
    'Sala': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    'Cozinha': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
    'Banheiro': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400',
    'Portão': 'https://plus.unsplash.com/premium_photo-1661286705410-edb4c9bde72a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  };

  return roomImages[roomName] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400';
};