<script lang="ts" setup>
import { onBeforeMount, ref, reactive, onMounted, computed } from 'vue';
import NavBar from '@/components/navBar/index.vue';
import AppIcon from '@/components/common/app-icon/index.vue';
import UserInfo from '@/components/user/info/index.vue';
import PostList from '@/components/post/list/index.vue';
import AppFooter from '@/components/footer/index.vue';
import {
  changeBackgroundImageByTime,
  getCurrnetTime,
} from '@/utils/changeBackgroundImage';
import PostTabBar from '@/components/post/tabs/index.vue';
import TagsList from '@/components/post/tag/list/index.vue';
import AppInfo from '@/components/common/info/index.vue';
// import ArchiveList from '@/components/common/archive-list/index.vue';
import MarqueeNotice from '@/components/common/marquee-notice/index.vue';
import { useStore } from 'vuex';
import {
  getAnnounceListApi,
  getIpAddressBySohuApi,
  getRealAddressByBaiduMapApi,
} from '@/api';
import {
  getSessionStroage,
  getStroage,
  setSessionStroage,
  setStroage,
} from '@/utils/localStorage';
import { apiHttpClient } from '@/utils/apiHttpClient';

const onClickScrollDown = () => {
  document.getElementById('positon')?.scrollIntoView({ behavior: 'smooth' });
};

let time = ref('');
let date: any;
let style = reactive({
  backgroundImage: '',
});

const store = useStore();
// store.commit('type/setCurrentPostType', { id: 1, name: '我的项目' });

// 公告列表
const announceList = ref([]);

// 获取ip地址
store.dispatch('app/getIpAddressAction');

//获取博客列表
store.commit('post/setQueryString', '');
store.commit('post/setNextPage', 1);
store.dispatch('post/getPosts');

// 获取博主信息接口
store.dispatch('user/getUser');

// 获取网站信息接口
store.dispatch('dashboard/getAppInfo');

/**
 * 获取分类列表
 */
store.dispatch('type/getPostTypes');

// 获取标签列表
store.dispatch('tag/getPostTags');

const imgUrl = ref('');

const posts = computed(() => store.getters['post/posts']);
const user = computed(() => store.getters['user/user']);
const types = computed(() => store.getters['type/types']);
const tags = computed(() => store.getters['tag/tags']);
const info = computed(() => store.getters['dashboard/appInfo']);

onBeforeMount(async () => {
  // 获取公告
  store.commit('app/setLoading', true);
  try {
    const res = await getAnnounceListApi();
    announceList.value = res.data;

    // store.commit('app/setLoading', false);
  } catch (error) {
    console.log(error);
    store.commit('app/setLoading', false);
  }

  // 拿到当前时间段的壁纸
  date = setInterval(() => {
    time.value = getCurrnetTime();
    imgUrl.value = changeBackgroundImageByTime(time.value.slice(0, 2));

    clearInterval(date);
  }, 1000);

  store.commit('app/setLoading', false);
});

onMounted(async () => {
  // 发送百度地图API请求获取真实地址，存储到LocalSession中
  // 发送一条sohu请求得到IP地址，存储到Session中，并封装到请求头部中
  const address = getStroage('address');
  if (!address) {
    try {
      const res = await getRealAddressByBaiduMapApi(getSessionStroage('ip'));

      const province = res.data.content.address_detail.province;
      const city = res.data.content.address_detail.city;

      // 存储到sessionStorage中
      setStroage('address', { province: province, city: city });

      // 封装到请求头部中
    } catch (error) {
      console.log(error);
    }
  }
});
</script>

<template>
  <div class="app-home">
    <NavBar />
    <div
      :class="[
        'bg',
        {
          image_4_6: imgUrl === 'image_4_6',
          image_6_8: imgUrl === 'image_6_8',
          image_8_16: imgUrl === 'image_8_16',
          image_16_18: imgUrl === 'image_16_18',
          image_18_20: imgUrl === 'image_18_20',
          image_20_24: imgUrl === 'image_20_24',
          image_24_4: imgUrl === 'image_24_4',
        },
      ]"
    >
      <div class="bg-container">
        <span class="bg-container-title">趁现在还年轻</span>
        <div class="bg-container-scroll-down" @click="onClickScrollDown">
          <AppIcon name="keyboard_arrow_down" size="32" color="#eee" />
        </div>
      </div>
    </div>
    <div id="positon"></div>
    <main id="main" class="app-main">
      <MarqueeNotice :item="announceList[0]" />
      <div class="app-main-container">
        <div class="app-main-container-left">
          <UserInfo :user="user" />
          <TagsList :tags="tags" />
          <!-- <ArchiveList :items="postAmount" /> -->
          <AppInfo :item="info" />
        </div>
        <div class="app-main-container-right">
          <PostTabBar :types="types" />
          <PostList :posts="posts" />
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
