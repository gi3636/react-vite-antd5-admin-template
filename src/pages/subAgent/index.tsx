import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import SubAgentList from '@/pages/subAgent/module/subAgentList';
import SubWithdrawManage from '@/pages/subAgent/module/subWithdrawManage';
function SubAgent(props) {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `下级代理列表`,
      children: <SubAgentList />,
    },
    {
      key: '2',
      label: `下级代理提款`,
      children: <SubWithdrawManage />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey='1' items={items} />
    </div>
  );
}

export default SubAgent;
