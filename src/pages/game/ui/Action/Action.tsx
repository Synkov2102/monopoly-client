import { FC } from 'react';
import { Button, Flex } from 'antd';

interface IActionModalProps {
  buttonText: string;
  onClick: () => void;
  onSkip: () => void;
}

export const Action: FC<IActionModalProps> = ({
  buttonText,
  onClick,
  onSkip,
}) => {
  return (
    <Flex gap={10}>
      {/* <Button/> */}
      <Button
        onClick={onClick}
        size="large"
        style={{ margin: '20px auto' }}
        type="primary"
      >
        {buttonText}
      </Button>
      {buttonText === 'buyField' && (
        <Button onClick={onSkip} size="large" style={{ margin: '20px auto' }}>
          Пропустить
        </Button>
      )}
    </Flex>
  );
};
