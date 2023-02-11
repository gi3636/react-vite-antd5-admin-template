import PageLayout from '@/components/layout/PageLayout';
import { lazy } from 'react';
const ProTableDemo = lazy(() => import('@/pages/demo/pro-table-demo'));
export const DemoRoute = {
  path: '/demo',
  meta: {
    title: '示例',
    isLogin: true,
  },
  component: PageLayout,
  children: [
    {
      path: '/demo/pro-table',
      meta: {
        title: 'test',
        isLogin: true,
      },
      component: ProTableDemo,
    },
  ],
};
