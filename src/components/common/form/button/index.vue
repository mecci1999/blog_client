<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ButtonField',

  props: {
    type: {
      type: String,
      default: 'primary',
    },

    loading: {
      type: Boolean,
      default: false,
    },

    text: {
      type: String,
    },
  },

  /**
   * 事件
   */
  emits: ['click'],

  setup(props, ctx) {
    const onClick = (event: any) => {
      ctx.emit('click', event);
    };

    return {
      ...props,
      onClick,
    };
  },

  components: {},
});
</script>

<template>
  <div class="button-field">
    <el-button :type="type" :loading="loading" @click="onClick">{{
      text
    }}</el-button>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
