<template>
  <div class="app-management__blog-list-item">
    <div class="app-management__blog-list-item__media">
      <div class="app-management__blog-list-item__media-header">
        <div class="app-management__blog-list-item__media-header__type">
          <span
            class="app-management__blog-list-item__media-header__type-item"
            v-for="type in post?.types"
            :key="type.id"
          >
            {{ type.name }}
          </span>
        </div>
        <div class="app-management__blog-list-item__media-header__tools">
          <div
            class="app-management__blog-list-item__media-header__tools-stick"
          ></div>
          <div class="app-management__blog-list-item__media-header__tools-edit">
            <el-icon><Edit /></el-icon>
          </div>
          <div
            class="app-management__blog-list-item__media-header__tools-delete"
            @click.stop="handleDelete(post?.id)"
          >
            <el-icon><Delete /></el-icon>
          </div>
        </div>
      </div>
      <img
        class="app-management__blog-list-item__media-image"
        :src="`http://${post?.bgImgUrl}`"
      />
    </div>
    <div class="app-management__blog-list-item__main">
      <span class="app-management__blog-list-item__main-title">
        {{ post?.title }}
      </span>
      <div
        :class="[
          'app-management__blog-list-item__main-button',
          { published: post?.status === 'published' },
        ]"
        @click="handlePostStatus(post?.status, post?.id)"
      >
        {{ post?.status === 'draft' ? '发布' : '取消发布' }}
      </div>
    </div>
    <div class="app-management__blog-list-item__meta">
      <div class="app-management__blog-list-item__meta-tag">
        <span
          class="app-management__blog-list-item__meta-tag-item"
          v-for="tag in post?.tags"
          :key="tag.id"
        >
          #{{ tag.name }}
        </span>
      </div>
      <div class="app-management__blog-list-item__meta-info">
        <div class="app-management__blog-list-item__meta-info__read">
          <el-icon><View /></el-icon>
          <span
            class="app-management__blog-list-item__meta-info__read-amount"
            >{{ post?.readAmount }}</span
          >
        </div>
        <div class="app-management__blog-list-item__meta-info__comment">
          <el-icon><ChatLineRound /></el-icon>
          <span
            class="app-management__blog-list-item__meta-info__comment-amount"
            >{{ post?.commentAmount }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { View, Delete, Edit, ChatLineRound } from '@element-plus/icons-vue';

const props = defineProps({
  post: {
    type: Object,
  },
});

const emit = defineEmits(['handleChangeStatus', 'handleDelete']);

const handlePostStatus = (status: string, postId: number) => {
  emit('handleChangeStatus', status, postId);
};

const handleDelete = (postId: number) => {
  emit('handleDelete', postId);
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
