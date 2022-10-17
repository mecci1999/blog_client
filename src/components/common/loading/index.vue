<template>
  <transition name="app-loading">
    <div class="app-loading" v-if="loading">
      <div class="app-loading-container">页面加载中...</div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const loading = computed(() => store.getters['app/loading']);
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
