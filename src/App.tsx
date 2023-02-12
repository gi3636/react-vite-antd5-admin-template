import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import Router from '@/route';
import enUS from 'antd/locale/en_US';
import { ConfigProvider, theme } from 'antd';
import { useSelector } from '@/store';
const { darkAlgorithm, defaultAlgorithm } = theme;
function App(props) {
  // 获取store中的主题配置
  const globalTheme = useSelector((state: any) => state.theme);
  // Ant Design主题变量
  const antdTheme = {
    // 亮色/暗色配置
    algorithm: globalTheme.dark ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: globalTheme.colorPrimary,
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
