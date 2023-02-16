import React, { useEffect } from 'react';
import { Layout } from 'antd';
import styles from './index.module.scss';
import ChangeLangBtn from '@/components/ChangeLangBtn/ChangeLangBtn';
import AvatarBtn from '@/components/Layout/header/component/avatar-btn/AvatarBtn';
import { globalConfig } from '@/globalConfig';
import logo from '@/assets/images/logo.svg';
import ReloadBtn from '@/components/ReloadBtn/ReloadBtn';
import { updateUser } from '@/store/user/slice';

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
        <ReloadBtn />
        <ChangeLangBtn />
        <AvatarBtn />
      </div>
    </Header>
  );
}

export default PageHeader;
