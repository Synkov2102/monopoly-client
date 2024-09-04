import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';

// URL вашего Socket.IO сервера
const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL;

// Определяем типы для контекста
interface ChatContextType {
    socket: Socket | null;
}

// Создаем контекст с дефолтным значением
const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
    children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketIo = io(SOCKET_SERVER_URL);
        setSocket(socketIo);

        return () => {
            socketIo.disconnect();
        };
    }, []);

    return (
        <ChatContext.Provider value={{ socket }
        }>
            {children}
        </ChatContext.Provider>
    );
};

// Хук для использования сокета
export const useChatSocket = (): Socket | null => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatSocket must be used within a ChatProvider');
    }

    return context.socket;
};