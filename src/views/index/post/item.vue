<script lang="ts" setup>
import {
  onBeforeMount,
  ref,
  reactive,
  onMounted,
  computed,
  nextTick,
  watch,
  defineProps,
} from 'vue';
import { PostItemType } from '@/types/interface';

const props = defineProps({
  item: {
    type: Object,
  },
});

const handleJump = () => {
  window.location.href = props.item?.url;
};
</script>

<template>
  <div class="app-post-item" @click="handleJump">
    <div class="app-post-item__img">
      <img :src="`http://localhost:9000/api/post/${item._id}`" alt="" />
    </div>
    <div class="app-post-item__title">{{ item?.name }}</div>
    <div class="app-post-item__description">{{ item?.description }}</div>
    <div class="app-post-item__meta"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
