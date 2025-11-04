// hooks/useUserWeb.ts
import { useState, useEffect, useRef } from 'react';
import { ref, get, update, onValue, set } from 'firebase/database';
import { dbFB } from '../config/firebaseConfig';
import { useAuthStore } from './authStore';

export interface EspDevice {
  ativo: boolean;
  name: string;
}

export interface UserDevices {
  Esp: {
    [key: string]: EspDevice;
  };
  sensor: boolean;
}

// ATUALIZADO: Adicione profilePicture
export interface UserWebData {
  cpf: string;
  email: string;
  name: string;
  password: string;
  profilePicture?: string | null; 
  devices: UserDevices;
}

export const useUserWeb = () => {
  const { user } = useAuthStore();
  const [userWebData, setUserWebData] = useState<UserWebData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    console.log('📥 Buscando dados do userWeb para UID:', user.uid);
    setLoading(true);

    const userWebRef = ref(dbFB, `userWeb/user/${user.uid}`);
    
    const unsubscribe = onValue(userWebRef, (snapshot) => {
      try {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('✅ Dados do userWeb encontrados:', data);
          
        setUserWebData({
          cpf: data.cpf || '',
          email: data.email || '',
          name: data.name || '',
          password: data.password || '',
          profilePicture: typeof data.profilePicture === 'string' ? data.profilePicture : null, // ← CORREÇÃO
          devices: data.devices || {
            Esp: {},
            sensor: false
          }
        });
        
          setError(null);
        } else {
          console.log('⚠️ Usuário não encontrado em userWeb');
          setUserWebData(null);
        }
      } catch (err) {
        console.error('❌ Erro ao carregar dados do userWeb:', err);
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    }, (error) => {
      console.error('❌ Erro no listener do userWeb:', error);
      setError('Erro de conexão');
      setLoading(false);
    });

    return () => {
      console.log('🧹 Cleanup userWeb listener');
      unsubscribe();
    };
  }, [user?.uid]);

  // Função para atualizar dados básicos
  const updateUserData = async (updates: Partial<UserWebData>): Promise<boolean> => {
    if (!user?.uid) return false;

    try {
      const userWebRef = ref(dbFB, `userWeb/user/${user.uid}`);
      await update(userWebRef, updates);
      console.log('✅ Dados do usuário atualizados:', updates);
      return true;
    } catch (error) {
      console.error('❌ Erro ao atualizar dados do usuário:', error);
      setError('Erro ao atualizar dados');
      return false;
    }
  };

  // Função para atualizar dispositivo ESP específico
  const updateEspDevice = async (espId: string, updates: Partial<EspDevice>): Promise<boolean> => {
    if (!user?.uid) return false;

    try {
      const espRef = ref(dbFB, `userWeb/user/${user.uid}/devices/Esp/${espId}`);
      await update(espRef, updates);
      console.log('✅ Dispositivo ESP atualizado:', espId, updates);
      return true;
    } catch (error) {
      console.error('❌ Erro ao atualizar dispositivo ESP:', error);
      setError('Erro ao atualizar dispositivo');
      return false;
    }
  };

  // Função para atualizar sensor global
  const updateSensorStatus = async (sensorStatus: boolean): Promise<boolean> => {
    if (!user?.uid) return false;

    try {
      const sensorRef = ref(dbFB, `userWeb/user/${user.uid}/devices/sensor`);
      await set(sensorRef, sensorStatus);
      console.log('✅ Status do sensor atualizado:', sensorStatus);
      return true;
    } catch (error) {
      console.error('❌ Erro ao atualizar sensor:', error);
      setError('Erro ao atualizar sensor');
      return false;
    }
  };

  return {
    userWebData,
    loading,
    error,
    updateUserData,
    updateEspDevice,
    updateSensorStatus,
    refresh: () => setLoading(true)
  };
};