import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMonopolySocket } from "../../../features/socket/socketContext";
import { GameField } from "./GameField/GameField";
import { Action } from "./Action/Action";
import { Flex, Layout, Typography } from "antd";
import { Player } from "./Player/Player";

export interface IPlayer {
  _id: string;
  color: string;
  currentPosition: number;
  money: number;
}

interface IGameData {
  fields: IFieldChanges[];
  players: IPlayer[];
  currentMove: string;
  action: string;
}

export interface IFieldChanges {
  position: number;
  monopolied: boolean;
  level: number;
  ownerId: string | null;
  mortage: boolean;
}

export interface IFieldsData {
  name: string;
  printedPrice: number;
  mortagePrice: number;
  buildingCosts: number;
  rent: number;
  monopolyRent: number;
  upgradeRent: [number, number, number, number, number];
  position: number;
  monopolyId: number;
}

const userId = localStorage.getItem("userId");

function Game() {
  let { gameId } = useParams();
  const [gameData, setGameData] = useState<IGameData | undefined>();
  const [fieldsData, setFieldsData] = useState<IFieldsData[] | undefined>();

  const socket = useMonopolySocket();

  const myMove = gameData?.currentMove === userId;
  const myPosition = gameData?.players.find(
    (player) => player._id === userId
  )?.currentPosition;

  useEffect(() => {
    if (!socket) return;

    getGameData();
    getFieldsData();
    checkRoomConnect();

    socket.on("changeGameData", (data) => {
      console.log(data);
      setGameData(data);
    });

    return () => {
      socket?.off("changeGameData");
    };
  }, [socket]);

  const handleGameDataUpdate = (gameData: IGameData) => {
    setGameData(gameData);
  };

  const checkRoomConnect = () => {
    if (!gameId) return;
    socket?.emit("subscribeGame", { gameId });
  };

  const getGameData = () => {
    if (!gameId) return;
    socket?.emit("getGameData", { userId, gameId }, handleGameDataUpdate);
  };

  const getFieldsData = () => {
    if (!gameId) return;
    socket?.emit("getFieldsData", { gameId }, (fields: IFieldsData[]) => {
      setFieldsData(fields);
    });
  };

  const handleSkip = () => {
    if (!gameId) return;
    socket?.emit("skipMove", { userId, gameId });
  };

  const handleAction = (position: number, action: string) => {
    if (!gameId) return;
    socket?.emit(action, { userId, gameId, position }, handleGameDataUpdate);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <GameField
        players={gameData?.players}
        fieldsChanges={gameData?.fields}
        fieldsData={fieldsData}
      >
        <>
          <Flex vertical style={{ width: "fit-content", margin: "0 auto" }}>
            <Typography.Title style={{ marginBottom: 0 }} level={3}>
              My userId: {userId}
            </Typography.Title>
            <Typography.Title style={{ marginTop: 0 }} level={3}>
              GameId: {gameId}
            </Typography.Title>
            {gameData?.players.map((player, index) => (
              <Player
                name={`Игрок ${index + 1}`}
                id={player._id}
                money={player.money}
                color={player.color}
              />
            ))}
          </Flex>
          {myMove && gameData?.action && typeof myPosition === "number" && (
            <Action
              buttonText={gameData?.action}
              onClick={() => handleAction(myPosition, gameData?.action)}
              onSkip={() => handleSkip()}
            />
          )}
        </>
      </GameField>
    </Layout>
  );
}

export default Game;
