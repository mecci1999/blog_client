<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
const props = defineProps({
  item: {
    type: Object,
  },
});

// 点击标签后，跳转到对应的标签页
const onClickJumpToTagPage = (id: number) => {
  // 当前分类
  store.commit('tag/setCurrentPostTag', id);

  router.push({ name: 'postTags', params: { tagId: id } });
};
</script>

<template>
  <span class="post-tag" @click="onClickJumpToTagPage(item?.id)"> #{{ item?.name }} </span>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
