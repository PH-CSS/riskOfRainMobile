// hooks/useUserWeb.ts
import { useState, useEffect } from 'react';
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
  const [actualDatabaseUid, setActualDatabaseUid] = useState<string | null>(null);

  // Função para encontrar usuário no database pelo email
  const findUserInDatabase = async (email: string): Promise<{ uid: string; data: any } | null> => {
    try {
      const usersRef = ref(dbFB, 'userWeb/user');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const users = snapshot.val();
        
        for (const [uid, userData] of Object.entries(users)) {
          const userDataObj = userData as any;
          if (userDataObj.email && userDataObj.email.toLowerCase() === email.toLowerCase()) {
            console.log('✅ Usuário encontrado no database:', { uid, email: userDataObj.email });
            return { uid, data: userDataObj };
          }
        }
      }
      
      console.log('❌ Nenhum usuário encontrado com o email:', email);
      return null;
    } catch (error) {
      console.error('❌ Erro ao buscar usuário por email:', error);
      return null;
    }
  };

  useEffect(() => {
    if (!user?.uid || !user?.email) {
      setLoading(false);
      return;
    }

    console.log('📥 Iniciando busca de dados para:', {
      authUid: user.uid,
      authEmail: user.email
    });

    const loadUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Busca o usuário no database pelo email
        const userFound = await findUserInDatabase(user.email!);
        
        if (!userFound) {
          console.log('❌ Usuário não encontrado no database');
          setUserWebData(null);
          setLoading(false);
          return;
        }

        console.log('🎯 Usando UID do database:', userFound.uid);
        setActualDatabaseUid(userFound.uid);

        // Agora escuta as mudanças no UID correto do database
        const userWebRef = ref(dbFB, `userWeb/user/${userFound.uid}`);
        
        const unsubscribe = onValue(userWebRef, (snapshot) => {
          try {
            if (snapshot.exists()) {
              const data = snapshot.val();
              console.log('✅ Dados carregados do userWeb:', data);
              
              setUserWebData({
                cpf: data.cpf || '',
                email: data.email || '',
                name: data.name || '',
                password: data.password || '',
                profilePicture: typeof data.profilePicture === 'string' ? data.profilePicture : null,
                devices: data.devices || {
                  Esp: {},
                  sensor: false
                }
              });
              setError(null);
            } else {
              console.log('⚠️ Dados não encontrados no path final');
              setUserWebData(null);
            }
          } catch (err) {
            console.error('❌ Erro ao processar dados:', err);
            setError('Erro ao carregar dados');
          } finally {
            setLoading(false);
          }
        }, (error) => {
          console.error('❌ Erro no listener:', error);
          setError('Erro de conexão');
          setLoading(false);
        });

        return () => {
          console.log('🧹 Cleanup userWeb listener');
          unsubscribe();
        };

      } catch (error) {
        console.error('❌ Erro no carregamento inicial:', error);
        setError('Erro ao carregar dados');
        setLoading(false);
      }
    };

    loadUserData();
  }, [user?.uid, user?.email]);

  // Funções de atualização - usam o actualDatabaseUid
  const updateUserData = async (updates: Partial<UserWebData>): Promise<boolean> => {
    const uidToUse = actualDatabaseUid || user?.uid;
    
    if (!uidToUse) {
      console.error('❌ Nenhum UID disponível para atualização');
      return false;
    }

    try {
      const userWebRef = ref(dbFB, `userWeb/user/${uidToUse}`);
      await update(userWebRef, updates);
      console.log('✅ Dados do usuário atualizados:', updates);
      return true;
    } catch (error) {
      console.error('❌ Erro ao atualizar dados do usuário:', error);
      setError('Erro ao atualizar dados');
      return false;
    }
  };

  const updateEspDevice = async (espId: string, updates: Partial<EspDevice>): Promise<boolean> => {
    const uidToUse = actualDatabaseUid || user?.uid;
    
    if (!uidToUse) return false;

    try {
      const espRef = ref(dbFB, `userWeb/user/${uidToUse}/devices/Esp/${espId}`);
      await update(espRef, updates);
      console.log('✅ Dispositivo ESP atualizado:', espId, updates);
      return true;
    } catch (error) {
      console.error('❌ Erro ao atualizar dispositivo ESP:', error);
      setError('Erro ao atualizar dispositivo');
      return false;
    }
  };

  const updateSensorStatus = async (sensorStatus: boolean): Promise<boolean> => {
    const uidToUse = actualDatabaseUid || user?.uid;
    
    if (!uidToUse) return false;

    try {
      const sensorRef = ref(dbFB, `userWeb/user/${uidToUse}/devices/sensor`);
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
    actualDatabaseUid,
    updateUserData,
    updateEspDevice,
    updateSensorStatus,
    refresh: () => setLoading(true)
  };
};