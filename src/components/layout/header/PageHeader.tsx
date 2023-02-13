import React from 'react';
import { Dropdown, Layout, MenuProps } from 'antd';
import styles from './index.module.scss';
import { DownOutlined, GlobalOutlined } from '@ant-design/icons';
import { colors } from '@/styles/colors';
import ChangeLangBtn from '@/components/change-lang-btn/ChangeLangBtn';
import AvatarBtn from '@/components/layout/header/component/avatar-btn/AvatarBtn';

const { Header } = Layout;

function PageHeader() {
  return (
    <Header
      style={{ padding: 0, background: 'white', height: 55, display: 'flex', alignItems: 'center', paddingRight: 30 }}>
      <div className={styles.logo}>
        <span style={{ marginLeft: 2 }}>管理后台</span>
      </div>
      <AvatarBtn />
      <ChangeLangBtn />
    </Header>
  );
}

export default PageHeader;
