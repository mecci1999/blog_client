<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  link: {
    type: String,
  },
  post: {
    type: Object,
  },
});

const router = useRouter();

const onClickToAbout = () => {
  router.push({ name: 'about' });
};

// 打开二维码收款页面
const showQRcode = ref(false);
const openQRcodePanel = () => {
  showQRcode.value = !showQRcode.value;
};
</script>

<template>
  <div class="post-show-footer">
    <div class="post-show-footer-info">
      <div class="post-show-footer-info__header">
        <div
          class="post-show-footer-info__header-sign"
          v-if="post?.types[0].id && post?.types[0].id == 6"
        >
          转载
        </div>
        <div class="post-show-footer-info__content">{{ post?.title }}</div>
      </div>
      <div
        class="post-show-footer-info-link"
        v-if="post?.types[0].id && post?.types[0].id == 6"
      >
        <i class="post-show-footer-info-link-icon"></i>
        <span class="post-show-footer-info__title"> 文章链接：</span>
        <a class="post-show-footer-info-link-text">{{ link }}</a>
      </div>
      <div
        class="post-show-footer-info__translate"
        v-if="post?.types[0].id && post?.types[0].id == 6"
      >
        本文是转载或翻译文章，版权归原作者所有。建议访问原文，转载本文请联系原作者。原作者以及原文信息在本文结尾标注。
      </div>
      <div class="post-show-footer-info__item" v-else>
        <div class="post-show-footer-info-author">
          <i class="post-show-footer-info-author-icon"></i>
          <span class="post-show-footer-info__title"> 文章作者：</span>
          <span
            class="post-show-footer-info-author-text"
            @click="onClickToAbout"
            >Darwin</span
          >
        </div>
        <div class="post-show-footer-info-link">
          <i class="post-show-footer-info-link-icon"></i>
          <span class="post-show-footer-info__title"> 文章链接：</span>
          <a class="post-show-footer-info-link-text">{{ link }}</a>
        </div>
        <div class="post-show-footer-info-transshipment">
          <i class="post-show-footer-info-transshipment-icon"></i>
          <span class="post-show-footer-info__title"> 版权声明：</span>
          <span class="post-show-footer-info-transshipment-text">
            本博客所有文章除特别声明外，转载时请注明来源<span
              class="post-show-footer-info-author-text"
              @click="onClickToAbout"
              >云分享</span
            >，谢谢。<router-link
              class="post-show-footer-info-transshipment-text-cc"
              :to="{ name: 'copyright' }"
              >版权协议</router-link
            >
          </span>
        </div>
      </div>
    </div>
    <div class="post-show-footer-share">
      <!-- <div class="post-show-footer-share-qq">
        <i class="post-show-footer-share-qq-icon"></i>
      </div>
      <div class="post-show-footer-share-qq-space">
        <i class="post-show-footer-share-qq-space-icon"></i>
      </div>
      <div class="post-show-footer-share-wechat">
        <i class="post-show-footer-share-wechat-icon"></i>
      </div> -->
    </div>
    <div class="post-show-footer-donate">
      <div class="post-show-footer-donate-button" @click="openQRcodePanel">
        <span class="post-show-footer-donate-text">打赏作者</span>
      </div>
      <div class="post-show-footer-donate-qrcode" v-show="showQRcode">
        <div class="post-show-footer-donate-qrcode-wx">
          <a
            class="post-show-footer-donate-qrcode-wechat"
            href="../../../../src/assets/image/wxpay.png"
            target="_blank"
          >
            <div class="post-show-footer-donate-qrcode-wechat-img"></div>
          </a>
          <span class="post-show-footer-donate-qrcode-wx-text">微信</span>
        </div>
        <div class="post-show-footer-donate-qrcode-ali">
          <a
            class="post-show-footer-donate-qrcode-alipay"
            href="../../../../src/assets/image/alipay.png"
            target="_blank"
          >
            <div class="post-show-footer-donate-qrcode-alipay-img"></div>
          </a>
          <span class="post-show-footer-donate-qrcode-ali-text">支付宝</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
