import React, { useEffect } from 'react';
import { DownOutlined, PoweroffOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { colors } from '@/styles/colors';
import { Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { clearAllTabHistory } from '@/store/tab/slice';
import { useDispatch, useSelector } from '@/store';
import { emitter, EmitterType } from '@/utils/app-emitter';
import { userLogout } from '@/store/user/slice';

function AvatarBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(clearAllTabHistory());
    dispatch(userLogout());
    emitter.fire(EmitterType.clearComponentCache);
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    emitter.on(EmitterType.logout, handleLogout);
  }, []);

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
        <div className={styles.name}>{userInfo?.username}</div>
        <DownOutlined style={{ marginLeft: 7, fontSize: 12, color: colors.iconDefaultColor }} />
      </div>
    </Dropdown>
  );
}

export default AvatarBtn;
