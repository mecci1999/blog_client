<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed } from 'vue';
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
import { postAmount } from '@/api/test/index';
import TagsList from '@/components/post/tag/list/index.vue';
import AppInfo from '@/components/common/info/index.vue';
import ArchiveList from '@/components/common/archive-list/index.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AppHome',

  setup() {
    const onClickScrollDown = () => {
      document
        .getElementById('positon')
        ?.scrollIntoView({ behavior: 'smooth' });
    };

    let time = ref('');
    let date: any;
    let style = reactive({
      backgroundImage: '',
    });

    const store = useStore();
    // store.commit('type/setCurrentPostType', { id: 1, name: '我的项目' });

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

    const posts = computed(() => store.getters['post/posts']);
    const user = computed(() => store.getters['user/user']);
    const types = computed(() => store.getters['type/types']);
    const tags = computed(() => store.getters['tag/tags']);
    const info = computed(() => store.getters['dashboard/appInfo']);

    onMounted(async () => {
      date = setInterval(() => {
        time.value = getCurrnetTime();
        style.backgroundImage = changeBackgroundImageByTime(
          time.value.slice(0, 2),
        );

        clearInterval(date);
      }, 1000);
    });

    return {
      onClickScrollDown,
      user,
      posts,
      style,
      types,
      tags,
      info,
      postAmount,
    };
  },

  components: {
    NavBar,
    AppIcon,
    UserInfo,
    PostList,
    AppFooter,
    PostTabBar,
    TagsList,
    AppInfo,
    ArchiveList,
  },
});
</script>

<template>
  <div class="app-home">
    <NavBar />
    <div class="bg" :style="style">
      <div class="bg-container">
        <span class="bg-container-title">趁现在还年轻</span>
        <div class="bg-container-scroll-down" @click="onClickScrollDown">
          <AppIcon name="keyboard_arrow_down" size="32" color="#eee" />
        </div>
      </div>
    </div>
    <div id="positon"></div>
    <main id="main" class="app-main">
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
