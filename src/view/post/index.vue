<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import NavBar from '@/components/navBar/index.vue';
import UserInfo from '@/components/user/info/index.vue';
import {
  changeBackgroundImageByTime,
  getCurrnetTime,
} from '@/utils/changeBackgroundImage';

export default defineComponent({
  name: 'PostShow',

  setup() {
    let time = ref('');
    let date: any;
    let style = reactive({
      backgroundImage: '',
    });

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
    };
  },

  components: {
    NavBar,
    UserInfo,
  },
});
</script>

<template>
  <div class="post-show" :style="style">
    <header class="post-show-header">
      <NavBar />
      <div class="post-show-header-title">为什么要写博客？</div>
    </header>
    <main class="post-show-main"></main>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
