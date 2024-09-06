import { FC, useState } from "react";
import { IGame } from "@/types/api/gameTypes";
import Game from "../Game/Game";
import { Button, Flex, Typography } from "antd";
import { useMonopolySocket } from "@/features/socket/socketContext";
import styles from "./GamesList.module.css";
import { PlusOutlined } from "@ant-design/icons";

interface IGamesTableProps {
  games: IGame[];
}

const GamesList: FC<IGamesTableProps> = ({ games }) => {
  const socket = useMonopolySocket();

  const createGame = () => {
    socket?.emit("createGame", {
      userId: localStorage.getItem("userId"),
    });
  };

  return (
    <div className={styles.list}>
      <Flex vertical>
        <Typography.Title level={1} className={styles.title}>
          Игры:
        </Typography.Title>
        <Button onClick={createGame} icon={<PlusOutlined />}>
          Новая игра
        </Button>
      </Flex>
      <div className={styles.gamesGrid}>
        {games.map((e) => (
          <Game game={e} key={e._id} />
        ))}
      </div>
    </div>
  );
};

export default GamesList;
