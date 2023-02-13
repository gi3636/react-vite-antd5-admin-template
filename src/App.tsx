import React from 'react';
import { HashRouter } from 'react-router-dom';
import Router from '@/route';
import { ConfigProvider, theme } from 'antd';
import { useSelector } from '@/store';

const { darkAlgorithm, defaultAlgorithm } = theme;
function App() {
  // 获取store中的主题配置
  const globalConfig = useSelector((state: any) => state.config);
  // Ant Design主题变量
  const antdTheme = {
    // 亮色/暗色配置
    algorithm: globalConfig.dark ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: globalConfig.colorPrimary,
    },
  };
  return (
    <ConfigProvider theme={antdTheme}>
      <HashRouter>
        <Router></Router>
      </HashRouter>
    </ConfigProvider>
  );
}

export default App;
