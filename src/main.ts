import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import appRouter from './router/index';
import appStore from './store/index';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
// @ts-ignore
import vClickOutside from 'v-click-outside';

const { bind, unbind } = vClickOutside.directive;

createApp(App)
  .use(ElementPlus)
  .use(appRouter)
  .use(appStore)
  .directive('click-outside', {
    mounted(el, bindling) {
      bind(el, { value: bindling.value });
    },
    beforeUnmount(el) {
      unbind(el);
    },
  })
  .mount('#app');
