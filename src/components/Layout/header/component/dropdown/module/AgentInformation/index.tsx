import React from 'react';
import styles from './index.module.scss';
import { useSelector } from '@/store';
import { Tag } from 'antd';
function AgentInformation(props) {
  const user: any = useSelector((state) => state.user);
  let informationList = [
    {
      title: '代理账号',
      content: user?.username,
    },
    {
      title: '代理模式',
      content: user?.mode === 1 ? <Tag color='green'>CPA</Tag> : <Tag color='red'>CPS</Tag>,
    },
    {
      title: '激活佣金',
      content: `${user?.active_money} 元`,
    },
  ];
  return (
    <div className={styles.informationList}>
      {informationList.map((item, index) => {
        return (
          <div className={styles.item} key={item.title}>
            <div className={styles.title}>{item.title}:</div>
            <div className={styles.content}>{item.content}</div>
          </div>
        );
      })}
    </div>
  );
}

export default AgentInformation;
