import { colors } from '@/styles/colors';

/**
 * 全局配置
 */
export const globalConfig = {
  // 项目名称
  projectName: '管理后台',
  // 初始主题（localStorage未设定的情况）
  locale: 'zh',
  initTheme: {
    // 初始为亮色主题
    dark: false,
    // 初始主题色
    // 与customColorPrimary数组中的某个值对应
    // null表示默认使用Ant Design默认主题色或customColorPrimary第一种主题色方案
    colorPrimary: colors.primaryColor,
  },
  // 供用户选择的主题色，如不提供该功能，则设为空数组
  customColorPrimary: ['#1677ff', '#f5222d', '#fa8c16', '#722ed1', '#13c2c2', '#52c41a'],
  // localStorage用户主题信息标识
  uploadUrl: '',
  downloadUrl: 'https://xxxxx/',
  devBaseUrl: 'http://localhost:9999/',
  prodBaseUrl: 'http://xxxx:9999/',
};
