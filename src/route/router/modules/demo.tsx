import PageLayout from '@/components/Layout/PageLayout';
import { lazy } from 'react';
const ProTableDemo = lazy(() => import('@/pages/demo/ProTableDemo'));
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
