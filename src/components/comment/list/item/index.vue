<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue';
import AppIcon from '@/components/common/app-icon/index.vue';
import CommentReply from '../../reply/index.vue';
import CommentOption from '../../operation/index.vue';
import { useRoute } from 'vue-router';
import { useComment } from '../../hooks/useComment';
import { time } from '@/utils/time';

const props = defineProps({
  item: {
    type: Object,
  },
});

const route = useRoute();

const { showMoreComment, list, parentName, handleFoldMore } = useComment();

const postId = parseInt(`${route.params.postId}`, 10);

// 判断当前评论的作者是否为博主
const isAdmin = props.item?.userId === 1;

const showCommentOperation = ref(false);

// 显示评论栏
const handleReplyComment = () => {
  showCommentOperation.value = !showCommentOperation.value;
};
</script>

<template>
  <div class="comment-list-item">
    <div class="comment-list-item-avatar">
      <img
        v-if="item?.avatarImgUrl !== ''"
        class="comment-list-item-avatar-img"
        :src="item?.avatarImgUrl"
      />
      <div v-else :class="['comment-list-item-avatar-img', 'default']"></div>
    </div>
    <div class="comment-list-item-container">
      <div class="comment-list-item-container-header">
        <div class="comment-list-item-container-header-name">
          {{ item?.name }}
        </div>
        <div class="comment-list-item-container-header-card" v-if="isAdmin">
          博主
        </div>
        <div class="comment-list-item-container-header-time">
          {{ time(item?.updated) || time(item?.created) }}
        </div>
        <div
          class="comment-list-item-container-header-reply"
          @click.stop="handleReplyComment"
        >
          <AppIcon size="20" name="sms" />
          <span class="comment-list-item-container-header-reply-amount">{{
            item?.totalReplies
          }}</span>
        </div>
      </div>
      <div class="comment-list-item-container-content">
        <span class="comment-list-item-container-content-text">
          {{ item?.content }}</span
        >
      </div>
      <div class="comment-list-item-container-footer">
        <div class="comment-list-item-container-footer-address">
          <i class="comment-list-item-container-footer-address-icon"></i>
          {{ item?.province }}
        </div>
        <div class="comment-list-item-container-footer-os">
          <i class="comment-list-item-container-footer-os-icon"></i
          >{{ item?.os }}
        </div>
        <div class="comment-list-item-container-footer-browser">
          <i class="comment-list-item-container-footer-browser-icon"></i>
          {{ item?.browser }}
        </div>
      </div>
      <CommentReply
        :reply="item?.replyCommentList"
        :parentName="item?.name"
        :showMoreComment="showMoreComment"
        :handleFoldMore="handleFoldMore"
      />
      <CommentReply
        :reply="list"
        v-show="showMoreComment"
        :parentName="parentName"
        :showMoreComment="showMoreComment"
        :handleFoldMore="handleFoldMore"
      />
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
