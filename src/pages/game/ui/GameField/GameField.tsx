import styles from './GameField.module.css';
import { FC, ReactElement } from 'react';
import { IFieldChanges, IFieldsData, IPlayer } from '../Game';
import { Company } from '../Company/Company';
import { PlayerFigure } from '../PlayerFigure/PlayerFigure';
import { IFullField, TSampleField } from '@/types/api/gameTypes';

const cornerPosition = [
  { left: 0, top: 0, borderRadius: '15% 0 0 0' },
  { right: 0, top: 0, borderRadius: '0 15% 0 0' },
  { right: 0, bottom: 0, borderRadius: '0 0 15% 0' },
  { left: 0, bottom: 0, borderRadius: '0 0 0 15%' },
];

const sampleFields: TSampleField[] = [
  { type: 'sample', name: 'Старт/Финиш' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Тюрьма' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Рулетка' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Арест' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 'Монополия' },
  { type: 'sample', name: 1323 },
];

interface IGameFieldProps {
  children: ReactElement;
  fieldsChanges?: IFieldChanges[];
  fieldsData?: IFieldsData[];
  players?: IPlayer[];
}

export const GameField: FC<IGameFieldProps> = ({
  players,
  fieldsChanges,
  fieldsData,
  children,
}) => {
  const fieldSize = 1200;

  const fields: IFullField[] = sampleFields.map((field, index) => {
    const fieldData = fieldsData?.find((field) => field.position === index);
    const fieldChanges = fieldsChanges?.find(
      (field) => field.position === index,
    );
    return {
      ...fieldData,
      ...fieldChanges,
      color: players?.find((player) => player._id === fieldChanges?.ownerId)
        ?.color,
    };
  });

  const cornerSize = (fieldSize / 13) * 2;

  const getCornerStyle = (index: number) => ({
    width: cornerSize,
    height: cornerSize,
    ...cornerPosition[index],
  });

  const cornerFields = fields.filter(
    (_, i) => i === 0 || i === 10 || i === 20 || i === 30,
  );

  const topLine = fields.filter((_, i) => i > 0 && i < 10);
  const rightLine = fields.filter((_, i) => i > 10 && i < 20);
  const bottomLine = fields.filter((_, i) => i > 20 && i < 30);
  const leftLine = fields.filter((_, i) => i > 30 && i < 40);

  return (
    <div
      className={styles.field}
      style={{ width: fieldSize, height: fieldSize }}
    >
      {players?.map((player: IPlayer) => (
        <PlayerFigure key={player._id} player={player} fieldSize={fieldSize} />
      ))}
      {cornerFields.map((block, i) => (
        <div key={i} className={styles.cornerBlock} style={getCornerStyle(i)}>
          {block.name}
        </div>
      ))}
      {topLine.map((block, i) => (
        <Company index={i} line="top" fieldSize={fieldSize} fieldData={block} />
      ))}
      {rightLine.map((block, i) => (
        <Company
          index={i}
          line="right"
          fieldSize={fieldSize}
          fieldData={block}
        />
      ))}
      {bottomLine.map((block, i) => (
        <Company
          index={i}
          line="bottom"
          fieldSize={fieldSize}
          fieldData={block}
        />
      ))}
      {leftLine.map((block, i) => (
        <Company
          index={i}
          line="left"
          fieldSize={fieldSize}
          fieldData={block}
        />
      ))}
      <div
        className={styles.children}
        style={{
          width: fieldSize - cornerSize * 2,
          height: fieldSize - cornerSize * 2,
          top: cornerSize,
          right: cornerSize,
        }}
      >
        {children}
      </div>
    </div>
  );
};
