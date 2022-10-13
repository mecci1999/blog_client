<template>
  <div class="sidebar-menu">
    <el-drawer
      v-model="sidebarMenuStatus"
      direction="rtl"
      :size="300"
      modal-class="menu-mask"
      @closed="handleClose"
    >
      <div class="sidebar-menu-main">
        <AppInfo :user="user" />
        <div class="menus">
          <div class="menus-list">
            <div class="menus-list-title">文库</div>
            <div
              class="menus-list-item"
              @click="onClickJumpRouter('postArticle')"
            >
              <AppIcon name="import_contacts" size="24" />
              <span>文章列表</span>
            </div>
            <div
              class="menus-list-item"
              @click.stop="onClickJumpRouter('postCategory', 1)"
            >
              <AppIcon name="dashboard" size="24" />
              <span>全部分类</span>
            </div>
            <div
              class="menus-list-item"
              @click.stop="onClickJumpRouter('postTags', 1)"
            >
              <AppIcon name="local_offer" size="24" />
              <span>全部标签</span>
            </div>
          </div>
          <div class="menus-list">
            <div class="menus-list-title">我的</div>
            <div class="menus-list-item" @click="onClickJumpRouter('about')">
              <AppIcon name="face" size="24" />
              <span>关于本站</span>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AppInfo from '@/components/user/info/index.vue';

const store = useStore();
const router = useRouter();

const sidebarMenuStatus = computed(
  () => store.getters['sidebar/sidebarMenuStatus'],
);

const user = computed(() => store.getters['user/user']);

// 点击跳转路由
const onClickJumpRouter = (routes: string, params?: string | number) => {
  switch (routes) {
    case 'postTags':
      handleClose();
      router.push({ name: routes, params: { tagId: params } });
      break;
    case 'postCategory':
      handleClose();
      router.push({ name: routes, params: { typeId: params } });
      break;
    case 'postArticle':
      handleClose();
      router.push({ name: routes });
      break;
    case 'about':
      handleClose();
      router.push({ name: routes });
      break;
  }
};

const handleClose = () => {
  store.commit('sidebar/closeSidebarMenu');
};

onMounted(() => {
  // 获取博主信息接口
  store.dispatch('user/getUser');
});
</script>

<style lang="scss">
@import './index.scss';
</style>
