<script lang="ts" setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  content: {
    type: String,
  },
});

const reg = /\\/g;
const str = computed(() => props.content?.replace(reg, ''));
</script>

<template>
  <div id="post-show-content" class="post-show-content" v-html="str"></div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
