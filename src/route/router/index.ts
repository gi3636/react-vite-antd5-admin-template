import { lazy } from 'react';
import { HomeRoute } from '@/route/router/modules/home';
import { DemoRoute } from '@/route/router/modules/demo';
const Login = lazy(() => import('@/pages/login'));
const NotFound = lazy(() => import('@/pages/404'));

export default [
  HomeRoute,
  DemoRoute,
  {
    path: '/login',
    meta: {
      title: '登录',
    },
    component: Login,
  },
  {
    path: '*',
    meta: {
      title: '404',
    },
    component: NotFound,
  },
];
