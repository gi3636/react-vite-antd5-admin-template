import { lazy } from 'react';
import { Route } from '@/route/router';
const SubUser = lazy(() => import('@/pages/sub-user'));

export const SubUserRoute: Route = {
  path: '/subUser',
  meta: {
    title: '下级用户',
    needLogin: true,
  },
  component: SubUser,
};
