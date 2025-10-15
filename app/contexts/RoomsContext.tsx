import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface RoomState {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  isEnabled: boolean;
  type: 'quarto' | 'sala' | 'cozinha';
}

interface RoomsContextData {
  rooms: RoomState[];
  toggleRoom: (roomId: string) => void;
  closeAllRooms: () => void;
  openAllRooms: () => void;
  updateRoomState: (roomId: string, isEnabled: boolean) => void;
}

const RoomsContext = createContext<RoomsContextData>({} as RoomsContextData);

export const RoomsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [rooms, setRooms] = useState<RoomState[]>([
    {
      id: '1',
      title: 'Quarto',
      subtitle: 'Perto da cama',
      image: 'https://images.prismic.io/guararapes/955be9d3-b4b4-4337-a51a-90ed60864a06_Areia+e+Sib%C3%A9ria+l+Henrique+Ortis+l+Quarto+l+Foto+Luiz+Franco.png?auto=compress,format',
      isEnabled: false,
      type: 'quarto'
    },
    {
      id: '2',
      title: 'Sala',
      subtitle: 'Perto da TV',
      image: 'https://img.freepik.com/fotos-gratis/sala-de-estar-de-luxo-loft-de-renderizacao-3d-com-estante-perto-de-estante_105762-2224.jpg',
      isEnabled: false,
      type: 'sala'
    },
    {
      id: '3',
      title: 'Cozinha',
      subtitle: 'Perto da pia',
      image: 'https://i.pinimg.com/originals/cf/0f/98/cf0f9839d2aea718156891a0d496b95b.png',
      isEnabled: false,
      type: 'cozinha'
    }
  ]);

  const toggleRoom = (roomId: string) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, isEnabled: !room.isEnabled } : room
    ));
  };

  const closeAllRooms = () => {
    setRooms(prev => prev.map(room => ({ ...room, isEnabled: false })));
  };

  const openAllRooms = () => {
    setRooms(prev => prev.map(room => ({ ...room, isEnabled: true })));
  };

  const updateRoomState = (roomId: string, isEnabled: boolean) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, isEnabled } : room
    ));
  };

  return (
    <RoomsContext.Provider value={{ 
      rooms, 
      toggleRoom, 
      closeAllRooms, 
      openAllRooms, 
      updateRoomState 
    }}>
      {children}
    </RoomsContext.Provider>
  );
};

export const useRooms = () => {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error('useRooms must be used within a RoomsProvider');
  }
  return context;
};

export default RoomsProvider;
