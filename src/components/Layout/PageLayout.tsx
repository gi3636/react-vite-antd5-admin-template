import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import './index.less';
import PageSider from '@/components/Layout/sider/PageSider';
import PageHeader from '@/components/Layout/header/PageHeader';
import PageContent from '@/components/Layout/content/PageContent';
import TabPage from '@/components/Layout/tag/TabPage';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function PageLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  console.log('刷新');

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
    </div>
  );
}

export default PageLayout;
