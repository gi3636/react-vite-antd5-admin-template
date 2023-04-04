import { WalletOutlined } from '@ant-design/icons';
import { MenuItem } from '@/route/menu';

export const getWalletWithdrawMenu = (t): MenuItem => {
  return {
    order: 5,
    id: 'walletWithdraw',
    name: '提款记录',
    path: '/walletWithdraw',
    icon: <WalletOutlined />,
  };
};
