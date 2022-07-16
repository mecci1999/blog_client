<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import { TypesAndTagsDataType } from '@/types/interface'

const props = defineProps({
  tabs: {
    type: Array<TypesAndTagsDataType>,
  },
});

const isCurrentType = ref(1);

const postTabItemClasses = (id:any) => {
  return ['post-tab-item', { active: id === isCurrentType.value }];
};

const onClickPostTabItem = (id:any) => {
  isCurrentType.value = id;
};
</script>

<template>
  <div class="post-tab">
    <div
      :class="postTabItemClasses(tab?.id)"
      v-for="tab in tabs"
      :key="tab?.id"
      @click="onClickPostTabItem(tab?.id)"
    >
      <div class="post-tab-item-name">{{ tab?.name }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
