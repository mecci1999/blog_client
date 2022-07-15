<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
  title: {
    type: String,
  },

  items: {
    type: Array,
  },
});
</script>

<template>
  <div class="time-line">
    <div class="time-line-title">{{ title }}</div>
    <div class="time-line-container">
      <div
        class="time-line-container-item"
        v-for="item in itmes"
        :key="item.id"
      >
        <div class="time-line-container-item-title"></div>
        <div class="time-line-container-item-content"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
