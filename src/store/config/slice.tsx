import { createSlice } from '@reduxjs/toolkit';
import { globalConfig } from '@/globalConfig';
import { LanguageType } from '@/types';
import { LOCALE, THEME } from '@/constant';

// 先从localStorage里获取主题配置
// const sessionTheme = JSON.parse(window.localStorage.getItem(globalConfig.SESSION_LOGIN_THEME) || '{}');
const sessionTheme = null;

// 如果localStorage里没有主题配置，则使用globalConfig里的初始化配置
const initTheme = sessionTheme ? sessionTheme : globalConfig.initTheme;

//该store分库的初始值
const initialState = {
  dark: initTheme.dark,
  colorPrimary: initTheme.colorPrimary,
  locale: LanguageType.Zh,
  token: {
    colorPrimary: initTheme.colorPrimary,
  },
};

export const configSlice = createSlice({
  // store分库名称
  name: 'config',
  // store分库初始值
  initialState,
  reducers: {
    // 设置亮色/暗色主题
    setDark: (state, action) => {
      // 修改了store分库里dark的值（用于让全项目动态生效）
      state.dark = action.payload;
      // 更新localStorage的主题配置（用于长久保存主题配置）
      window.localStorage.setItem(THEME, JSON.stringify(state));
    },
    // 设置主题色
    setColorPrimary: (state, action) => {
      // 修改了store分库里colorPrimary的值（用于让全项目动态生效）
      state.colorPrimary = action.payload;
      // 更新localStorage的主题配置（用于长久保存主题配置）
      window.localStorage.setItem(THEME, JSON.stringify(state));
    },
    setLocale: (state, action) => {
      state.locale = action.payload;
      console.log('setLocale', action.payload);
      window.localStorage.setItem(LOCALE, JSON.stringify(action.payload));
    },
  },
});

export const { setDark, setLocale } = configSlice.actions;
export const { setColorPrimary } = configSlice.actions;

export default configSlice.reducer;
