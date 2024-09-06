import { FC } from "react";
import { IGame, IPlayer } from "@/types/api/gameTypes";
import { Avatar, Button, Divider, theme, Typography } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  RocketOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./Game.module.css";
import { useMonopolySocket } from "@/features/socket/socketContext";

interface IGameProps {
  game: IGame;
}

const playersLimit = 4;

const Game: FC<IGameProps> = ({ game }) => {
  const {
    token: { colorBorder, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      className={styles.game}
      style={{
        borderRadius: borderRadiusLG,
        border: `1px solid ${colorBorder}`,
      }}
    >
      <Typography.Title level={4} className={styles.title}>
        ID: {game._id}
      </Typography.Title>
      <Divider className={styles.divider} />
      <Players players={game.players} gameId={game._id} />

      <Buttons gameId={game._id} creator={game.creator} />
    </div>
  );
};

export default Game;

interface IButtonProps {
  gameId: string;
  creator: string;
}

const Buttons: FC<IButtonProps> = ({ gameId, creator }) => {
  const socket = useMonopolySocket();

  const isCreator = creator === localStorage.getItem("userId");

  const startGame = () => {
    socket?.emit("startGame", {
      userId: localStorage.getItem("userId"),
      gameId,
    });
  };

  const deleteGame = () => {
    socket?.emit("deleteGame", {
      userId: localStorage.getItem("userId"),
      gameId,
    });
  };

  return (
    isCreator && (
      <>
        <Divider className={styles.divider} />
        <div className={styles.buttonsLine}>
          <Button icon={<RocketOutlined />} onClick={startGame} type="primary">
            Старт
          </Button>
          <Button icon={<DeleteOutlined />} onClick={deleteGame} danger>
            Удалить
          </Button>
        </div>
      </>
    )
  );
};

interface IPlayersProps {
  players: IPlayer[];
  gameId: string;
}

const Players: FC<IPlayersProps> = ({ players, gameId }) => {
  const socket = useMonopolySocket();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const userId = localStorage.getItem("userId");

  const isCreator = (player: IPlayer) => player._id === userId;

  const joinGame = () => {
    socket?.emit("joinGame", { userId, gameId });
  };

  return (
    <div className={styles.playersLine}>
      {players.map((player) => (
        <Avatar
          className={styles.avatar}
          style={
            isCreator(player) ? { backgroundColor: colorPrimary } : undefined
          }
          icon={<UserOutlined />}
          key={player._id}
        />
      ))}
      {Array.from({ length: playersLimit - players.length }, (_, index) => (
        <Button
          className={styles.joinButton}
          shape="circle"
          key={"join" + index}
          onClick={joinGame}
        >
          <PlusOutlined />
        </Button>
      ))}
    </div>
  );
};
