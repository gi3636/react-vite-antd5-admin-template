import { lazy } from 'react';
import { Route } from '@/route/router';
const Home = lazy(() => import('@/pages/home'));

export const HomeRoute: Route = {
  path: '/',
  meta: {
    title: '首页1',
    needLogin: true,
  },
  component: Home,
};
