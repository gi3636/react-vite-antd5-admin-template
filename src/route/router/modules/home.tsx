import PageLayout from '@/components/layout/PageLayout';
import { lazy } from 'react';
const Home = lazy(() => import('@/pages/home'));
export const HomeRoute = {
  path: '/',
  meta: {
    title: '首页',
    isLogin: true,
  },
  component: PageLayout,
  children: [
    {
      path: '/',
      meta: {
        title: 'test',
        isLogin: true,
      },
      component: Home,
    },
  ],
};
