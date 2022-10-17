<script lang="ts" setup>
import { defineProps } from 'vue';
import { TypesAndTagsDataType } from '@/types/interface';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const props = defineProps({
  tags: {
    type: Array<TypesAndTagsDataType>,
  },
});

// 标签跳转
const handleJumpToTag = (tag: TypesAndTagsDataType) => {
  // 当前标签
  store.commit('tag/setCurrentPostTag', tag.id);
  // 将博客标题存储到store中
  store.commit('app/setTitle', tag.name);
  router.push({ name: 'postTags', params: { tagId: tag.id } });
};
</script>

<template>
  <div class="tags-list">
    <div class="tags-list-title">标签</div>
    <div
      class="tags-list-item"
      v-for="tag in tags"
      :key="tag?.id"
      @click="handleJumpToTag(tag)"
    >
      #{{ tag?.name }}
      <sup class="tags-list-item-amount">{{ tag?.amount }}</sup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
