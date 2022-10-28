<script lang="ts" setup>
import { defineProps } from 'vue';
import { time } from '@/utils/time';
import { ElCarousel, ElCarouselItem } from 'element-plus';

const props = defineProps({
  item: {
    type: Object,
  },
});
</script>

<template>
  <div class="marquee-notice">
    <!-- <el-carousel
      height="100%"
      :interval="5000"
      indicator-position="none"
      arrow="never"
    > -->
    <!-- <el-carousel-item v-for="item in (list as any)" :key="item.id"> -->
    <div class="marquee-notice__container">
      <div class="marquee-notice__title">公告</div>
      <div
        class="marquee-notice__content"
        :style="{
          animationDuration: `${
            item?.content.length < 20 ? 5 : item?.content.length * 0.3 || 10
          }s`,
        }"
      >
        <span>{{ item?.content }}</span>
      </div>
      <div class="marquee-notice__date">{{ time(item?.date) }}</div>
    </div>

    <!-- </el-carousel-item> -->
    <!-- </el-carousel> -->
  </div>
</template>

<style lang="scss">
@import './index.scss';
</style>
