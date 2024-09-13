export interface IGame {
  _id: string;
  fields: IFieldData[];
  players: IPlayer[];
  currentMove: string;
  action: string;
  creator: string;
  status: 'preparation' | 'inProgress' | 'ended';
}

export interface IFieldData {
  position: number;
  monopolyId: number;
  monopolied: boolean;
  level: number;
  ownerId: string;
  mortage: boolean;
}

export interface IFieldRules {
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

export interface IPlayer {
  _id: string;
  color: string;
  currentPosition: number;
  money: number;
}

export interface IFullField extends IFieldData, IFieldRules {
  color: string;
}

export interface TSampleField
  extends Record<
    string,
    string | boolean | number | null | number[] | undefined
  > {}
