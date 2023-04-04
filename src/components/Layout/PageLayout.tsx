import React, { useState, useEffect, useRef } from 'react';
import { Layout, theme } from 'antd';
import './index.less';
import PageSider from '@/components/Layout/sider/PageSider';
import PageHeader from '@/components/Layout/header/PageHeader';
import PageContent from '@/components/Layout/content/PageContent';
import TabPage from '@/components/Layout/tag/TabPage';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CheckPasswordModal from './modals/CheckPasswordModal';
import { emitter, EmitterType } from '@/utils/app-emitter';
import { checkPassword } from '@/api/auth';
import { getWithdrawWalletList } from '@/api/subUser';
import { updateUser } from '@/store/user/slice';
import { useDispatch } from '@/store';
import { getAgentInfo, getMessageList, getWalletInfo } from '@/api/home';
export const checkPasswordModal = 'global_check_password_modal';

function PageLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const timer = useRef<any>(null);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //检测是否设置了密码
  useEffect(() => {
    checkPassword().then((res) => {
      if (res.data && res.data.is_password) {
        return;
      }
      emitter.fire(`${checkPasswordModal}ShowModal`);
    });
  }, []);

  //获取提现方式列表
  useEffect(() => {
    updateWithdrawMethodList();
    emitter.singleton(EmitterType.updateWithdrawMethodList, updateWithdrawMethodList);
  }, []);

  //获取消息列表
  useEffect(() => {
    updateMessageList();
    timer.current = setInterval(() => {
      updateMessageList();
    }, 1000 * 60 * 3);
    emitter.singleton(EmitterType.updateMessageList, updateMessageList);
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  //获取钱包余额
  useEffect(() => {
    updateWalletInfo();
    emitter.singleton(EmitterType.updateWalletInfo, updateWalletInfo);
  }, []);

  //获取代理信息
  useEffect(() => {
    updateWalletInfo();
    emitter.singleton(EmitterType.updateAgentInfo, updateAgentInfo);
  }, []);

  const updateMessageList = async () => {
    getMessageList({ page: 1, page_size: 1000 }).then((res) => {
      dispatch(updateUser({ messageList: res?.data?.list || [] }));
    });
  };

  const updateWithdrawMethodList = async () => {
    getWithdrawWalletList().then((res) => {
      dispatch(updateUser({ withdrawalMethodList: res.data || [] }));
    });
  };

  const updateWalletInfo = () => {
    getWalletInfo().then((res) => {
      if (res.code == 200) {
        let data = res.data[0] || {};
        dispatch(
          updateUser({
            money: data?.money,
            settlemen_commission: data?.settlemen_commission,
            withdraw: data?.withdraw,
          }),
        );
      }
    });
  };

  const updateAgentInfo = () => {
    getAgentInfo().then((res) => {
      if (res.code == 200) {
        let data = res.data || {};
        delete data?.token; //删除token,防止覆盖
        delete data?.settlemen_commission;
        delete data?.money;
        delete data?.withdraw;
        dispatch(updateUser(data));
      }
    });
  };

  return (
    <div style={{ width: '100%' }}>
      <PageHeader />
      <div className='trigger' onClick={() => setCollapsed(!collapsed)} style={{ left: collapsed ? 65 : 185 }}>
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </div>
      <Layout>
        <PageSider collapsed={collapsed} />
        <div
          className='page-content'
          style={{
            width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)',
          }}>
          <TabPage />
          <PageContent colorBgContainer={colorBgContainer} />
        </div>
      </Layout>
      <CheckPasswordModal modalKey={checkPasswordModal} />
    </div>
  );
}

export default PageLayout;
