<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserInfo',

  props:{
    user: {
      type: Object,
    }
  },

  setup() {
    return {}
  },

  components: {},
});
</script>

<template>
  <div class="user-info">
    <div class="user-info-avatar"></div>
    <div class="user-info-name">{{user.name}}</div>
    <div class="user-info-description">{{user.description}}</div>
    <div class="user-info-directory">
        <div class="user-info-directory-blog">
            <span class="user-info-directory-blog-title">博客</span>
            <span class="user-info-directory-blog-amount">{{user.blogAmount}}</span>
        </div>
        <div class="user-info-directory-type">
            <span class="user-info-directory-type-title">分类</span>
            <span class="user-info-directory-type-amount">{{user.typeAmount}}</span>
        </div>
        <div class="user-info-directory-tag">
            <span class="user-info-directory-tag-title">标签</span>
            <span class="user-info-directory-tag-amount">{{user.tagAmount}}</span>
        </div>
    </div>
    <div class="user-info-other">
        <a :href="user.info.github" class="user-info-other-github"></a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
