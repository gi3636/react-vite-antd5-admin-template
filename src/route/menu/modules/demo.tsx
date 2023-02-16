import { AppstoreOutlined } from '@ant-design/icons';
import { MenuItem } from '@/route/menu';

export const getDemoMenu = (t): MenuItem => {
  return {
    order: 10,
    id: 'demo',
    name: t('menu.demo.title'),
    path: '/demo',
    icon: <AppstoreOutlined />,
    children: [
      {
        id: 'demo1',
        order: 2,
        path: '/demo/pro-table',
        name: t('menu.demo.proTableDemo2'),
      },
      {
        id: 'demo2',
        order: 1,
        path: '/demo/pro-table1',
        name: t('menu.demo.proTableDemo'),
      },
    ],
  };
};
