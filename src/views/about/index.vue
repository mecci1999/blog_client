<script lang="ts">
import { defineComponent, onMounted, ref, reactive, computed } from 'vue';
import {
  getCurrnetTime,
  changeBackgroundImageByTime,
} from '../../utils/changeBackgroundImage';
import NavBar from '@/components/navBar/index.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AppAbout',

  setup() {
    let time = ref('');
    let date: any;
    let style = reactive({
      backgroundImage: '',
    });

    const store = useStore();
    // 获取用户信息
    const getUser = async () => {
      await store.dispatch('user/getUser');
    };

    let name = ref('');
    let introduction = ref('');
    let info = reactive({
      github: '',
      qq: '',
      wechat: '',
      eMail: '',
    });

    onMounted(async () => {
      //   await getUser();

      //   const user = computed(() => store.getters['user/user']);

      //   name.value = user.value.name;
      //   introduction.value = user.value.introduction;
      //   info.github = user.value.info.github;
      //   info.qq = user.value.info.qq;
      //   info.wechat = user.value.info.wx;
      //   info.eMail = user.value.info.eMail;
      name.value = 'Mecci';
      introduction.value = '趁现在还年轻';

      date = setInterval(() => {
        time.value = getCurrnetTime();
        style.backgroundImage = changeBackgroundImageByTime(
          time.value.slice(0, 2),
        );

        clearInterval(date);
      }, 1000);
    });

    return {
      time,
      style,
      name,
      introduction,
      info,
    };
  },

  components: {
    NavBar,
  },
});
</script>

<template>
  <div class="app-about" :style="style">
    <header class="app-about-header"><NavBar /></header>
    <div class="app-about-container">
      <div class="app-about-container-title">关于</div>
      <div class="app-about-container-description">
        纸上得来终觉浅，绝知此事要躬行。
      </div>
      <div class="app-about-container-content">
        <div class="app-about-container-content-avatar"></div>
        <div class="app-about-container-content-name">
          {{ name }}
        </div>
        <div class="app-about-container-content-introduction">
          {{ introduction }}
        </div>
        <div class="app-about-container-content-info">
          <el-tooltip
            effect="dark"
            placement="top"
            content="查看我的github仓库"
          >
            <a
              :href="info.github"
              class="app-about-container-content-info-github"
              target="_blank"
            >
              <i class="app-about-container-content-info-github-icon"></i>
            </a>
          </el-tooltip>
          <el-tooltip effect="dark" placement="top" content="QQ: 664751829">
            <a
              :href="info.qq"
              class="app-about-container-content-info-qq"
              target="_blank"
            >
              <i class="app-about-container-content-info-qq-icon"></i>
            </a>
          </el-tooltip>
          <el-tooltip effect="dark" placement="top" content="微信号: mecci1999">
            <a
              :href="info.wechat"
              class="app-about-container-content-info-wechat"
              target="_blank"
            >
              <i class="app-about-container-content-info-wechat-icon"></i>
            </a>
          </el-tooltip>
          <el-tooltip
            effect="dark"
            placement="top"
            content="邮箱地址: mecci1999@163.com"
          >
            <div class="app-about-container-content-info-email" title="email">
              <AppIcon
                name="email"
                size="32"
                color="var(--secondary-text-color)"
              />
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
