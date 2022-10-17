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
const onClickJumpToTagPage = (id: number, title?: string) => {
  // 当前标签
  store.commit('tag/setCurrentPostTag', id);
  // 将博客标题存储到store中
  store.commit('app/setTitle', title);
  router.push({ name: 'postTags', params: { tagId: id } });
};
</script>

<template>
  <span
    class="post-tag"
    @click.stop="onClickJumpToTagPage(item?.id, item?.name)"
  >
    <span class="post-tag-split">#</span>{{ item?.name }}
  </span>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
