import styles from "./GameField.module.css";
import { FC, ReactElement } from "react";
import { IFieldChanges, IFieldsData, IPlayer } from "../Game";
import { Company } from "../Company/Company";

const cornerPosition = [
  { left: 0, top: 0, borderRadius: "15% 0 0 0" },
  { right: 0, top: 0, borderRadius: "0 15% 0 0" },
  { right: 0, bottom: 0, borderRadius: "0 0 15% 0" },
  { left: 0, bottom: 0, borderRadius: "0 0 0 15%" },
];

let fields: Record<string, any>[] = [
  { name: "Старт/Финиш" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Тюрьма" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Рулетка" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Арест" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
  { name: "Монополия" },
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

  fields = fields.map((field, index) => {
    const fieldData = fieldsData?.find((field) => field.position === index);
    const fieldChanges = fieldsChanges?.find(
      (field) => field.position === index
    );
    return (
      {
        ...fieldData,
        ...fieldChanges,
        color: players?.find((player) => player._id === fieldChanges?.ownerId)
          ?.color,
      } || field
    );
  });

  const cornerSize = (fieldSize / 13) * 2;

  const getPlayerStyle = (color: string, currentPosition: number) => {
    const playerSize = fieldSize / 30;
    let jump = 0;
    let jumpDirection = "left";
    let gapDirection = "top";

    if (currentPosition > 30) {
      jump = currentPosition - 30;
      jumpDirection = "bottom";
      gapDirection = "left";
    } else if (currentPosition > 20) {
      jump = currentPosition - 20;
      jumpDirection = "right";
      gapDirection = "bottom";
    } else if (currentPosition > 10) {
      jump = currentPosition - 10;
      jumpDirection = "top";
      gapDirection = "right";
    } else if (currentPosition > 0) {
      jump = currentPosition;
    }

    return {
      width: playerSize,
      height: playerSize,
      backgroundColor: color,
      [jumpDirection]:
        jump * (fieldSize / 13) +
        fieldSize / 13 +
        fieldSize / 13 / 2 -
        playerSize / 2,
      [gapDirection]: fieldSize / 13 - playerSize / 2,
    };
  };

  const getCornerStyle = (index: number) => ({
    width: cornerSize,
    height: cornerSize,
    ...cornerPosition[index],
  });

  const cornerFields = fields.filter(
    (_, i) => i === 0 || i === 10 || i === 20 || i === 30
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
      {players?.map((e) => (
        <div
          key={e._id}
          className={styles.player}
          style={getPlayerStyle(e.color, e.currentPosition)}
        />
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
