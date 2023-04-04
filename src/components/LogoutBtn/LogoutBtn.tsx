import React from 'react';
import { PoweroffOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@/store';
import { clearAllTabHistory } from '@/store/tab/slice';
import { userLogout } from '@/store/user/slice';
import { emitter, EmitterType } from '@/utils/app-emitter';
import { Modal } from 'antd';
function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => {
    Modal.confirm({
      title: '提示',
      content: '确定要退出登录吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: handleLogout,
    });
  };
  const handleLogout = () => {
    dispatch(clearAllTabHistory());
    dispatch(userLogout());
    emitter.fire(EmitterType.clearComponentCache);
    navigate('/login', { replace: true });
  };
  return (
    <div className={styles.btn} onClick={onClick}>
      <PoweroffOutlined style={{ fontSize: 20 }} />
    </div>
  );
}

export default LogoutBtn;
