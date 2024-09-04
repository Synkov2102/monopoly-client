import { FC } from "react";
import { Avatar, Flex, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface IPlayerProps {
  name: string;
  id: string;
  money: number;
  color: string;
}

export const Player: FC<IPlayerProps> = ({ name, id, money, color }) => {
  return (
    <Flex align="center" gap={10} style={{ marginBottom: 10 }}>
      <Avatar
        size={64}
        style={{ backgroundColor: color }}
        icon={<UserOutlined />}
      />
      <Flex vertical>
        <Typography.Title level={3} style={{ margin: 0 }}>
          {name}
        </Typography.Title>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {money} $
        </Typography.Title>
        <Typography.Text>{id}</Typography.Text>
      </Flex>
    </Flex>
  );
};
