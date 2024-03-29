import { lazy } from 'react';
import { Route } from '@/route/router';
const SubAgent = lazy(() => import('@/pages/subAgent/index'));
export const SubAgentRoute: Route = {
  path: '/subAgent',
  meta: {
    title: '下级代理',
    needLogin: true,
  },
  component: SubAgent,
};
