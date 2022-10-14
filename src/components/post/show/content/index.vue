<script lang="ts" setup>
import { debug } from 'console';
import { computed, defineProps, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  content: {
    type: String,
  },
});

const store = useStore();

const imgUrlList = ref([]);
const reg = /\\/g;
const str = computed(() => props.content?.replace(reg, '')) as any;

// 获取博客图片url数组
const imgUrlReg = /(?<=(img[^>]*src="))[^"]*/g;
const replaceReg = /(?=(<img[^>]*))[^>]*/;
imgUrlList.value = str.value.match(imgUrlReg);
store.commit('sidebar/setImageUrlList', imgUrlList.value);
const contentRef = ref(null) as any;

onMounted(() => {
  // 获取dom
  const imgDom = contentRef.value.getElementsByTagName('img');

  // 给每个img绑定点击事件,冒泡
  for (let i = 0; i < imgDom.length; i++) {
    imgDom[i].onclick = () => {
      store.commit('sidebar/setCurrentImageIndex', i);
      store.commit('sidebar/openImageViewer');
    };
  }
});
</script>

<template>
  <div
    id="post-show-content"
    class="post-show-content"
    v-html="str"
    ref="contentRef"
  ></div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
