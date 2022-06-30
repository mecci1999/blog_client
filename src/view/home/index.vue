<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/navBar/index.vue';
import AppIcon from '@/components/common/app-icon/index.vue';
import UserInfo from '@/components/user/info/index.vue';
import PostList from '@/components/post/list/index.vue';

export default defineComponent({
  name: "AppHome",

  setup() {
    const onClickScrollDown = () => {
      document.getElementById('main')?.scrollIntoView({behavior: 'smooth'})
    }

    // 用户信息接口信息
    const users = {
      name: 'Mecci',
      description: '学习永无止境',
      blogAmount: 10,
      typeAmount: 4,
      tagAmount: 8,
      info:{
        github: 'https://www.github.com/mecci1999',
        qq: 'http://wpa.qq.com/msgrd?v=3&uin=664751829&site=qq&menu=yes',
        wechat: '',
      }
    }

    // 博客信息接口
    const posts = [
      {
        id: 3,
        title: '独立开发个人博客',
        description: '从0到1独立完成搭建属于自己的个人博客网站，此次开发使用到的技术栈前端为vue3+vite+ts,后端的技术栈为express+mysql。',
        content: '<h1>hello,world!</h1>',
        wordAmount: '800',
        readTime: '10min',
        created: '2022-06-14 23:26:35',
        commentAmount: 10,
        accessAmount: 4000,
      },
      {
        id: 2,
        title: '独立开发个人博客',
        description: '从0到1独立完成搭建属于自己的个人博客网站，此次开发使用到的技术栈前端为vue3+vite+ts,后端的技术栈为express+mysql。',
        content: '<h1>hello,world!</h1>',
        wordAmount: '800',
        readTime: '10min',
        created: '2022-06-14 23:26:35',
        commentAmount: 10,
        accessAmount: 4000,
      },
      {
        id: 1,
        title: '独立开发个人博客',
        description: '从0到1独立完成搭建属于自己的个人博客网站，此次开发使用到的技术栈前端为vue3+vite+ts,后端的技术栈为express+mysql。',
        content: '<h1>hello,world!</h1>',
        wordAmount: '800',
        readTime: '10min',
        created: '2022-06-14 23:26:35',
        commentAmount: 10,
        accessAmount: 4000,
      }
    ]

    return {
      onClickScrollDown,
      users,
      posts,
    };
  },

  components: {
    NavBar,
    AppIcon,
    UserInfo,
    PostList,
  },
});
</script>

<template>
  <div class="app-home">
    <div class="bg">
      <div class="bg-container">
        <span class="bg-container-title">趁现在还年轻</span>
        <div class="bg-container-scroll-down" @click="onClickScrollDown">
          <AppIcon name="keyboard_arrow_down" size="32" color="#eee" />
        </div>
      </div>
    </div>
    <NavBar />
    <div id="main" class="app-main">
      <div class="app-main-container">
        <div class="app-main-container-left">
          <UserInfo :user="users" />
        </div>
        <div class="app-main-container-right">
          <PostList :posts="posts" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
