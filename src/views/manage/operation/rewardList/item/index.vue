<template>
  <div class="app-management__rewardList-list-item">
    <div
      class="app-management__rewardList-list-item__delete"
      @click="handleDelete(item?.id)"
    >
      <el-icon class="app-management__announce-list-item__delete-button"
        ><Delete
      /></el-icon>
    </div>
    <div class="app-management__rewardList-list-item__name">
      {{ item?.name }}
    </div>
    <div class="app-management__rewardList-list-item__bottom">
      <div
        :class="[
          'app-management__rewardList-list-item__bottom-money',
          { vip: parseInt(item?.amount.split('¥')[1], 10) >= 50 },
        ]"
      >
        {{ item?.amount }}
      </div>
      <div class="app-management__rewardList-list-item__bottom-time">
        {{ time(item?.date) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import { time } from '@/utils/time';

const props = defineProps({
  item: {
    type: Object,
  },
});

const emit = defineEmits(['handleDelete']);

const handleDelete = (id: number) => {
  emit('handleDelete', id);
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
