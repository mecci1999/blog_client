<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  name: {
    type: String,
  },

  color: {
    type: String,
  },

  size: {
    type: [String, Number],
    default: 16,
  },
});

const store = useStore();

// 主题
const theme = computed(() => store.getters['theme/theme']);
const appIconStyles = computed(() => {
  let color: string;

  if (props.color) {
    color = props.color;
  } else {
    color = theme.value === 'dark' ? '#ffffff' : '#000000';
  }

  return {
    color,
    fontSize: props.size + 'px',
    width: props.size + 'px',
  };
});
</script>

<template>
  <i class="app-icon" :style="appIconStyles">{{ name }}</i>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
