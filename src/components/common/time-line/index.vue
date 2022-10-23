<script lang="ts" setup>
import { computed, defineProps, onMounted } from 'vue';
import { TimeLineDataType } from '@/types/interface';

const props = defineProps({
  items: {
    type: Array<TimeLineDataType>,
  },

  updatelog: {
    type: Boolean,
    default: false,
  },
});

const isArray = (item: any): boolean => Array.isArray(item);

onMounted(() => {
  if (props.updatelog) {
    props.items?.forEach((item: any) => {
      item.content = item.content?.split('|');
      return item;
    });
  }
});
</script>

<template>
  <div class="time-line">
    <div class="time-line-item" v-for="item in items" :key="item.id">
      <div class="time-line-item-date">{{ item.date }}</div>
      <div class="time-line-item-content" v-if="!isArray(item.content)">
        {{ item.content }}
      </div>
      <div
        class="time-line-item-content"
        v-if="isArray(item.content)"
        v-for="(log, index) in item.content"
        :key="index"
      >
        {{ log }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
