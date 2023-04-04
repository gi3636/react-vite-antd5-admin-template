import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItem } from '@/route/menu';

export const getSubUserMenu = (t): MenuItem => {
  return {
    order: 2,
    id: 'subUser',
    name: '下级用户',
    path: '/subUser',
    icon: <TeamOutlined />,
  };
};
