import React from 'react';
import { DownOutlined, PoweroffOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { colors } from '@/styles/colors';
import { Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { configConstant } from '@/constant/configConstant';

function AvatarBtn(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem(configConstant.USER_INFO);
    navigate('/login', { replace: true });
    console.log('退出登录');
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={handleLogout}>
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
