import { LineChartOutlined, UserOutlined } from '@ant-design/icons';
import { MenuItem } from '@/route/menu';

export const getStatementManageMenu = (t): MenuItem => {
  return {
    order: 4,
    id: 'statementManage',
    name: '报表管理',
    path: '/statementManage',
    icon: <LineChartOutlined />,
  };
};
