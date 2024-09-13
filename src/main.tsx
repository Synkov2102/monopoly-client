import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/main/ui/Main/Main.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from './pages/game/ui/Game.tsx';
import { MonopolyProvider } from './features/socket/socketContext.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/game/:gameId',
    element: <Game />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MonopolyProvider>
      <RouterProvider router={router} />
    </MonopolyProvider>
  </React.StrictMode>,
);
