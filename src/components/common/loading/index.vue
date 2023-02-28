<template>
  <transition name="app-loading">
    <div class="app-loading">
      <div :class="['app-loading-container', theme]">
        <i :class="['app-loading-container__logo', theme]"></i>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const theme = computed(() => store.getters['theme/theme']);
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
