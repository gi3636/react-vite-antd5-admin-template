import { lazy } from 'react';
import { Route } from '@/route/router';

const WalletWithdraw = lazy(() => import('@/pages/walletWithdraw/index'));
export const WalletWithdrawRoute: Route = {
  path: '/walletWithdraw',
  meta: {
    title: '提款记录',
    needLogin: true,
  },
  component: WalletWithdraw,
};
