import React from 'react';
import { DownOutlined, PoweroffOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { colors } from '@/styles/colors';
import { Dropdown, MenuProps } from 'antd';

function AvatarBtn(props) {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div>
          <PoweroffOutlined />
          <span style={{ marginLeft: 5 }}>退出登录</span>
        </div>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }} placement='bottomRight' arrow>
      <div className={styles.avatarBox}>
        <img
          className={styles.avatar}
          src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
          alt='avatar'
        />
        <div className={styles.name}>vg</div>
        <DownOutlined style={{ marginLeft: 7, fontSize: 12, color: colors.iconDefaultColor }} />
      </div>
    </Dropdown>
  );
}

export default AvatarBtn;
