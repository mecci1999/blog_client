<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import NavBar from '@/components/navBar/index.vue';
import AppIcon from '@/components/common/app-icon/index.vue';
import UserInfo from '@/components/user/info/index.vue';
import PostList from '@/components/post/list/index.vue';
import AppFooter from '@/components/footer/index.vue';
import {
  changeBackgroundImageByTime,
  getCurrnetTime,
} from '@/utils/changeBackgroundImage';
import PostTabBar from '@/components/post/tabs/index.vue';
import { postType, tags } from '@/api/test/index.ts';
import TagsList from '@/components/post/tag/list/index.vue';

export default defineComponent({
  name: 'AppHome',

  setup() {
    const onClickScrollDown = () => {
      document.getElementById('main')?.scrollIntoView({ behavior: 'smooth' });
    };

    let time = ref('');
    let date: any;
    let style = reactive({
      backgroundImage: '',
    });

    // 用户信息接口信息
    const users = {
      name: 'Mecci',
      description: '学习永无止境',
      blogAmount: 10,
      typeAmount: 4,
      tagAmount: 8,
      info: {
        github: 'https://www.github.com/mecci1999',
        qq: 'http://wpa.qq.com/msgrd?v=3&uin=664751829&site=qq&menu=yes',
        wechat: '',
      },
    };

    // 博客信息接口
    const posts = [
      {
        id: 3,
        title: '独立开发个人博客',
        description:
          '从0到1独立完成搭建属于自己的个人博客网站，此次开发使用到的技术栈前端为vue3+vite+ts,后端的技术栈为express+mysql。',
        content: '<h1>hello,world!</h1>',
        wordAmount: '800',
        readTime: '10min',
        created: '2022-06-14 23:26:35',
        commentAmount: 10,
        accessAmount: 4000,
        types: [
          {
            id: 1,
            name: '前端技术',
          },
          {
            id: 2,
            name: '面经',
          },
        ],
        tags: [
          {
            id: 1,
            name: 'JavaScript',
          },
          {
            id: 2,
            name: '开发',
          },
          {
            id: 3,
            name: '日常',
          },
        ],
      },
      {
        id: 2,
        title: '独立开发个人博客',
        description:
          '从0到1独立完成搭建属于自己的个人博客网站，此次开发使用到的技术栈前端为vue3+vite+ts,后端的技术栈为express+mysql。',
        content: '<h1>hello,world!</h1>',
        wordAmount: '800',
        readTime: '10min',
        created: '2022-06-14 23:26:35',
        commentAmount: 10,
        accessAmount: 4000,
        types: [
          {
            id: 1,
            name: '前端技术',
          },
          {
            id: 2,
            name: '面经',
          },
        ],
        tags: [
          {
            id: 1,
            name: 'JavaScript',
          },
          {
            id: 2,
            name: '开发',
          },
          {
            id: 3,
            name: '日常',
          },
        ],
      },
      {
        id: 1,
        title: '独立开发个人博客',
        description:
          '从0到1独立完成搭建属于自己的个人博客网站，此次开发使用到的技术栈前端为vue3+vite+ts,后端的技术栈为express+mysql。',
        content: '<h1>hello,world!</h1>',
        wordAmount: '800',
        readTime: '10min',
        created: '2022-06-14 23:26:35',
        commentAmount: 10,
        accessAmount: 4000,
        types: [
          {
            id: 1,
            name: '前端技术',
          },
          {
            id: 2,
            name: '面经',
          },
        ],
        tags: [
          {
            id: 1,
            name: 'JavaScript',
          },
          {
            id: 2,
            name: '开发',
          },
          {
            id: 3,
            name: '日常',
          },
        ],
      },
    ];

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
      onClickScrollDown,
      users,
      posts,
      style,
      postType,
      tags,
    };
  },

  components: {
    NavBar,
    AppIcon,
    UserInfo,
    PostList,
    AppFooter,
    PostTabBar,
    TagsList,
  },
});
</script>

<template>
  <div class="app-home">
    <NavBar />
    <div class="bg" :style="style">
      <div class="bg-container">
        <span class="bg-container-title">趁现在还年轻</span>
        <div class="bg-container-scroll-down" @click="onClickScrollDown">
          <AppIcon name="keyboard_arrow_down" size="32" color="#eee" />
        </div>
      </div>
    </div>
    <main id="main" class="app-main">
      <div class="app-main-container">
        <div class="app-main-container-left">
          <UserInfo :user="users" />
          <TagsList :tags="tags" />
        </div>
        <div class="app-main-container-right">
          <PostTabBar :type="postType" />
          <PostList :posts="posts" />
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
