import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default (mode) => {
  // 配置打包主路径
  const root = process.cwd();
  const env = loadEnv(mode, root);

  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    base: env.VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    css: {
      // 引入预处理器
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/index.scss";',
        },
      },
    },
    define: {
      'process.env': {},
    },
    server: {
      proxy: {
        '/tenApi': {
          target: 'https://tenapi.cn',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/tenApi/, ''),
          secure: true,
        },
        '/thirdqqApi': {
          target: 'https://thirdqq.qlogo.cn',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/thirdqqApi/, ''),
          secure: true,
        },
        '/sohuApi': {
          target: 'https://pv.sohu.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/sohuApi/, ''),
          secure: true,
        },
        '/baiduMapApi': {
          target: 'https://api.map.baidu.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/baiduMapApi/, ''),
          secure: true,
        },
        [`${loadEnv(mode, process.cwd())}`]: {
          target: loadEnv(mode, process.cwd()),
          changeOrigin: true,
          ws: true,
        },
      },
    },
  });
};
