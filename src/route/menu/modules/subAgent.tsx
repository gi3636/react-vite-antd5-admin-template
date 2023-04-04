import { MenuItem } from '@/route/menu';
import AgentIcon from '@/components/icon/AgentIcon';
import React from 'react';

export const getSubAgent = (t): MenuItem => {
  return {
    order: 3,
    id: 'subAgent',
    name: '下级代理',
    path: '/subAgent',
    icon: <AgentIcon />,
  };
};
