<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/navBar/index.vue';
import UserInfo from '@/components/user/info/index.vue';

export default defineComponent({
  name: 'PostShow',

  setup() {
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

    return {
      users,
    };
  },

  components: {
    NavBar,
    UserInfo,
  },
});
</script>

<template>
  <div class="post-show">
    <header class="post-show-header">
      <NavBar />
      <div class="post-show-header-title"></div>
      <div class="post-show-header-info"></div>
    </header>
    <main class="post-show-main">
      <div class="post-show-main-left">
        <UserInfo :user="users" />
      </div>
      <div class="post-show-main-right"></div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
