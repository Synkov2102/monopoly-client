import classNames from 'classnames';
import styles from './Company.module.css';
import { CSSProperties, FC, useState } from 'react';
import { monopolyColors } from '../../../../constants/colors';
import { Typography } from 'antd';
import { IFullField } from '@/types/api/gameTypes';
import { CompanyModal } from './CompanyModal/CompanyModal';

const getLineStyles = (lineName: string, fieldSize: number) => {
  const companyNarrow = fieldSize / 13;
  const companyWide = companyNarrow * 2;
  if (lineName === 'top' || lineName === 'bottom') {
    return {
      width: companyNarrow,
      height: companyWide,
    };
  } else {
    return {
      width: companyWide,
      height: companyNarrow,
    };
  }
};

const getTitleLineStyles = (
  lineName: string,
): { writingMode: 'vertical-rl' | 'horizontal-tb' } => {
  if (lineName === 'top' || lineName === 'bottom') {
    return { writingMode: 'vertical-rl' };
  } else {
    return { writingMode: 'horizontal-tb' };
  }
};

const getCompanyCoordinates = (
  index: number,
  lineName: string,
  fieldSize: number,
) => {
  const cornerSize = (fieldSize / 13) * 2;
  const fieldGap = index * (fieldSize / 13) + cornerSize;
  switch (lineName) {
    case 'top':
      return { top: 0, left: fieldGap };
    case 'right':
      return { right: 0, top: fieldGap };
    case 'bottom':
      return { bottom: 0, right: fieldGap };
    case 'left':
      return { left: 0, bottom: fieldGap };
  }
};

interface ICompanyProps {
  index: number;
  fieldSize: number;
  line: string;
  fieldData: IFullField;
}

export const Company: FC<ICompanyProps> = ({
  index,
  fieldSize,
  line,
  fieldData,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const getFieldStyle = (
    index: number,
    lineName: string,
    fieldSize: number,
  ): CSSProperties => ({
    ...getLineStyles(lineName, fieldSize),
    ...getCompanyCoordinates(index, lineName, fieldSize),
    ...(fieldData.color && { backgroundColor: fieldData.color }),
    ...(fieldData.monopolied && {
      outline: `5px solid ${monopolyColors[fieldData.monopolyId]}`,
      outlineOffset: '-6px',
    }),
  });

  return (
    <>
      <div
        className={classNames(styles.company, styles[line])}
        style={{
          ...getFieldStyle(index, line, fieldSize),
          ...(fieldData.type === 'chance' && { backgroundColor: '#EB9605' }),
        }}
        onClick={() => setIsOpen(true)}
      >
        <Typography.Text
          strong
          className={styles.title}
          style={getTitleLineStyles(line)}
        >
          {fieldData.name}
        </Typography.Text>
        {fieldData.printedPrice && (
          <Typography.Text
            className={classNames(
              styles.price,
              ...(fieldData.type === 'railroad' ? [styles.railroad] : []),
            )}
            style={{ backgroundColor: monopolyColors[fieldData.monopolyId] }}
          >
            {fieldData.renderedValue}
          </Typography.Text>
        )}
      </div>
      <CompanyModal
        isOpen={isOpen && !!fieldData.name}
        onClose={handleCancel}
        fieldData={fieldData}
      />
    </>
  );
};
