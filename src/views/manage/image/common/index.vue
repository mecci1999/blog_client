<template>
  <div class="app-management__image-common">
    <div class="app-management__image-common__list">
      <div
        class="app-management__image-common__list-item"
        v-for="(item, index) in imagesList"
        :key="index"
      >
        <div class="app-management__image-common__list-item__delete">
          <el-icon :size="16"><Close /></el-icon>
        </div>
        <img
          class="app-management__image-common__list-item__image"
          :src="item.url"
        />
        <div class="app-management__image-common__list-item__title">
          <span>
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useImageCommon } from './hooks/useImageCommon';
import { Close } from '@element-plus/icons-vue';

const {
  imagesList,
  dialogImageUrl,
  dialogVisible,
  handlePictureCardPreview,
  handleRemove,
} = useImageCommon();

const store = useStore();

onMounted(() => {
  // 挂载时增加tab
  const tab = {
    name: 'manage.image.common',
    title: '图片池',
  };
  store.commit('manage/addTab', tab);
  store.commit('manage/setCurrentTab', tab.name);
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
