<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PostListItem',

  props: {
    item: {
      type: Object,
    },
  },

  setup() {
    const router = useRouter();
    const onClickPostListItem = (id: number) => {
      router.push({ name: 'postShow', params: { postId: id } });
    };

    return {
      onClickPostListItem,
    };
  },

  components: {},
});
</script>

<template>
  <div class="post-list-item">
    <div
      class="post-list-item-media"
      @click="onClickPostListItem(item.id)"
    ></div>
    <div class="post-list-item-content">
      <div
        class="post-list-item-content-title"
        @click="onClickPostListItem(item.id)"
      >
        {{ item.title }}
      </div>
      <div class="post-list-item-content-data">
        <div class="post-list-item-content-data-time">
          发表时间:{{ item.created }}
        </div>
        <div class="post-list-item-content-separate"></div>
        <div class="post-list-item-content-data-comment">
          评论量:{{ item.commentAmount }}
        </div>
        <div class="post-list-item-content-separate"></div>
        <div class="post-list-item-content-data-access">
          阅读量:{{ item.accessAmount }}
        </div>
      </div>
      <div class="post-list-item-content-description">
        {{ item.description }}
      </div>
      <div class="post-list-item-content-tag"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
