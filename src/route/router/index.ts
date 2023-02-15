import { lazy, LazyExoticComponent } from 'react';
import { HomeRoute } from '@/route/router/modules/home';
import { DemoRoute } from '@/route/router/modules/demo';

const Login = lazy(() => import('@/pages/login'));
const NotFound = lazy(() => import('@/pages/404'));
export interface Route {
  path: string;
  meta: {
    title: string;
    needLogin?: boolean;
  };
  component: LazyExoticComponent<any>;
  children?: Route[] | null;
}
export const routes: Route[] = [
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
