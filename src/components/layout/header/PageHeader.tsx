import React from 'react';
import { Layout } from 'antd';
import styles from './index.module.scss';
import { DownOutlined, GlobalOutlined } from '@ant-design/icons';
import { colors } from '@/styles/colors';

const { Header } = Layout;

function PageHeader() {
  return (
    <Header
      style={{ padding: 0, background: 'white', height: 55, display: 'flex', alignItems: 'center', paddingRight: 30 }}>
      <div className={styles.logo}>
        <span style={{ marginLeft: 2 }}>管理后台</span>
      </div>
      <div className={styles.avatarBox}>
        <img
          className={styles.avatar}
          src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
          alt='avatar'
        />
        <div className={styles.name}>vg</div>
        <DownOutlined style={{ marginLeft: 7, fontSize: 12 }} />
      </div>

      <div>
        <GlobalOutlined className={styles.langBtn} style={{ fontSize: 20 }} />
      </div>
    </Header>
  );
}

export default PageHeader;
