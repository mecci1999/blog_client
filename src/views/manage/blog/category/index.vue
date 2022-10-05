<template>
  <div class="app-management__blog-category">
    <el-button
      class="app-management__blog-category__add ml-1"
      size="large"
      @click="showInput"
    >
      +
    </el-button>
    <el-input
      v-show="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      size="small"
      style="margin-bottom: 10px; width: 200px"
      maxlength="15"
      show-word-limit
      @blur="handleInputConfirm"
    />
    <div
      class="app-management__blog-category__list"
      v-for="(item, index) in processList"
      :key="item.id"
    >
      <el-tag
        v-show="item.visible"
        size="large"
        class="mx-1"
        closable
        :disable-transitions="true"
        @dblclick.stop="handleDbClick(index)"
        @close="handleClose(index)"
      >
        {{ item.name }}
      </el-tag>
      <el-input
        v-show="!item.visible"
        ref="InputRefList"
        v-model="inputValue"
        size="small"
        style="margin-bottom: 10px; width: 200px"
        maxlength="15"
        show-word-limit
        clearable
        @blur="onInputBlur(index)"
        @clear="onInputClear(index)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { useCategory } from './hooks/useCategory';

const store = useStore();

onMounted(() => {
  // 挂载时增加tab
  const tab = {
    name: 'manage.blog.category',
    title: '分类管理',
  };
  store.commit('manage/addTab', tab);
  store.commit('manage/setCurrentTab', tab.name);
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
