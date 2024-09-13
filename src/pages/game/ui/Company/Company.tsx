import classNames from 'classnames';
import styles from './Company.module.css';
import { CSSProperties, FC, useState } from 'react';
import { monopolyColors } from '../../../../constants/colors';
import { Flex, Modal, Typography } from 'antd';
import { IFullField, TSampleField } from '@/types/api/gameTypes';

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

  let price = fieldData.printedPrice;

  if (fieldData.ownerId) {
    price = fieldData.rent;

    if (fieldData.monopolied) {
      price = fieldData.monopolyRent;

      if (fieldData.level) {
        price = fieldData.upgradeRent[fieldData.level - 1];
      }
    }
  }

  return (
    <>
      <div
        className={classNames(styles.company, styles[line])}
        style={{
          ...getFieldStyle(index, line, fieldSize),
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
            className={styles.price}
            style={{ backgroundColor: monopolyColors[fieldData.monopolyId] }}
          >
            {price} 000 $
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

interface ICompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  fieldData: IFullField;
}

const CompanyModal: FC<ICompanyModalProps> = ({
  isOpen,
  onClose,
  fieldData,
}) => {
  const rentItems = [
    {
      key: '1',
      label: 'В одиночку',
      children: fieldData.rent + '$',
    },
    {
      key: '2',
      label: 'В монополии',
      children: fieldData.monopolyRent + ' $',
    },
    {
      key: '3',
      label: '1 Дом',
      children: fieldData?.upgradeRent?.[0] + ' $',
    },
    {
      key: '4',
      label: '2 Дома',
      children: fieldData?.upgradeRent?.[1] + ' $',
    },
    {
      key: '5',
      label: '3 Дома',
      children: fieldData?.upgradeRent?.[2] + ' $',
    },
    {
      key: '6',
      label: '4 Дома',
      children: fieldData?.upgradeRent?.[3] + ' $',
    },
    {
      key: '7',
      label: 'Отель',
      children: fieldData?.upgradeRent?.[4] + ' $',
    },
  ];

  const featuresItems = [
    {
      key: '1',
      label: 'При покупке',
      children: fieldData.printedPrice + '$',
    },
    {
      key: '2',
      label: 'При залоге',
      children: fieldData.mortagePrice + ' $',
    },
    {
      key: '3',
      label: 'Улучшение',
      children: fieldData.buildingCosts + ' $',
    },
  ];

  return (
    <Modal
      open={isOpen}
      width="fit-content"
      centered
      title={
        <Typography.Title
          style={{ margin: 0, color: monopolyColors[fieldData.monopolyId] }}
          level={2}
        >
          {fieldData.name}
        </Typography.Title>
      }
      onCancel={onClose}
      footer={() => <></>}
    >
      <Flex gap={30} style={{ marginTop: 24 }}>
        <Flex vertical>
          <Typography.Title
            level={3}
            style={{
              marginTop: 0,
            }}
          >
            Размер Аренды
          </Typography.Title>
          {rentItems.map((item) => (
            <ListItem key={item.key} title={item.label} value={item.children} />
          ))}
        </Flex>
        <Flex vertical>
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            Стоимость
          </Typography.Title>
          {featuresItems.map((item) => (
            <ListItem key={item.key} title={item.label} value={item.children} />
          ))}
        </Flex>
      </Flex>
    </Modal>
  );
};

interface IListItemProps {
  title: string;
  value: string;
}

const ListItem: FC<IListItemProps> = ({ title, value }) => (
  <Typography.Text className={styles.description}>
    <Typography.Text
      className={styles.description}
      strong
    >{`${title}: `}</Typography.Text>
    {value}
  </Typography.Text>
);
