<script lang="ts" setup>
import {
  onBeforeMount,
  ref,
  reactive,
  onMounted,
  computed,
  nextTick,
  watch,
} from 'vue';
import { useStore } from 'vuex';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import { getBannerList } from '@/api/index.ts';
import { API_BASE_URL } from '@/config';

const modules = [Pagination];

const bannerList = ref([]);

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = (e) => {
  // swiper切换的时候执行的方法
  console.log('slide change', e.activeIndex);
};

onBeforeMount(async () => {
  // 获取公告
  try {
    const banner = await getBannerList();
    bannerList.value = banner.data;
    console.log(bannerList.value);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="app-banner">
    <swiper
      class="swiper app-banner-container"
      :modules="modules"
      :loop="true"
      :speed="800"
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="banner in bannerList" :key="banner._id"
        ><img :src="`http://localhost:9000/api/banner/${banner._id}`"
      /></swiper-slide>
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
@import 'swiper/scss';
@import 'swiper/scss/pagination';
@import './index.scss';
</style>
