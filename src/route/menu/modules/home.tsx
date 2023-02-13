import { HomeOutlined } from '@ant-design/icons';
import { MenuConfig } from '@/route/menu';

export const getHomeMenu = (t): MenuConfig => {
  return {
    order: 1,
    menu: {
      id: 'a0',
      name: t('menu.home'),
      path: '/',
      icon: <HomeOutlined />,
    },
  };
};
