<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const currentIsFirstPost = computed(
  () => store.getters['post/currentIsFirstPost'],
);

const currentIsEndPost = computed(() => store.getters['post/currentIsEndPost']);

const getForwardPost = computed(() => store.getters['post/getForwardPost']);

const getBackPost = computed(() => store.getters['post/getBackPost']);

const onClickForwardJump = () => {
  // 跳转到前一篇博客
  // 将博客标题存储到store中
  store.commit('app/setTitle', getForwardPost.value.title);
  router.push({
    name: 'postShow',
    params: { postId: getForwardPost.value.id },
  });
  store.dispatch('post/getPostById', getForwardPost.value.id);
  store.dispatch('comment/getComments', { postId: getForwardPost.value.id });
};

const onClickBackJump = () => {
  // 跳转到后一篇博客
  // 将博客标题存储到store中
  store.commit('app/setTitle', getBackPost.value.title);
  router.push({
    name: 'postShow',
    params: { postId: getBackPost.value.id },
  });
  store.dispatch('post/getPostById', getBackPost.value.id);
  store.dispatch('comment/getComments', { postId: getBackPost.value.id });
};
</script>

<template>
  <div class="post-navigator">
    <div
      :class="['post-navigator-forward', { only: currentIsEndPost }]"
      v-if="!currentIsFirstPost"
      @click="onClickForwardJump"
    >
      <img
        class="post-navigator-forward-img"
        :src="
          getForwardPost?.bgImgUrl
            ? `https://${getForwardPost?.bgImgUrl}`
            : '@/assets/image/git.png'
        "
      />
      <div class="post-navigator-forward-shadow"></div>
      <div class="post-navigator-forward-text">
        <div class="post-navigator-forward-text-top">上一篇</div>
        <div class="post-navigator-forward-text-bottom">
          {{ getForwardPost?.title }}
        </div>
      </div>
    </div>
    <div
      :class="['post-navigator-back', { only: currentIsFirstPost }]"
      v-if="!currentIsEndPost"
      @click="onClickBackJump"
    >
      <img
        class="post-navigator-back-img"
        :src="
          getBackPost?.bgImgUrl
            ? `https://${getBackPost?.bgImgUrl}`
            : '@/assets/image/r_statistics.jpeg'
        "
      />
      <div class="post-navigator-back-shadow"></div>
      <div class="post-navigator-back-text">
        <div class="post-navigator-back-text-top">下一篇</div>
        <div class="post-navigator-back-text-bottom">
          {{ getBackPost?.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
