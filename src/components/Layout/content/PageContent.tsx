import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { useOutlet } from 'react-router';
import KeepAlive from '@/components/KeepAlive/KeepAlive';

const { Content } = Layout;

function PageContent({ colorBgContainer }) {
  return (
    <Content
      style={{
        padding: 24,
        background: colorBgContainer,
      }}>
      <KeepAlive></KeepAlive>
    </Content>
  );
}

export default PageContent;
