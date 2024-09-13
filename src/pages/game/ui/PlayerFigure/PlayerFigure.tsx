import styles from './PlayerFigure.module.css';
import { FC, useEffect, useRef, useState } from 'react';
import { IPlayer } from '@/types/api/gameTypes';

function buildNumberSeries(start: number, end: number) {
  const series = [];

  // Если конечное число больше или равно начальному, то просто строим прямой ряд
  if (end >= start) {
    for (let i = start + 1; i <= end; i++) {
      series.push(i);
    }
  } else {
    // Иначе сначала идем от стартового числа до 39, затем начинаем с 0 и до конечного
    for (let i = start + 1; i <= 39; i++) {
      series.push(i);
    }
    for (let i = 0; i <= end; i++) {
      series.push(i);
    }
  }

  return series;
}

function findSpecialNumber(numbers: number[]) {
  const cornerNumbers = [0, 10, 20, 30]; // Массив угловых координат
  return numbers.find((num) => cornerNumbers.includes(num)); // Найдем первое совпадение
}

const getPlayerStyle = (
  color: string,
  currentPosition: number,
  fieldSize: number,
) => {
  currentPosition += 1;
  const playerSize = fieldSize / 30;
  const companyNarrow = fieldSize / 13;

  const getForwardCoordinate = (
    jump: number,
    direction: 'forward' | 'backward',
  ) =>
    direction === 'forward'
      ? jump * companyNarrow + companyNarrow / 2 - playerSize / 2
      : fieldSize - (jump * companyNarrow + companyNarrow / 2) - playerSize / 2;

  const coordinates = { x: 0, y: 0 };

  if (currentPosition > 30) {
    coordinates.x = companyNarrow - playerSize / 2;
    coordinates.y = getForwardCoordinate(currentPosition - 30, 'forward');
  } else if (currentPosition > 20) {
    coordinates.x = getForwardCoordinate(currentPosition - 20, 'backward');
    coordinates.y = companyNarrow - playerSize / 2;
  } else if (currentPosition > 10) {
    coordinates.x = fieldSize - companyNarrow - playerSize / 2;
    coordinates.y = getForwardCoordinate(currentPosition - 10, 'backward');
  } else if (currentPosition > 0) {
    coordinates.x = getForwardCoordinate(currentPosition, 'forward');
    coordinates.y = fieldSize - companyNarrow - playerSize / 2;
  }

  return {
    width: playerSize,
    height: playerSize,
    backgroundColor: color,
    bottom: coordinates.y,
    left: coordinates.x,
  };
};

interface IPlayerFigureProps {
  player: IPlayer;
  fieldSize: number;
}

export const PlayerFigure: FC<IPlayerFigureProps> = ({ player, fieldSize }) => {
  const prevPositionRef = useRef<number>(0); // используем useRef для хранения предыдущего значения
  const [currentValue, setCurrentValue] = useState<number>(
    player.currentPosition || 0,
  );

  useEffect(() => {
    prevPositionRef.current = player.currentPosition; // обновляем реф при каждом изменении пропса
  }, [player]);

  const prevPosition = prevPositionRef.current;

  if (prevPosition !== player.currentPosition) {
    setInterval;
  }

  useEffect(() => {
    const updateValue = () => {
      setCurrentValue((prevValue) => {
        const series = buildNumberSeries(prevValue, player.currentPosition);
        return findSpecialNumber(series) ?? player.currentPosition;
      });
    };

    const interval = setInterval(updateValue, 500);

    if (currentValue === player.currentPosition) clearInterval(interval);

    return () => clearInterval(interval); // Очищаем интервал при размонтировании
  }, [prevPosition, player.currentPosition, currentValue]);

  return (
    <div
      className={styles.player}
      style={getPlayerStyle(player.color, currentValue, fieldSize)}
    />
  );
};
