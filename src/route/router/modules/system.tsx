import { lazy } from 'react';
import { Route } from '@/route/router';
import { t } from 'i18next';
const SystemUser = lazy(() => import('@/pages/system/SystemUser'));
export const SystemRoute: Route = {
  path: '/system/user',
  meta: {
    title: t('menu.system.systemUser'),
    needLogin: true,
  },
  component: SystemUser,
};
