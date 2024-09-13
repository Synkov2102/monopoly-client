import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import io, { Socket } from 'socket.io-client';

// URL вашего Socket.IO сервера
const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL;

// Определяем типы для контекста
interface MonopolyContextType {
  socket: Socket | null;
}

// Создаем контекст с дефолтным значением
const MonopolyContext = createContext<MonopolyContextType | undefined>(
  undefined,
);

interface MonopolyProviderProps {
  children: ReactNode;
}

export const MonopolyProvider: React.FC<MonopolyProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(SOCKET_SERVER_URL);
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <MonopolyContext.Provider value={{ socket }}>
      {children}
    </MonopolyContext.Provider>
  );
};

// Хук для использования сокета
export const useMonopolySocket = (): Socket | null => {
  const context = useContext(MonopolyContext);
  if (!context) {
    throw new Error('useMonopolySocket must be used within a MonopolyProvider');
  }

  return context.socket;
};
