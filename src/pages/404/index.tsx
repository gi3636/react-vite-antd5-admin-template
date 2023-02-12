import React from 'react';
import styles from './index.module.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.title}>找不到此页面</div>
        <Button
          type={'primary'}
          className={styles.returnBtn}
          onClick={() => {
            navigate('/');
          }}>
          返回首页
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
