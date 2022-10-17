<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { getStroage } from '../../../utils/localStorage';
import AppIcon from '../../common/app-icon/index.vue';
import NavMenuItem from './item/index.vue';

const store = useStore();

// 主题
const theme = getStroage('theme');
if (theme) {
  store.commit('theme/setTheme', theme);
}
const themeIcon = computed(() => store.getters['theme/themeIcon']);
const themeValue = computed(() => store.getters['theme/theme']);

const MenuList = [
  {
    icon: 'search',
    text: '搜索',
    path: '',
  },
  {
    icon: 'home',
    text: '首页',
    path: 'home',
  },
  {
    icon: 'explore',
    text: '目录',
    path: '',
  },
  // {
  //   icon: 'chat',
  //   text: '留言板',
  //   path: 'comment',
  // },
  {
    icon: 'face',
    text: '关于',
    path: 'about',
  },
];

// 定义切换主题方法
const changeTheme = () => {
  const theme = themeValue.value === 'dark' ? 'light' : 'dark';

  store.commit('theme/setTheme', theme);
};

// 打开侧边栏菜单
const openSideMenu = () => {
  store.commit('sidebar/openSidebarMenu');
};
</script>

<template>
  <div class="nav-menu">
    <div class="nav-menu-list">
      <NavMenuItem v-for="item in MenuList" :key="item.text" :item="item" />
      <div class="nav-menu-list-item" @click="changeTheme">
        <AppIcon :name="themeIcon" size="20" />
        <span class="nav-menu-list-item-name">主题</span>
      </div>
      <div :class="['nav-menu-list-item', 'menu']" @click="openSideMenu">
        <AppIcon name="menu" size="20" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
