<template>
  <div class="app-management__updateLog-list-item">
    <div
      class="app-management__updateLog-list-item__delete"
      @click="handleDelete(item?.id)"
    >
      <el-icon class="app-management__updateLog-list-item__delete-button"
        ><Delete
      /></el-icon>
    </div>
    <div class="app-management__updateLog-list-item__content">
      <ul>
        <li
          class="app-management__updateLog-list-item__content-text"
          v-for="(text, index) in content"
          :key="index"
        >
          {{ text }}
        </li>
      </ul>
    </div>
    <el-button class="app-management__updateLog-list-item__edit" type="primary"
      >编辑</el-button
    >
    <div class="app-management__updateLog-list-item__date">
      {{ time(item?.date) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import { time } from '@/utils/time';

const props = defineProps({
  item: {
    type: Object,
  },
});

const content = computed(() => props.item?.content.split('|'));

const emit = defineEmits(['handleDelete']);

const handleDelete = (id: number) => {
  emit('handleDelete', id);
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
