<template>
  <div class="app-menu">
    <el-row class="app-menu__main" :span="24">
      <el-menu
        default-active="/manage/blog/list"
        class="el-menu-vertical-demo"
        :collapse="isExpandMenu"
        router
      >
        <el-sub-menu index="/manage/blog">
          <template #title>
            <el-icon :size="18"><Reading /></el-icon>
            <span class="app-menu__main-title">博客管理</span>
          </template>
          <el-menu-item-group>
            <template #title><span>博客管理</span></template>
            <el-menu-item index="/manage/blog/list">
              <el-icon :size="16"><List /></el-icon>
              <span class="app-menu__main-2rdTitle">博客列表</span>
            </el-menu-item>
            <el-menu-item index="/manage/blog/publish">
              <el-icon :size="16"><DocumentAdd /></el-icon>
              <span class="app-menu__main-2rdTitle">发布博客</span>
            </el-menu-item>
            <el-menu-item index="/manage/blog/category">
              <el-icon :size="16"><CollectionTag /></el-icon>
              <span class="app-menu__main-2rdTitle">分类管理</span>
            </el-menu-item>
            <el-menu-item index="/manage/blog/tags">
              <el-icon :size="16"><PriceTag /></el-icon>
              <span class="app-menu__main-2rdTitle">标签管理</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="/manage/image">
          <template #title>
            <el-icon :size="18"><Picture /></el-icon>
            <span class="app-menu__main-title">图片管理</span>
          </template>
          <el-menu-item-group>
            <template #title><span>图片管理</span></template>
            <el-menu-item index="/manage/image/common">
              <el-icon :size="16"><PictureRounded /></el-icon>
              <span class="app-menu__main-2rdTitle">图片池</span>
            </el-menu-item>
            <el-menu-item index="/manage/image/avatar">
              <el-icon :size="16"><Avatar /></el-icon>
              <span class="app-menu__main-2rdTitle">头像管理</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="/manage/account">
          <el-icon :size="18"><User /></el-icon>
          <template #title>
            <span class="app-menu__main-title">账号管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/manage/dashboard" disabled>
          <el-icon :size="18"><DataAnalysis /></el-icon>
          <template #title>
            <span class="app-menu__main-title">数据管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/manage/comment">
          <el-icon :size="18"><ChatDotRound /></el-icon>
          <template #title>
            <span class="app-menu__main-title">评论管理</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-row>
    <div class="app-menu__footer" @click="handleModeChange">
      <div class="app-menu__footer-expand" v-if="isExpandMenu">
        <el-icon :size="18"><Expand /></el-icon>
      </div>
      <div class="app-menu__footer-fold" v-else>
        <el-icon :size="18"><Fold /></el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Reading,
  Expand,
  Fold,
  List,
  DocumentAdd,
  DataAnalysis,
  User,
  ChatDotRound,
  Picture,
  PictureRounded,
  Avatar,
  PriceTag,
  CollectionTag,
} from '@element-plus/icons-vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// 是否展开菜单
const isExpandMenu = computed(() => store.getters['manage/isExpand']);

// 展开菜单
const handleModeChange = () => {
  if (isExpandMenu.value) {
    store.commit('manage/setIsExpand', false);
  } else {
    store.commit('manage/setIsExpand', true);
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
