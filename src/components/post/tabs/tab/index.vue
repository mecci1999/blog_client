<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue';
import { TypesAndTagsDataType } from '@/types/interface';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const props = defineProps({
  tabs: {
    type: Array<TypesAndTagsDataType>,
  },
});

const postTabItemClasses = (id: any) => {
  return [
    'post-tab-item',
    { active: currentTypeId && id === currentTypeId.value },
  ];
};
const currentType: any = computed(() => store.getters['type/currentPostType']);
const currentTypeId = computed(() => currentType.value && currentType.value.id);

// 点击切换分类
const onClickChangeType = (tab: any) => {
  // 根据当前id获取当前标签数据
  // 将博客标题存储到store中
  store.commit('app/setTitle', tab.name);
  store.commit('type/setCurrentPostType', tab.id);

  // 获取当前分类的列表
  store.dispatch('post/getPosts', { filter: { typeId: tab.id } });
  router.replace({ params: { typeId: tab.id } });
};

const onClickFirstType = () => {
  store.commit('type/setCurrentPostType', 0);
  store.commit('post/setQueryString', '');
  store.commit('post/setNextPage', 1);
  store.dispatch('post/getPosts');
  router.replace({ params: { typeId: 0 } });
};
</script>

<template>
  <div class="post-tab">
    <div
      :class="['post-tab-item', { active: !currentTypeId }]"
      @click="onClickFirstType"
    >
      <div class="post-tab-item-name">首页</div>
    </div>
    <div
      :class="postTabItemClasses(tab?.id)"
      v-for="tab in tabs"
      :key="tab?.id"
      @click="onClickChangeType(tab)"
    >
      <div class="post-tab-item-name">{{ tab?.name }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
