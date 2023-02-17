import { lazy, LazyExoticComponent } from 'react';
import { HomeRoute } from '@/route/router/modules/home';
import { DemoRoute } from '@/route/router/modules/demo';
import { SystemRoute } from '@/route/router/modules/system';
import { SubUserRoute } from '@/route/router/modules/subUser';
import { SubAgentRoute } from '@/route/router/modules/subAgent';
const PageLayout = lazy(() => import('@/components/Layout/PageLayout'));
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
  {
    path: '/',
    meta: {
      title: '首页',
      needLogin: true,
    },
    component: PageLayout,
    children: [HomeRoute, SystemRoute, DemoRoute, SubUserRoute, SubAgentRoute],
  },
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
