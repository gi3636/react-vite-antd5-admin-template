import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';
import { emitter } from '@/utils/app-emitter';
import { useSelector } from '@/store';
import BindWithdrawalModal from '@/components/Layout/modals/BindWithdrawalModal';
import WithdrawalModal from '@/components/Layout/modals/WithdrawalModal';

const modalKey = 'bindWithdrawal';
const withdrawalModalKey = 'headerWithdrawal';

function WithdrawalRequest() {
  const user: any = useSelector((state) => state.user);
  const withdrawalMethodList = user?.withdrawalMethodList || [];

  const handleSubmit = () => {
    if (withdrawalMethodList.length == 0) {
      emitter.fire(`${modalKey}ShowModal`);
    } else {
      emitter.fire(`${withdrawalModalKey}ShowModal`);
    }
  };

  let informationList = [
    {
      title: '钱包余额',
      content: `${user?.money} 元`,
    },
    {
      title: '未结算佣金',
      content: `${user?.settlemen_commission} 元`,
    },
    {
      title: '历史提款',
      content: `${user?.withdraw} 元`,
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
      <Button type='primary' className={styles.submitBtn} onClick={handleSubmit}>
        申请提款
      </Button>
      <BindWithdrawalModal modalKey={modalKey} />
      <WithdrawalModal modalKey={withdrawalModalKey} />
    </div>
  );
}

export default WithdrawalRequest;
