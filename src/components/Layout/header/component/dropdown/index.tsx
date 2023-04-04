import React from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import AgentInformation from '@/components/Layout/header/component/dropdown/module/AgentInformation';
import Reset from '@/components/Layout/header/component/dropdown/module/Reset';
import styles from './index.module.scss';
import WithdrawalRequest from '@/components/Layout/header/component/dropdown/module/WithdrawalRequest';
import WithdrawalMethod from '@/components/Layout/header/component/dropdown/module/WithdrawalMethod';
import { emitter, EmitterType } from '@/utils/app-emitter';

function DropDown() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '代理信息',
      children: <AgentInformation />,
    },
    {
      key: '2',
      label: '重置登录',
      children: <Reset />,
    },
    {
      key: '3',
      label: '钱包余额',
      children: <WithdrawalRequest />,
    },
    {
      key: '4',
      label: '提现方式',
      children: <WithdrawalMethod />,
    },
  ];

  const onChange = (key: string) => {
    if (key === '3') {
      emitter.fire(EmitterType.updateWalletInfo);
    }
    if (key === '1') {
      emitter.fire(EmitterType.updateAgentInfo);
    }
  };

  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
    </div>
  );
}

export default DropDown;
