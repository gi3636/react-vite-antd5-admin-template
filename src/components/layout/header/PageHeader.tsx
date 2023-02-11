import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, theme } from 'antd';
const { Header, Sider, Content } = Layout;
function PageHeader({ collapsed, setCollapsed, colorBgContainer }) {
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })}
    </Header>
  );
}

export default PageHeader;
