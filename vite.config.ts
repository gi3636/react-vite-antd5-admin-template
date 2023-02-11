import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'; // 主要用于alias文件路径别名
import progress from 'vite-plugin-progress';
import eslintPlugin from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import colors from 'picocolors';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    progress({
      format: `${colors.green(colors.bold('Building'))} ${colors.cyan('[:bar]')} :percent`,
    }),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'],
    }),
    svgr(),
  ],
  server: {
    open: true,
  },
  /**
   * [plugin:vite:css] '~antd/dist/antd.less' wasn't found.
   * less import no support webpack alias '~'
   *
   * Ref: https://github.com/vitejs/vite/issues/2185#issuecomment-784637827
   */
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@', replacement: resolve(__dirname, './src') },
    ],
  },

  /**
   * [plugin:vite:css] Inline JavaScript is not enabled. Is it set in your options?
   *
   * Ref:
   *   https://blog.csdn.net/baobao_123456789/article/details/113986961
   *   https://stackoverflow.com/questions/46729091/enable-inline-javascript-in-less
   */
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
