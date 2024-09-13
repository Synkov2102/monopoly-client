import React, { ReactNode } from 'react';
import { Flex, Layout, theme, Typography } from 'antd';
import styles from './PageLayout.module.css';
import CubeIcon from '../../../../assets/icons/cubic.svg?react';
const { Header, Content, Footer } = Layout;

interface IPageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<IPageLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className={styles.container}>
      <Header className={styles.header}>
        <Flex gap={10}>
          <CubeIcon className={styles.icon} />
          <Typography.Text strong className={styles.logo}>
            Монополия.Online
          </Typography.Text>
        </Flex>
      </Header>
      <Content className={styles.content}>
        <div
          className={styles.card}
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer className={styles.footer}>
        Монополия.Online ©{new Date().getFullYear()} Created by Synkov Eugene
      </Footer>
    </Layout>
  );
};

export default PageLayout;
