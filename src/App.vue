<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AppSearch from '@/components/search/index.vue';
import SidebarMenu from '@/components/sidebarMenu/index.vue';

const store = useStore();

const theme = computed(() => store.getters['theme/theme']);

// 搜索弹窗
const searchDialogStatus = computed(
  () => store.getters['search/searchDialogStatus'],
);
// 侧边栏菜单抽屉
const sidebarMenuStatus = computed(
  () => store.getters['sidebar/sidebarMenuStatus'],
);
</script>

<template>
  <div :class="['blog', theme]">
    <router-view />
    <AppSearch v-show="searchDialogStatus" />
    <SidebarMenu v-show="sidebarMenuStatus" />
  </div>
</template>

<style lang="scss">
@import './styles/index.scss';
</style>
