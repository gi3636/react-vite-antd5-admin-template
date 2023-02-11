import { HomeOutlined } from '@ant-design/icons';
import { MenuConfig } from '@/route/menu';

export const homeMenu: MenuConfig = {
  order: 1,
  menu: {
    id: 'a0',
    name: '首页',
    path: '/',
    icon: <HomeOutlined />,
  },
};
