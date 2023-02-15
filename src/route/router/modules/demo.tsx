import { lazy } from 'react';
import { Route } from '@/route/router';
const PageLayout = lazy(() => import('@/components/Layout/PageLayout'));
const ProTableDemo = lazy(() => import('@/pages/demo/ProTableDemo'));
export const DemoRoute: Route = {
  path: '/demo',
  meta: {
    title: '示例',
    needLogin: true,
  },
  component: PageLayout,
  children: [
    {
      path: '/demo/pro-table',
      meta: {
        title: '示例',
        needLogin: true,
      },
      component: ProTableDemo,
    },
  ],
};
