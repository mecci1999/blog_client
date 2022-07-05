<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PostShowFooter',

  props: {
    link: {
      type: String,
    },
  },

  setup() {
    const router = useRouter();

    const onClickToAbout = () => {
      router.push({ name: 'about' });
    };

    return {
      onClickToAbout,
    };
  },

  components: {},
});
</script>

<template>
  <div class="post-show-footer">
    <div class="post-show-footer-info">
      <div class="post-show-footer-info-author">
        <i class="post-show-footer-info-author-icon"></i>
        文章作者：
        <span class="post-show-footer-info-author-text" @click="onClickToAbout"
          >Mecci</span
        >
      </div>
      <div class="post-show-footer-info-link">
        <i class="post-show-footer-info-link-icon"></i>
        文章链接：<a class="post-show-footer-info-link-text">{{ link }}</a>
      </div>
      <div class="post-show-footer-info-transshipment">
        <i class="post-show-footer-info-transshipment-icon"></i>
        版权声明：<span class="post-show-footer-info-transshipment-text">
          本博客所有文章除特别声明外，转载时请注明来源<span
            class="post-show-footer-info-author-text"
            @click="onClickToAbout"
            >Mecci</span
          >，谢谢。
        </span>
      </div>
    </div>
    <div class="post-show-footer-share">
      <div class="post-show-footer-share-qq">
        <i class="post-show-footer-share-qq-icon"></i>
      </div>
      <div class="post-show-footer-share-qq-space">
        <i class="post-show-footer-share-qq-space-icon"></i>
      </div>
      <div class="post-show-footer-share-wechat">
        <i class="post-show-footer-share-wechat-icon"></i>
      </div>
    </div>
    <div class="post-show-footer-donate">
      <div class="post-show-footer-donate-button">
        <span class="post-show-footer-donate-text">赏</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
