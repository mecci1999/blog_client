<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue';
import AppIcon from '@/components/common/app-icon/index.vue';
import dayjs from 'dayjs';
import CommentOption from '@/components/comment/operation/index.vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  item: {
    type: Object,
  },

  parentName: {
    type: String,
  },

  showMoreComment: {
    type: Boolean,
    default: false,
  },

  handleFoldMore: {
    type: Function,
    default: () => {},
  },
});

const route = useRoute();

const postId = parseInt(`${route.params.postId}`, 10);

// 默认头像地址
const avatarImgUrl = ref('../../../../src/assets/icon/account-black-32px.svg');

const commentAvatarImgClasses = computed(() => {
  return [
    'comment-reply-list-item-avatar-img',
    {
      default:
        props.item?.avatarImgUrl.value ===
        '../../../../src/assets/icon/account-black-32px.svg',
    },
  ];
});

// 判断当前评论的作者是否为博主
const isAdmin = props.item?.userId === 1;

const showCommentOperation = ref(false);

// 显示评论栏
const handleReplyComment = () => {
  showCommentOperation.value = !showCommentOperation.value;
};
</script>

<template>
  <div class="comment-reply-list-item">
    <div class="comment-reply-list-item-avatar">
      <img
        :class="commentAvatarImgClasses"
        :src="item?.avatarImgUrl || avatarImgUrl"
      />
    </div>
    <div class="comment-reply-list-item-container">
      <div class="comment-reply-list-item-container-header">
        <div class="comment-reply-list-item-container-header-name">
          {{ item?.name }}
        </div>
        <div
          class="comment-reply-list-item-container-header-card"
          v-if="isAdmin"
        >
          博主
        </div>
        <div class="comment-reply-list-item-container-header-time">
          {{
            dayjs(item?.updated).format('YYYY-MM-DD') ||
            dayjs(item?.created).format('YYYY-MM-DD')
          }}
        </div>
        <div
          class="comment-reply-list-item-container-header-reply"
          @click.stop="handleReplyComment"
        >
          <AppIcon size="20" name="sms" />
          <span class="comment-reply-list-item-container-header-reply-amount">{{
            item?.totalReplies
          }}</span>
        </div>
      </div>
      <div class="comment-reply-list-item-container-parent">
        回复
        <span class="comment-reply-list-item-container-parent-name"
          >@{{ parentName }}</span
        >
      </div>
      <div class="comment-reply-list-item-container-content">
        <span class="comment-reply-list-item-container-content-text">
          {{ item?.content }}</span
        >
      </div>
      <div class="comment-reply-list-item-container-footer">
        <div class="comment-reply-list-item-container-footer-address">
          <i class="comment-reply-list-item-container-footer-address-icon"></i>
          {{ item?.province }}
        </div>
        <div class="comment-reply-list-item-container-footer-os">
          <i class="comment-reply-list-item-container-footer-os-icon"></i
          >{{ item?.os }}
        </div>
        <div class="comment-reply-list-item-container-footer-browser">
          <i class="comment-reply-list-item-container-footer-browser-icon"></i>
          {{ item?.browser }}
        </div>
      </div>

      <div
        class="comment-reply-list-item-more"
        v-if="item?.totalReplies > 0"
        @click="handleFoldMore(item?.id, item?.name)"
      >
        {{ showMoreComment ? '收起' : '更多' }}
      </div>
      <CommentOption
        :hiddenTitle="true"
        v-show="showCommentOperation"
        :parentId="item?.id"
        :postId="postId"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
