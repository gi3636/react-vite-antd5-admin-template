import React, { useMemo } from 'react';
import { HashRouter } from 'react-router-dom';
import Router from '@/route';
import { ConfigProvider, theme } from 'antd';
import { useSelector } from '@/store';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { useTranslation } from 'react-i18next';
import useLanguage from '@/hooks/useLanguage';
import { LanguageType } from '@/type';
const { darkAlgorithm, defaultAlgorithm } = theme;
function App() {
  // 获取store中的主题配置
  const globalConfig = useSelector((state: any) => state.config);
  const { locale } = useLanguage();
  // Ant Design主题变量
  const antdTheme = {
    // 亮色/暗色配置
    algorithm: globalConfig.dark ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: globalConfig.colorPrimary,
    },
  };

  return (
    <ConfigProvider locale={locale === LanguageType.En ? enUS : zhCN} theme={antdTheme}>
      <HashRouter>
        <Router></Router>
      </HashRouter>
    </ConfigProvider>
  );
}

export default App;
