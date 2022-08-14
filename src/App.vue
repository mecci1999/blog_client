<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AppSearch from '@/components/search/index.vue';

const store = useStore();

const theme = computed(() => store.getters['theme/theme']);

const searchDialogStatus = computed(
  () => store.getters['search/searchDialogStatus'],
);
</script>

<template>
  <div :class="['blog', theme]">
    <router-view />
    <AppSearch v-if="searchDialogStatus" />
  </div>
</template>

<style lang="scss">
@import './styles/index.scss';
</style>
