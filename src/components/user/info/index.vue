<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import AppIcon from '../../../components/common/app-icon/index.vue';
import { ElTooltip } from 'element-plus';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const props = defineProps({
  user: {
    type: Object,
  },
});

const router = useRouter();
const store = useStore();

const userAvatarSource = computed(() => {
  let avatarSource;

  if (props.user && props.user.avatar) {
    avatarSource = `http://api.darwin.fun/users/1/avatar`;
  } else {
    avatarSource = '../../../src/assets/icon/account-black-32px.svg';
  }

  return avatarSource;
});

// 跳转文章列表
const handleJumpToArticle = () => {
  router.push({ name: 'postArticle' });
  store.commit('sidebar/closeSidebarMenu');
};

// 跳转分类
const handleJumpToCategory = () => {
  router.push({ name: 'postCategory', params: { typeId: 1 } });
  store.commit('sidebar/closeSidebarMenu');
};

// 跳转标签
const handleJumpToTag = () => {
  router.push({ name: 'postTags', params: { tagId: 1 } });
  store.commit('sidebar/closeSidebarMenu');
};
</script>

<template>
  <div class="user-info">
    <div class="user-info-avatar">
      <img class="user-info-avatar-img" :src="userAvatarSource" />
    </div>
    <div class="user-info-name">{{ user?.name }}</div>
    <div class="user-info-description">{{ user?.introduction }}</div>
    <div class="user-info-directory">
      <div class="user-info-directory-blog" @click.stop="handleJumpToArticle">
        <span class="user-info-directory-blog-title">文章</span>
        <span class="user-info-directory-blog-amount">{{
          user?.blogAmount
        }}</span>
      </div>
      <div class="user-info-directory-type" @click.stop="handleJumpToCategory">
        <span class="user-info-directory-type-title">分类</span>
        <span class="user-info-directory-type-amount">{{
          user?.typeAmount
        }}</span>
      </div>
      <div class="user-info-directory-tag" @click.stop="handleJumpToTag">
        <span class="user-info-directory-tag-title">标签</span>
        <span class="user-info-directory-tag-amount">{{
          user?.tagAmount
        }}</span>
      </div>
    </div>
    <div class="user-info-other">
      <el-tooltip effect="dark" placement="top" content="查看我的github仓库">
        <a
          :href="`https://${user?.info.github}`"
          class="user-info-other-github"
          target="_blank"
        >
          <i class="user-info-other-github-icon"></i>
        </a>
      </el-tooltip>
      <el-tooltip effect="dark" placement="top" content="QQ: 664751829">
        <a
          :href="`tencent://message/?uin=${user?.info.qq}`"
          class="user-info-other-qq"
          target="_blank"
        >
          <i class="user-info-other-qq-icon"></i>
        </a>
      </el-tooltip>
      <el-tooltip effect="dark" placement="top" content="微信号: mecci1999">
        <a
          :href="user?.info.wechat"
          class="user-info-other-wechat"
          target="_blank"
        >
          <i class="user-info-other-wechat-icon"></i>
        </a>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        placement="top"
        content="邮箱地址: mecci1999@163.com"
      >
        <div class="user-info-other-email" title="email">
          <AppIcon name="email" size="32" color="var(--secondary-text-color)" />
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
