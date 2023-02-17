import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import Router from '@/route';
import { ConfigProvider, theme } from 'antd';
import { useDispatch, useSelector } from '@/store';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import useLanguage from '@/hooks/useLanguage';
import { LanguageType } from '@/types';
import { updateUser } from '@/store/user/slice';
import { USER_INFO } from '@/constant';

const { darkAlgorithm, defaultAlgorithm } = theme;
function App() {
  const globalConfig = useSelector((state: any) => state.config);
  const dispatch = useDispatch();
  const { locale } = useLanguage();

  // Ant Design主题变量
  const antdTheme = {
    // 亮色/暗色配置
    algorithm: globalConfig.dark ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: globalConfig.colorPrimary,
    },
  };

  useEffect(() => {
    let userInfo = localStorage.getItem(USER_INFO);
    if (userInfo) {
      dispatch(updateUser(JSON.parse(userInfo)));
    }
  }, []);

  return (
    <ConfigProvider locale={locale === LanguageType.En ? enUS : zhCN} theme={antdTheme}>
      <HashRouter>
        <Router></Router>
      </HashRouter>
    </ConfigProvider>
  );
}

export default App;
