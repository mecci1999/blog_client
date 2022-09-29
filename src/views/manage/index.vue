<template>
  <div class="app-management">
    <div class="app-management__aside">
      <AppMenu />
    </div>
    <div class="app-management__header"></div>
    <div class="app-management__main"></div>
  </div>
</template>

<script lang="ts" setup>
import AppMenu from '@/components/layout/menu/index.vue';
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
