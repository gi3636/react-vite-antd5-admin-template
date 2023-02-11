import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import './index.less';
import PageSider from '@/components/layout/sider/PageSider';
import PageHeader from '@/components/layout/header/PageHeader';
import PageContent from '@/components/layout/content/PageContent';
import TabPage from '@/components/layout/tag/TabPage';
function PageLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <PageSider collapsed={collapsed} />
      <Layout className='site-layout'>
        <PageHeader collapsed={collapsed} setCollapsed={setCollapsed} colorBgContainer={colorBgContainer} />
        <TabPage />
        <PageContent colorBgContainer={colorBgContainer} />
      </Layout>
    </Layout>
  );
}

export default PageLayout;
