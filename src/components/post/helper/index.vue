<script lang="ts" setup>
import { onMounted, ref, onUnmounted, Transition } from 'vue';
import * as tocbot from 'tocbot';

const props = defineProps({
  headerHeight: {
    type: Number,
    default: 0,
  },
  bottomHeight: {
    type: Number,
    default: 0,
  },
});

// 是否显示目录
const showMenu = ref(false);

// 当前进度
const progress = ref(0);

const changeProcess = () => {
  if (window.scrollY < props.headerHeight) {
    return (progress.value = 0);
  }
  if (window.scrollY > props.headerHeight + props.bottomHeight) {
    return (progress.value = 100);
  }
  return (progress.value = Math.floor(
    ((window.scrollY - props.headerHeight) /
      (props.headerHeight + props.bottomHeight)) *
      100,
  ));
};

const handleClickButton = (e: MouseEvent) => {
  e.stopPropagation();
  showMenu.value = true;
  tocbot.refresh();
};

const handleClickOutSideMenu = (e: MouseEvent) => {
  e.stopPropagation();
  showMenu.value = false;
  tocbot.destroy();
};

onMounted(() => {
  window.addEventListener('scroll', changeProcess);

  tocbot.init({
    headingSelector: 'h1,h2,h3,h4',
    contentSelector: '.post-show-content',
    tocSelector: '.post-helper__container',
    scrollSmoothOffset: -80,
    headingsOffset: 100,
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', changeProcess);
});
</script>

<template>
  <div class="post-helper">
    <div class="post-helper__main">
      <Transition name="post-helper__button">
        <div
          class="post-helper__button"
          v-show="!showMenu"
          @click="handleClickButton"
        >
          {{ progress }}<span class="post-helper__button-icon">%</span>
        </div>
      </Transition>
      <Transition name="post-helper__container">
        <div
          class="post-helper__container"
          v-show="showMenu"
          v-click-outside="handleClickOutSideMenu"
        ></div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
