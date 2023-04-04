import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { emitter, EmitterType } from '@/utils/app-emitter';
function ReloadBtn() {
  const handleReload = () => {
    emitter.fire(EmitterType.forceReload);
  };
  return (
    <div>
      <ReloadOutlined className={styles.reloadBtn} onClick={handleReload} />
    </div>
  );
}

export default ReloadBtn;
