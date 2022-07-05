<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputField from '@/components/common/form/input/index.vue';

export default defineComponent({
  name: 'CommnetOperation',

  setup() {
    const name = ref('');
    const email = ref('');

    return {
      name,
      email,
    };
  },

  components: {
    InputField,
  },
});
</script>

<template>
  <div class="comment-operation">
    <div class="comment-operation-title">
      <i class="comment-operation-title-icon"></i>
      <span class="comment-operation-title-text">写评论</span>
    </div>
    <div class="comment-operation-form">
      <div class="comment-operation-form-header">
        <div class="comment-operation-form-header-avatar"></div>
        <div class="comment-operation-form-header-input">
          <InputField placeholder="昵称/QQ号(必填)" v-model="name" />
          <InputField placeholder="邮箱(必填)" v-model="email" />
        </div>
      </div>
      <div class="comment-operation-form-main"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
