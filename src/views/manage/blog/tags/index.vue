<template>
  <div class="app-management__blog-tags">
    <el-button
      class="app-management__blog-tags__add ml-1"
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
      style="margin-bottom: 10px; width: 200px; height: 32px"
      maxlength="15"
      show-word-limit
      @blur="handleInputConfirm"
    />
    <div class="app-management__blog-tags__list">
      <div
        class="app-management__blog-tags__list-item"
        v-for="(item, index) in (processList as any)"
        :key="item.id"
      >
        <el-tag
          v-show="item.visible"
          size="large"
          class="mx-1"
          closable
          :disable-transitions="true"
          @dblclick.stop="handleDbClick(index)"
          @close="handleClose(item.id)"
        >
          {{ item.name }}
        </el-tag>
        <el-input
          v-show="!item.visible"
          ref="InputRefList"
          v-model="inputValue"
          size="small"
          style="
            margin-bottom: 10px;
            margin-left: 16px;
            width: 200px;
            height: 32px;
          "
          maxlength="15"
          show-word-limit
          clearable
          @blur="onInputBlur(index, item.id)"
          @clear="onInputClear(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, ref } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { useTags } from './hooks/useTags';
import { createTagsApi } from '@/api';

const store = useStore();

const {
  processList,
  tagsList,
  inputValue,
  handleClose,
  onInputBlur,
  clearInputValue,
  getTagsData,
  updateTagsData,
  onInputClear,
} = useTags();

const InputRef = ref(null) as any;
const InputRefList = ref(null) as any;
const inputVisible = ref(false);

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value?.focus();
  });
};

const handleInputConfirm = async () => {
  if (inputValue.value) {
    // 新增分类
    try {
      await createTagsApi({ name: inputValue.value });
      ElMessage.success('新增标签成功');
      await getTagsData();
    } catch (error) {
      console.log(error);
      ElMessage.error('新增标签失败');
    }
    inputVisible.value = false;
    clearInputValue();
  }

  inputVisible.value = false;
};

// 处理双击事件
const handleDbClick = (index: number) => {
  processList.value[index].visible = false;
  nextTick(() => {
    InputRefList.value[index].focus();
  });
  inputValue.value = processList.value[index]?.name;
};

onMounted(() => {
  // 挂载时增加tab
  const tab = {
    name: 'manage.blog.tags',
    title: '标签管理',
  };
  store.commit('manage/addTab', tab);
  store.commit('manage/setCurrentTab', tab.name);
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
