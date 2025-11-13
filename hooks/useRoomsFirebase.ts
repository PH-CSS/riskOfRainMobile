// hooks/useRoomsFirebase.ts
import { useState, useEffect, useRef } from 'react';
import { ref, onValue, update, set, get } from 'firebase/database';
import { dbFB } from '../config/firebaseConfig';
import { useAuth } from './useAuth';
import { useAddHistory } from './useAddHistory';

interface EspDevice {
  name: string;
  ativo: boolean;
}

export interface Room {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  isEnabled: boolean;
}

export const useRoomsFirebase = () => {
  const { user } = useAuth();
  const { addHistory } = useAddHistory();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [sensorStatus, setSensorStatus] = useState<boolean>(false);
  
  const unsubscribeRoomsRef = useRef<(() => void) | null>(null);
  const unsubscribeSensorRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!user?.uid) {
      setRooms([]);
      setLoading(false);
      return;
    }

    // Limpa listeners anteriores
    if (unsubscribeRoomsRef.current) {
      unsubscribeRoomsRef.current();
    }
    if (unsubscribeSensorRef.current) {
      unsubscribeSensorRef.current();
    }

    console.log('🏠 Buscando cômodos do usuário:', user.uid);
    setLoading(true);

    const userRoomsRef = ref(dbFB, `userWeb/user/${user.uid}/devices/Esp`);
    const sensorRef = ref(dbFB, `userWeb/user/${user.uid}/devices/sensor`);
    
    // Listener para os ESPs (cômodos) - APENAS MONITORA, NÃO ALTERA
    unsubscribeRoomsRef.current = onValue(userRoomsRef, (snapshot) => {
      try {
        if (snapshot.exists()) {
          const espData = snapshot.val() as { [key: string]: EspDevice };
          console.log('✅ Dados dos ESPs encontrados');
          
          const roomsArray: Room[] = Object.entries(espData).map(([id, device]) => ({
            id,
            title: device.name || 'Dispositivo',
            subtitle: `ESP ${id}`,
            image: getRoomImage(device.name),
            isEnabled: device.ativo || false
          }));
          
          console.log('🏠 Cômodos convertidos:', roomsArray.length);
          setRooms(roomsArray);
        } else {
          console.log('⚠️ Nenhum ESP encontrado para o usuário');
          setRooms([]);
        }
      } catch (error) {
        console.error('❌ Erro ao carregar cômodos:', error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    });

    // Listener para o sensor - APENAS MONITORA, NÃO ALTERA OS CARDS
    unsubscribeSensorRef.current = onValue(sensorRef, (snapshot) => {
      try {
        const sensorValue = snapshot.exists() ? snapshot.val() : false;
        console.log('🔍 Status do sensor:', sensorValue);
        
        // ✅ APENAS ATUALIZA O ESTADO DO SENSOR, NÃO ALTERA OS CÔMODOS
        setSensorStatus(sensorValue);
        
        // ❌ REMOVIDO: Código que fechava automaticamente os cômodos
        
      } catch (error) {
        console.error('❌ Erro ao monitorar sensor:', error);
      }
    });

    return () => {
      console.log('🧹 Cleanup rooms e sensor listeners');
      if (unsubscribeRoomsRef.current) {
        unsubscribeRoomsRef.current();
        unsubscribeRoomsRef.current = null;
      }
      if (unsubscribeSensorRef.current) {
        unsubscribeSensorRef.current();
        unsubscribeSensorRef.current = null;
      }
    };
  }, [user?.uid]); 

  // ✅ REMOVIDA: Função closeAllRoomsAutomatically (não é mais usada)

  // Função para atualizar estado de um cômodo (controle manual)
  const updateRoomState = async (roomId: string, isEnabled: boolean): Promise<boolean> => {
    if (!user?.uid) return false;

    try {
      console.log('🔄 updateRoomState chamado para:', roomId, isEnabled);
      
      const roomRef = ref(dbFB, `userWeb/user/${user.uid}/devices/Esp/${roomId}/ativo`);
      await set(roomRef, isEnabled);
      
      // Registrar no histórico - Ação manual do usuário
      const room = rooms.find(r => r.id === roomId);
      if (room) {
        console.log('📝 Chamando addHistory para:', room.title, isEnabled ? 'aberto' : 'fechado');
        await addHistory({
          room: room.title,
          action: isEnabled ? 'aberto' : 'fechado',
          deviceId: roomId,
          subtitle: room.subtitle,
          image: room.image
        });
      }
      
      console.log('✅ Estado do cômodo atualizado:', roomId, isEnabled);
      return true;
    } catch (error) {
      console.error('❌ Erro ao atualizar cômodo:', error);
      return false;
    }
  };

  // Função para fechar todos os cômodos (manual)
  const closeAllRooms = async (): Promise<boolean> => {
    if (!user?.uid) return false;

    try {
      const updates: { [key: string]: boolean } = {};
      rooms.forEach(room => {
        updates[`userWeb/user/${user.uid}/devices/Esp/${room.id}/ativo`] = false;
      });

      await update(ref(dbFB), updates);
      
      // Registrar no histórico - Ação manual "Fechar tudo"
      for (const room of rooms) {
        if (room.isEnabled) {
          console.log('📝 Registrando "Fechar tudo" para:', room.title);
          await addHistory({
            room: room.title,
            action: 'fechado',
            deviceId: room.id,
            subtitle: room.subtitle,
            image: room.image
          });
        }
      }
      
      console.log('✅ Todos os cômodos fechados manualmente');
      return true;
    } catch (error) {
      console.error('❌ Erro ao fechar todos os cômodos:', error);
      return false;
    }
  };

  // Função para abrir todos os cômodos (manual)
  const openAllRooms = async (): Promise<boolean> => {
    if (!user?.uid) return false;

    try {
      const updates: { [key: string]: boolean } = {};
      rooms.forEach(room => {
        updates[`userWeb/user/${user.uid}/devices/Esp/${room.id}/ativo`] = true;
      });

      await update(ref(dbFB), updates);
      
      // Registrar no histórico - Ação manual "Abrir tudo"
      for (const room of rooms) {
        if (!room.isEnabled) {
          console.log('📝 Registrando "Abrir tudo" para:', room.title);
          await addHistory({
            room: room.title,
            action: 'aberto',
            deviceId: room.id,
            subtitle: room.subtitle,
            image: room.image
          });
        }
      }
      
      console.log('✅ Todos os cômodos abertos manualmente');
      return true;
    } catch (error) {
      console.error('❌ Erro ao abrir todos os cômodos:', error);
      return false;
    }
  };

  return {
    rooms,
    loading,
    sensorStatus, // Apenas para informação, não para controle
    updateRoomState,
    closeAllRooms,
    openAllRooms
  };
};

// Função auxiliar permanece igual
const getRoomImage = (roomName: string): string => {
  const roomImages: { [key: string]: string } = {
    'Quarto': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
    'Sala': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    'Cozinha': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
    'Banheiro': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400',
    'Portão': 'https://plus.unsplash.com/premium_photo-1661286705410-edb4c9bde72a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  };

  return roomImages[roomName] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400';
};