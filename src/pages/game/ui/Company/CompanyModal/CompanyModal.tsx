import styles from './CompanyModal.module.css';
import { FC } from 'react';
import { monopolyColors } from '../../../../../constants/colors';
import { Flex, Modal, Typography } from 'antd';
import { IFullField } from '@/types/api/gameTypes';

interface ICompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  fieldData: IFullField;
}

export const CompanyModal: FC<ICompanyModalProps> = ({
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
      <Flex className={styles.container}>
        {fieldData.type === 'company' && (
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
                <ListItem
                  key={item.key}
                  title={item.label}
                  value={item.children}
                />
              ))}
            </Flex>
            <Flex vertical>
              <Typography.Title level={3} style={{ marginTop: 0 }}>
                Стоимость
              </Typography.Title>
              {featuresItems.map((item) => (
                <ListItem
                  key={item.key}
                  title={item.label}
                  value={item.children}
                />
              ))}
            </Flex>
          </Flex>
        )}
        {fieldData.type === 'chance' && (
          <Typography.Text>
            Шанс - это 1 из 2 типов мест для вытягивания карт в
            Монополия.Online. Карта шанса с большей вероятностью переместит
            игроков, часто со смертельным исходом.
          </Typography.Text>
        )}
      </Flex>
    </Modal>
  );
};

interface IListItemProps {
  title: string;
  value: string;
}

const ListItem: FC<IListItemProps> = ({ title, value }) => (
  <Typography.Text>
    <Typography.Text
      className={styles.description}
      strong
    >{`${title}: `}</Typography.Text>
    {value}
  </Typography.Text>
);
