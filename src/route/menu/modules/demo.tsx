import { AppstoreOutlined } from '@ant-design/icons';
import { MenuConfig } from '@/route/menu';

export const demoMenu: MenuConfig = {
  order: 2,
  menu: {
    id: 'z0',
    name: '示例',
    path: '/demo',
    icon: <AppstoreOutlined />,
    children: [
      {
        id: 'z1',
        order: 2,
        path: '/demo/pro-table',
        name: 'ProTable示例2',
      },
      {
        id: 'z2',
        order: 1,
        path: '/demo/pro-table1',
        name: 'ProTable示例1',
      },
    ],
  },
};
