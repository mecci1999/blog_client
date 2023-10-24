<script lang="ts" setup>
import { onBeforeMount } from 'vue';
</script>

<template>
  <div class="app-header">
    <div class="app-header__logo">
      <i></i>
    </div>
    <div class="app-header__title">顺丰FE</div>
    <div class="app-header__nav">
      <div class="app-header__nav-icon">
        <i></i>
      </div>
      <div class="app-header__nav-text">资源网站导航</div>
    </div>
    <div class="app-header__about">
      <div class="app-header__about-icon">
        <i></i>
      </div>
      <div class="app-header__about-text">关于我们</div>
    </div>
    <div class="app-header__avatar"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
