import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { useOutlet } from 'react-router';
import KeepAlive from '@/components/keep-alive/KeepAlive';

const { Content } = Layout;

function PageContent({ colorBgContainer }) {
  return (
    <Content
      style={{
        margin: '0 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
      }}>
      <KeepAlive include={['/demo/pro-table', '/']} keys={[]}></KeepAlive>
    </Content>
  );
}

export default PageContent;
