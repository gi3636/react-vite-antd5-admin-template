import { UserOutlined } from '@ant-design/icons';
import { MenuConfig } from '@/route/menu';

export const getSystemMenu = (t): MenuConfig => {
  return {
    order: 3,
    menu: {
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
    },
  };
};
