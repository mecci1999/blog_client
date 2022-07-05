<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'InputField',

  props: {
    modelValue: {
      type: String,
    },

    type: {
      type: String,
      default: 'text',
    },

    placeholder: {
      type: String,
    },
  },

  /**
   * 事件
   */
  emits: ['update:modelValue', 'dirty'],

  setup(props, ctx) {
    const vModel = ref(props.modelValue);

    const onChangeText = (event: any) => {
      const value = event.target.value.trim();

      if (vModel !== value) {
        ctx.emit('dirty');
      }

      vModel.value = value;

      ctx.emit('update:modelValue', event.target.value.trim());
    };

    return {
      ...props,
      onChangeText,
      vModel,
    };
  },

  components: {},
});
</script>

<template>
  <div class="input-field">
    <input
      class="input text"
      :type="type"
      :value="vModel"
      :placeholder="placeholder"
      @input="onChangeText"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
