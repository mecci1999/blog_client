<script lang="ts">
import { isValidDatePickType } from 'element-plus/lib/utils';
import { defineComponent, onMounted, ref, watch } from 'vue';

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
  emits: ['update:modelValue', 'dirty', 'onBlur'],

  setup(props, ctx) {
    const vModel = ref('');

    const onChangeText = (event?: any, modelValue?: any) => {
      const value = event.target.value.trim() || modelValue;

      if (vModel !== value) {
        ctx.emit('dirty');
      }

      vModel.value = value;
      console.log(vModel.value);

      ctx.emit('update:modelValue', event.target.value.trim() || modelValue);
    };

    watch(vModel, (value) => {
      ctx.emit('update:modelValue', value);
    });

    const onBlur = () => {
      ctx.emit('onBlur');
    };

    return {
      ...props,
      onChangeText,
      vModel,
      onBlur,
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
      @blur="onBlur"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
