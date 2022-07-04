<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import NavBar from '@/components/navBar/index.vue';
import UserInfo from '@/components/user/info/index.vue';
import {
  changeBackgroundImageByTime,
  getCurrnetTime,
} from '@/utils/changeBackgroundImage';
import PostShowInfo from '@/components/post/show/info/index.vue';

export default defineComponent({
  name: 'PostShow',

  setup() {
    let time = ref('');
    let date: any;
    let style = reactive({
      backgroundImage: '',
    });

    // 博客数据
    const post = {
      id: 1,
      title: '为什么要写博客？',
      description:
        '从0到1独立完成搭建属于自己的个人博客网站，此次开发使用到的技术栈前端为vue3+vite+ts,后端的技术栈为express+mysql。',
      content: '<h1>hello,world!</h1>',
      wordAmount: '800',
      readTime: '10min',
      created: '2022-06-14 23:26:35',
      updated: '2022-06-15 12:20:20',
      commentAmount: 10,
      accessAmount: 4000,
    };

    onMounted(async () => {
      date = setInterval(() => {
        time.value = getCurrnetTime();
        style.backgroundImage = changeBackgroundImageByTime(
          time.value.slice(0, 2),
        );

        clearInterval(date);
      }, 1000);
    });

    return {
      style,
      time,
      post,
    };
  },

  components: {
    NavBar,
    UserInfo,
    PostShowInfo,
  },
});
</script>

<template>
  <div class="post-show" :style="style">
    <header class="post-show-header">
      <NavBar />
      <div class="post-show-header-title">{{ post.title }}</div>
    </header>
    <main class="post-show-main">
      <div class="post-show-main-header">
        <PostShowInfo :post="post" />
      </div>
      <div class="post-show-main-container"></div>
      <div class="post-show-main-footer"></div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
