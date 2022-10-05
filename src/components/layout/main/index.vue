<template>
  <div class="app-header">
    <el-tabs
      v-model="currentTab"
      type="card"
      class="app-header-tabs"
      closable
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in tabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <router-view></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const store = useStore();
const router = useRouter();

const tabs = computed(() => store.getters['manage/tabs']);
const currentTab = computed(() => store.getters['manage/currentTab']);

const handleTabClick = (tab: any, event: any) => {
  store.commit('manage/setCurrentTab', tab.props.name);
};

// 处理移除tab
const handleTabRemove = (tab: any) => {
  store.commit('manage/removeTab', tab);
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
