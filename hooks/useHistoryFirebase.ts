// hooks/useHistoryFirebase.ts - VERSÃO OTIMIZADA
import { useState, useEffect, useRef, useCallback } from 'react';
import { ref, onValue, query, orderByChild, limitToLast, remove } from 'firebase/database';
import { dbFB } from '../config/firebaseConfig';
import { useAuth } from './useAuth';

export interface HistoryItem {
  id: string;
  room: string;
  action: 'aberto' | 'fechado';
  timestamp: Date;
  subtitle: string;
  image: string;
  deviceId: string;
}

export const useHistoryFirebase = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  
  // Use refs para evitar re-renders desnecessários
  const historyRef = useRef<HistoryItem[]>([]);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // ✅ Função otimizada para processar dados
  const processHistoryData = useCallback((historyData: any): HistoryItem[] => {
    const historyArray: HistoryItem[] = [];

    Object.entries(historyData).forEach(([id, data]: [string, any]) => {
      let timestamp;
      if (data.timestamp && typeof data.timestamp === 'number') {
        timestamp = new Date(data.timestamp);
      } else {
        timestamp = new Date();
      }

      historyArray.push({
        id,
        room: data.room || 'Dispositivo',
        action: data.action === 'aberto' ? 'aberto' : 'fechado',
        timestamp,
        subtitle: data.subtitle || `ESP ${data.deviceId || 'unknown'}`,
        image: data.image || getDefaultImage(data.room),
        deviceId: data.deviceId || 'unknown'
      });
    });

    // Ordena do mais recente para o mais antigo
    return historyArray.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, []);

  // ✅ Listener otimizado com debounce
  useEffect(() => {
    if (!user?.uid) {
      setHistory([]);
      setLoading(false);
      return;
    }

    // Limpa listener anterior
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    console.log('📖 Iniciando listener do histórico para UID:', user.uid);
    setLoading(true);

    const historyRefPath = ref(dbFB, `userWeb/user/${user.uid}/history`);
    
    const historyQuery = query(
      historyRefPath,
      orderByChild('timestamp'),
      limitToLast(50)
    );

    let updateTimeout: NodeJS.Timeout;
    
    unsubscribeRef.current = onValue(historyQuery, (snapshot) => {
      // ✅ Debounce para evitar updates muito rápidos
      clearTimeout(updateTimeout);
      
      updateTimeout = setTimeout(() => {
        try {
          if (snapshot.exists()) {
            const historyData = snapshot.val();
            const newHistory = processHistoryData(historyData);
            
            // ✅ Só atualiza o estado se os dados realmente mudaram
            if (JSON.stringify(historyRef.current) !== JSON.stringify(newHistory)) {
              historyRef.current = newHistory;
              setHistory(newHistory);
              console.log('✅ Histórico atualizado:', newHistory.length, 'itens');
            }
          } else {
            if (historyRef.current.length > 0) {
              historyRef.current = [];
              setHistory([]);
            }
          }
        } catch (error) {
          console.error('❌ Erro ao processar histórico:', error);
        } finally {
          setLoading(false);
        }
      }, 100); // 100ms de debounce
    }, (error) => {
      console.error('❌ Erro no listener do histórico:', error);
      setLoading(false);
    });

    return () => {
      console.log('🧹 Cleanup history listener');
      clearTimeout(updateTimeout);
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [user?.uid, processHistoryData]);

  // ✅ Função para limpar histórico (otimizada)
  const clearHistory = useCallback(async (): Promise<boolean> => {
    if (!user?.uid) {
      console.log('❌ clearHistory: User UID não encontrado');
      return false;
    }

    try {
      console.log('🗑️ Iniciando limpeza do histórico...');
      setClearing(true);

      const historyRefPath = ref(dbFB, `userWeb/user/${user.uid}/history`);
      
      // Remove todos os itens do histórico
      await remove(historyRefPath);
      
      console.log('✅ Histórico limpo com sucesso!');
      return true;
    } catch (error) {
      console.error('❌ Erro ao limpar histórico:', error);
      return false;
    } finally {
      setClearing(false);
    }
  }, [user?.uid]);

  return { 
    history, 
    loading, 
    clearing,
    clearHistory
  };
};

// Função auxiliar permanece igual
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