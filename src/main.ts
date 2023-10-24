import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import appRouter from './router/index';
import appStore from './store/index';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
import 'swiper/css';

createApp(App).use(ElementPlus).use(appRouter).use(appStore).mount('#app');
