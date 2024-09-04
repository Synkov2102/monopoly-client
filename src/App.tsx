import { useEffect, useState } from 'react'
import './App.css'
import { useChatSocket } from './features/socket/socketContext';
import { useNavigate } from 'react-router-dom';

function App() {
  const [connectedGame, setConnectedGame] = useState('');
  const [games, setGames] = useState<Record<string, any>[]>([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || "");

  const socket = useChatSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return
    socket?.on('connect', () => {
      console.log(`Connected`);
    });

    socket?.on('games', (payload) => {
      setGames(payload)
    });

    socket?.on('joinedGame', (room) => {
      setConnectedGame(room)
      console.log(`Joined room: ${room}`);
    });

    socket?.on('startGame', (game) => {
      navigate(`/game/${game}`);
      console.log(`Go to game: ${game}`);
    });

    socket?.on('leftRoom', (room) => {
      setConnectedGame("")
      console.log(`Left room: ${room}`);
    });

    return () => {
      socket?.off('connect');
      socket?.off('joinedGame');
      socket?.off('startGame');
      socket?.off('leftRoom');
      socket?.off('games');
    };

  }, [socket]);

  const createGame = () => {
    socket?.emit('createGame');
  };

  const joinGame = (gameId: string) => () => {
    if (gameId && gameId !== "") {
      socket?.emit('joinGame', { userId, gameId });
    }
  };

  const startGame = () => {
    if (connectedGame) {
      socket?.emit('startGame', { userId, gameId: connectedGame }, (response: string[]) => {
        console.log(response)
      });
    }
  };

  return (
    <div>
      <h2>My userId: {userId}</h2>
      <input
        type="text"
        value={userId}
        onChange={(e) => { setUserId(e.target.value); localStorage.setItem('userId', e.target.value); }}
      />
      <div>
        <strong>Игры:</strong>
        {games.map(e => <div key={e._id}>{e._id} {e.players.length}/4<button onClick={joinGame(e._id)}>join</button></div>)}
      </div>
      <button onClick={createGame}>Create Game</button>
      <div>
        <strong>Подключенная игра: </strong>
        {connectedGame}
      </div>
      <button onClick={startGame}>Старт игры</button>
    </div>
  );
}

export default App
