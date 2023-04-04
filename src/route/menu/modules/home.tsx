import { HomeOutlined } from '@ant-design/icons';
import { MenuItem } from '@/route/menu';

export const getHomeMenu = (t): MenuItem => {
  return {
    order: 1,
    id: 'home',
    name: '首页',
    path: '/',
    icon: <HomeOutlined />,
  };
};
