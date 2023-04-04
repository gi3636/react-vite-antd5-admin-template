import React from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import UserStatement from '@/pages/statementManage/module/userStatement';
import AgentStatement from '@/pages/statementManage/module/agentStatement';
import { useSelector } from '@/store';

function StatementManage() {
  const user: any = useSelector((state) => state.user);
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '用户报表',
      children: <UserStatement />,
    },
    {
      key: '2',
      label: '代理报表',
      children: <AgentStatement />,
    },
  ];
  return <>{user?.level != 3 ? <Tabs defaultActiveKey='1' items={items} /> : <UserStatement />}</>;
}

export default StatementManage;
