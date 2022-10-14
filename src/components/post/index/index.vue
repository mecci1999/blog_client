<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { PostDataType } from '@/types/interface';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Picture } from '@element-plus/icons-vue';

const props = defineProps({
  posts: {
    type: Array<PostDataType>,
  },
  title: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

const router = useRouter();
const store = useStore();

const onClickJumpPost = (id: any) => {
  router.push({ name: 'postShow', params: { postId: id } });
};

const onClickChangeTag = (id: any) => {
  // 当前标签
  router.push({ name: 'postTags', params: { tagId: id } });
};

// 提示相关文案
const commentTipText = computed(() =>
  props.posts?.length !== 0 ? '已经到底啦~' : '抱歉，没有找到相关内容~',
);
</script>

<template>
  <div class="post-index">
    <div class="post-index-title">
      {{ title }}<span v-if="amount">{{ amount }}</span>
    </div>
    <div class="post-index-list">
      <div
        class="post-index-list-item"
        v-for="post in (posts as any)"
        :key="post.id"
      >
        <div
          class="post-index-list-item-media"
          @click.stop="onClickJumpPost(post?.id)"
        >
          <el-image
            style="width: 100%; height: 100%"
            :src="`http://${post?.bgImgUrl}`"
            fit="cover"
          >
            <template #error>
              <div class="image-slot">
                <el-icon><Picture /></el-icon>
              </div>
            </template>
          </el-image>
          <!-- <img
            class="post-index-list-item-media-img"
            :src="`http://${post.bgImgUrl}`"
          /> -->
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
              #<span class="post-index-list-item-info-tags-item-name">
                {{ tag?.name }} </span
              >#
            </div>
          </div>
          <div class="post-index-list-item-info-date">
            {{ post.updated.split(' ')[0] }}
          </div>
        </div>
      </div>
      <div
        class="post-index-list-bottom-tip"
        v-if="posts?.length && posts?.length <= 12"
      >
        <span class="post-index-list-bottom-tip-text">{{
          commentTipText
        }}</span>
      </div>
      <div class="post-index-list-bottom-empty" v-else>
        <span class="post-index-list-bottom-tip-text">{{
          commentTipText
        }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './index.scss';
</style>
