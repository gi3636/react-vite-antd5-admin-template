import { UserOutlined } from '@ant-design/icons';
import { MenuItem } from '@/route/menu';

export const getSystemMenu = (t): MenuItem => {
  return {
    order: 3,
    id: 'system',
    name: t('menu.system.title'),
    path: '/system',
    icon: <UserOutlined />,
    children: [
      {
        id: 'systemUser',
        path: '/system/user',
        name: t('menu.system.systemUser'),
      },
    ],
  };
};
