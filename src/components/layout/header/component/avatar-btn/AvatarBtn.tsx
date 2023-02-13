import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
function AvatarBtn(props) {
  return (
    <div className={styles.avatarBox}>
      <img
        className={styles.avatar}
        src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
        alt='avatar'
      />
      <div className={styles.name}>vg</div>
      <DownOutlined style={{ marginLeft: 7, fontSize: 12 }} />
    </div>
  );
}

export default AvatarBtn;
