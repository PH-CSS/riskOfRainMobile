import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface HistoryItem {
  id: string;
  room: string;
  action: 'aberto' | 'fechado';
  timestamp: Date;
  subtitle: string;
  image: string;
}

interface HistoryContextData {
  history: HistoryItem[];
  addHistoryItem: (room: string, action: 'aberto' | 'fechado', subtitle: string, image: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextData>({} as HistoryContextData);

interface HistoryProviderProps {
  children: ReactNode;
}

export const HistoryProvider: React.FC<HistoryProviderProps> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addHistoryItem = (room: string, action: 'abertoo' | 'fechado', subtitle: string, image: string) => {
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      room,
      action,
      timestamp: new Date(),
      subtitle,
      image,
    };

    setHistory(prev => [newItem, ...prev].slice(0, 50));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addHistoryItem, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};

// Exportação padrão para o Provider
export default HistoryProvider;