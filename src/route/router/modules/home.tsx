import { lazy } from 'react';
import { t } from 'i18next';
import { Route } from '@/route/router';
const PageLayout = lazy(() => import('@/components/Layout/PageLayout'));
const Home = lazy(() => import('@/pages/home'));
export const HomeRoute: Route = {
  path: '/',
  meta: {
    title: t('menu.home'),
    needLogin: true,
  },
  component: PageLayout,
  children: [
    {
      path: '/',
      meta: {
        title: '首页',
        needLogin: true,
      },
      component: Home,
    },
  ],
};
