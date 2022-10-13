<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import NavMenu from './menu/index.vue';

const store = useStore();
const router = useRouter();
// appName
const name = computed(() => store.state.appName);
const shadow = ref(false);

const onJumpToHome = () => {
  // 跳转到首页
  router.push({ name: 'home' });
};

const onScrollWindow = () => {
  if (document) {
    const { scrollTop } = document.documentElement;
    shadow.value = scrollTop > 120 ? true : false;
  }
};

onMounted(() => {
  // 监听窗口滚动事件
  if (window) {
    window.addEventListener('scroll', onScrollWindow);
  }
});

onUnmounted(() => {
  if (window) {
    window.removeEventListener('scroll', onScrollWindow);
  }
});
</script>

<template>
  <div :class="['nav-bar', { shadow }]">
    <div class="nav-bar-container">
      <div class="nav-bar-container-left">
        <!-- <div class="nav-bar-container-left-name" @click="onJumpToHome">
          云分享
        </div> -->
        <div class="nav-bar-container-left-title" @click="onJumpToHome">
          云分享
        </div>
      </div>
      <div class="nav-bar-container-right">
        <NavMenu />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
