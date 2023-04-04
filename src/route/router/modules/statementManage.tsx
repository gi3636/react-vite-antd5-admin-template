import { lazy } from 'react';
import { Route } from '@/route/router';

const StatementManage = lazy(() => import('@/pages/statementManage/index'));
export const StatementManageRoute: Route = {
  path: '/statementManage',
  meta: {
    title: '报表管理',
    needLogin: true,
  },
  component: StatementManage,
};
