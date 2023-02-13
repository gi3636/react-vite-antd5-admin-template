import React from 'react';
import { Layout } from 'antd';
import styles from './index.module.scss';
import ChangeLangBtn from '@/components/change-lang-btn/ChangeLangBtn';
import AvatarBtn from '@/components/layout/header/component/avatar-btn/AvatarBtn';
import { globalConfig } from '@/globalConfig';
import logo from '@/assets/images/logo.svg';

const { Header } = Layout;

function PageHeader() {
  return (
    <Header
      style={{
        padding: 0,
        background: 'white',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        paddingRight: 30,
        borderBottom: '2px solid #f0f0f0',
      }}>
      <div className={styles.logo}>
        <div className='logo'>
          <img src={logo} alt='logo' width={30} height={30} />
        </div>
        <span style={{ marginLeft: 2 }}>{globalConfig.projectName}</span>
      </div>
      <div className={styles.rightContainer}>
        <ChangeLangBtn />
        <AvatarBtn />
      </div>
    </Header>
  );
}

export default PageHeader;
