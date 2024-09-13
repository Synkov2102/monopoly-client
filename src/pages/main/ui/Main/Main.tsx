import { useEffect, useState } from 'react';
import { useMonopolySocket } from '../../../../features/socket/socketContext';
import { useNavigate } from 'react-router-dom';

import PageLayout from '../PageLayout/PageLayout';
import GamesList from '../GamesList/GamesList';
import { IGame } from '@/types/api/gameTypes';
import { Typography } from 'antd';

function App() {
  const [games, setGames] = useState<IGame[]>([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

  const socket = useMonopolySocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;
    socket?.on('connect', () => {
      console.log(`Connected`);
    });

    socket?.on('games', (payload) => {
      setGames(payload);
    });

    socket?.on('startGame', (game) => {
      navigate(`/game/${game}`);
      console.log(`Go to game: ${game}`);
    });

    return () => {
      socket?.off('connect');
      socket?.off('startGame');
      socket?.off('games');
    };
  }, [socket]);

  useEffect(() => {
    const generateRandomObjectId = () => {
      return [...Array(24)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');
    };

    if (!localStorage.getItem('userId')) {
      const id = generateRandomObjectId();
      setUserId(id);
      localStorage.setItem('userId', id);
    }
  }, []); // Костыль пока нет регистрации

  return (
    <PageLayout>
      <Typography.Text>My userId: {userId}</Typography.Text>
      <GamesList games={games} />
    </PageLayout>
  );
}

export default App;
