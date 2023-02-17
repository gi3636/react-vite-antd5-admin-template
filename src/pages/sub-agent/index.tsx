import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import SubAgentList from '@/pages/sub-agent/module/sub-agent-list';
import SubWithdrawManage from '@/pages/sub-agent/module/sub-withdraw-manage';
function SubAgent(props) {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `下级代理列表`,
      children: <SubAgentList />,
    },
    {
      key: '2',
      label: `下级提款管理`,
      children: <SubWithdrawManage />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
    </div>
  );
}

export default SubAgent;
