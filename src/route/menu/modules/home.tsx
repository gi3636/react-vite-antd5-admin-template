import { HomeOutlined } from '@ant-design/icons';
import { MenuItem } from '@/route/menu';

export const getHomeMenu = (t): MenuItem => {
  return {
    order: 1,
    id: 'home',
    name: t('menu.home'),
    path: '/',
    icon: <HomeOutlined />,
  };
};
