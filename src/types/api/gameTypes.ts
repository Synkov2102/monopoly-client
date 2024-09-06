export interface IGame {
  _id: string;
  fields: IField[];
  players: IPlayer[];
  currentMove: string;
  action: string;
  creator: string;
  status: "preparation" | "inProgress" | "ended";
}

interface IField {
  position: number;
  monopolyId: number;
  monopolied: boolean;
  level: number;
  ownerId: string;
  mortage: boolean;
}

export interface IPlayer {
  _id: string;
  color: string;
  currentPosition: number;
  money: number;
}
