<script lang="ts" setup>
import { defineProps } from 'vue';
import { PostDataType } from '@/types/interface'
import { useRouter } from 'vue-router'
import {useStore} from 'vuex';

  const props = defineProps({
    posts:{
      type: Array<PostDataType>
    },
    title: {
      type:String
    }
  })

  const router = useRouter();
  const store = useStore();

  const onClickJumpPost = (id:any) => {
    router.push({name: 'postShow', params: {postId: id}})
  }

  const onClickChangeTag = (id:any) => {
    store.commit('post/setCurrentPostTagId', id);
    router.replace({name: 'postTags', params: {tagId: id}})
  }
</script>

<template>
  <div class="post-index">
    <div class="post-index-title">{{ title }}</div>
    <div class="post-index-list">
      <div class="post-index-list-item" v-for="post in posts" :key="post.id">
        <div
          class="post-index-list-item-media"
          @click.stop="onClickJumpPost(post?.id)"
        >
          <img class="post-index-list-item-media-img" :src="post.bgImgUrl" />
        </div>
        <div class="post-index-list-item-info">
          <div
            class="post-index-list-item-info-title"
            @click.stop="onClickJumpPost(post?.id)"
          >
            {{ post.title }}
          </div>
          <div class="post-index-list-item-info-tags">
            <div
              class="post-index-list-item-info-tags-item"
              v-for="tag in post.tags"
              :key="tag?.id"
              @click.stop="onClickChangeTag(tag?.id)"
            >
              #{{ tag?.name }}
            </div>
          </div>
          <div class="post-index-list-item-info-date">{{ post.updated }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>