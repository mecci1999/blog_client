<template>
  <div class="app-management__comment-list">
    <div
      class="app-management__comment-list-item"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="app-management__comment-list-item__content">
        <span class="app-management__comment-list-item__content-text">{{
          comment.content
        }}</span>
        <div
          class="app-management__comment-list-item__content-reply"
          v-if="comment.isReplyComment"
        >
          回复:{{ comment.isReplyComment }}
        </div>
      </div>
      <div class="app-management__comment-list-item__info">
        <div class="app-management__comment-list-item__info-avatar">
          <img
            class="app-management__comment-list-item__info-avatar-image"
            :src="comment.avatarImgUrl"
          />
        </div>
        <div class="app-management__comment-list-item__info-content">
          <div class="app-management__comment-list-item__info-name">
            {{ comment.name }}
          </div>
          <div class="app-management__comment-list-item__info-email">
            {{ comment.eMail }}
          </div>
        </div>
      </div>
      <div class="app-management__comment-list-item__main">
        <div
          :class="[
            'app-management__comment-list-item__main-button',
            'approved',
          ]"
          v-if="comment.status === 'pending' || comment.status === 'denied'"
          @click="handleApproved(comment.id)"
        >
          通过
        </div>
        <div
          :class="['app-management__comment-list-item__main-button', 'denied']"
          v-if="comment.status === 'pending' || comment.status === 'approved'"
          @click="handleDenied(comment.id)"
        >
          驳回
        </div>
        <div class="app-management__comment-list-item__main-link">
          <router-link :to="{ path: `/posts/${comment.post.id}` }"
            >查看博客</router-link
          >
        </div>
      </div>
      <div class="app-management__comment-list-item__meta">
        <div class="app-management__comment-list-item__meta-provice">
          {{ comment.province }}
        </div>
        <div class="app-management__comment-list-item__meta-os">
          {{ comment.os }}
        </div>
        <div class="app-management__comment-list-item__meta-browser">
          {{ comment.browser }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  comments: {
    type: Object,
    default: [],
  },
});

const emit = defineEmits(['handleApproved', 'handleDenied']);

const handleApproved = (id: number) => {
  emit('handleApproved', id);
};

const handleDenied = (id: number) => {
  emit('handleDenied', id);
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
