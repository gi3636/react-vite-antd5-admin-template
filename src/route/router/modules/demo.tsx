import { lazy } from 'react';
import { Route } from '@/route/router';
const ProTableDemo = lazy(() => import('@/pages/demo/ProTableDemo'));
export const DemoRoute: Route = {
  path: '/demo/pro-table',
  meta: {
    title: '示例',
    needLogin: true,
  },
  component: ProTableDemo,
};
