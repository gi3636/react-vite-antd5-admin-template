import { lazy, LazyExoticComponent } from 'react';
import { HomeRoute } from '@/route/router/modules/home';
import { SubUserRoute } from '@/route/router/modules/subUser';
import { SubAgentRoute } from '@/route/router/modules/subAgent';
import { WalletWithdrawRoute } from '@/route/router/modules/walletWithdraw';
import { StatementManageRoute } from '@/route/router/modules/statementManage';

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
    children: [HomeRoute, SubUserRoute, SubAgentRoute, WalletWithdrawRoute, StatementManageRoute],
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
