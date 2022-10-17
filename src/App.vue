<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AppSearch from '@/components/search/index.vue';
import SidebarMenu from '@/components/sidebarMenu/index.vue';
import { ElImageViewer } from 'element-plus';
import AppLoading from '@/components/common/loading/index.vue';

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
// 图片预览器
const imageViewerStatus = computed(
  () => store.getters['sidebar/imageViewerStatus'],
);

// 图片列表
const imageUrlList = computed(() => store.getters['sidebar/imageUrlList']);

// 当前图片索引
const currentImageIndex = computed(
  () => store.getters['sidebar/currentImageIndex'],
);

// 处理关闭图片预览
const handleCloseImageViewer = () => {
  store.commit('sidebar/closeImageViewer');
};
</script>

<template>
  <div :class="['blog', theme]">
    <router-view />
    <AppLoading />
    <AppSearch v-show="searchDialogStatus" />
    <SidebarMenu v-show="sidebarMenuStatus" />
    <ElImageViewer
      v-if="imageViewerStatus"
      :initial-index="currentImageIndex"
      :url-list="imageUrlList"
      :hide-on-click-modal="true"
      @close="handleCloseImageViewer"
    />
  </div>
</template>

<style lang="scss">
@import './styles/index.scss';
</style>
