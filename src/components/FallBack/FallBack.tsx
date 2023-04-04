import React, { useEffect } from 'react';
import { Button, Spin } from 'antd';
import styles from './index.module.scss';

function FallBack() {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 6000);
  }, []);

  return (
    <div className={styles.container}>
      <Spin size={'large'} delay={1000} tip={'加载中...'} />
      {show ? (
        <Button
          type={'primary'}
          className={styles.reloadBtn}
          onClick={() => {
            window.location.reload();
          }}>
          刷新页面
        </Button>
      ) : null}
    </div>
  );
}

export default FallBack;
