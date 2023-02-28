<script lang="ts" setup>
import { onMounted, ref, reactive, computed } from 'vue';
import NavBar from '@/components/navBar/index.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AppFooter from '@/components/footer/index.vue';
import {
  getRewardListApi,
  getAnnounceListApi,
  getUpdateLogListApi,
} from '@/api/index';
import TimeLine from '@/components/common/time-line/index.vue';
import { getAppDays, getCurrentDays } from '@/utils/getAppDays';
import { time } from '@/utils/time';
import { ElMessage } from 'element-plus';

const store = useStore();
const router = useRouter();
// 获取用户信息
const getUser = async () => {
  await store.dispatch('user/getUser');
};

let info = reactive({
  github: '',
  qq: '',
  wechat: '',
  eMail: '',
});

// 捐赠者名单
const rewardList = ref([]) as any;

// 网站公告
const announceList = ref([]) as any;

// 更新日志
const updateLogList = ref([]) as any;

// 问题弹窗
const cakeDialog = ref(false);

const form = reactive({
  date: '',
});

// 打开弹窗
const openDialog = () => {
  cakeDialog.value = true;
};

// 跳转至生日礼物页面
const handleJumpToGift = () => {
  if (form.date === '128') {
    cakeDialog.value = false;
    router.push({ name: 'gift' });
  } else {
    cakeDialog.value = false;
    ElMessage.error('抱歉，这份礼物不属于你！');
  }
  form.date = '';
};

// 更新日志
const data = computed(() => store.getters['dashboard/appInfo']);

const day = getCurrentDays();

const days = Math.floor(getAppDays(day));

// 捐赠者名单更新时间
const updateDate = computed(() => rewardList.value[0].date);

onMounted(async () => {
  window.scrollTo({ top: 0 });

  // 获取捐赠者名单
  try {
    const res1 = await getAnnounceListApi();
    const res2 = await getUpdateLogListApi();
    const res3 = await getRewardListApi();
    announceList.value = res1.data;
    updateLogList.value = res2.data;
    rewardList.value = res3.data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="app-about">
    <NavBar />
    <el-dialog v-model="cakeDialog" title="密码" width="50%">
      <el-input v-model="form.date" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cakeDialog = false">取消</el-button>
          <el-button type="primary" @click="handleJumpToGift"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <div class="app-about-main">
      <div class="app-about-header">
        <div class="app-about-header__title">关于本站</div>
        <!-- <div class="app-about-header__cake" @click="openDialog">
          <i class="app-about-header__cake-icon"></i>
        </div> -->
      </div>
      <div class="app-about-content">
        <div class="app-about-author">
          <div class="title1">你好，很高兴在这遇见你</div>
          <div class="title2">我是 <span class="inline-word">Darwin</span></div>
          <div class="title1">
            是一名 前端开发工程师、独立开发者、<span class="inline-word"
              >博主</span
            >
          </div>
        </div>
        <div class="app-about-info">
          <div class="app-about-tip">追求</div>
          <h2 class="app-about-title-header">
            源于
            <br />
            喜欢<span>分享</span>而创造
          </h2>
        </div>
      </div>
      <div class="app-about-title">
        <div class="app-about-tip">介绍</div>
        <div class="app-about-title-description">
          在这里你可以了解<span class="app-about-title-description-coding"
            >技术</span
          >、<span class="app-about-title-description-item">项目</span> 、<span
            class="app-about-title-description-ideal"
            >个人感想</span
          >等。
          <br />
          我会分享一些我觉得有意思的东西，希望大家喜欢。
        </div>
      </div>
      <div class="app-about-container">
        <div class="app-about-container-text">
          <div class="app-about-tip">初心</div>
          <span class="app-about-container-text-title">为什么建站?</span>
          <p>
            创建这个网站没有什么特别的原因，就是想要有一个自己能够<b>积累知识</b>和<b>技术沉淀</b>的地方。如果能够帮助到更多的初学者解决问题，学到新知识，那博主就心满意足了。
          </p>
          <p>
            博主也不是技术大牛，也是刚入行不久，在这里会分享一些总结的<b>干货</b>和<b>工作经验</b>。除了技术上的分享，同时我也会分享一些生活中遇到的<b>趣事</b>和<b>感想</b>。
          </p>
          <p>
            如果你因为机缘巧合来到这里，我希望这里能够给你带来一些<b>收获</b>和<b>惊喜</b>。
          </p>
          <p>
            最后分享一句话，<b
              >世界上只有一种真正的英雄主义，那就是在认请生活的真相后依然热爱生活。</b
            >
          </p>
        </div>
        <div
          class="app-about-container-announcement"
          v-if="announceList.length >= 1"
        >
          <div class="app-about-tip">网站公告</div>
          <TimeLine :items="announceList" />
        </div>
        <div class="app-about-container-log" v-if="updateLogList.length >= 1">
          <div class="app-about-tip">更新日志</div>
          <TimeLine :items="updateLogList" :updatelog="true" />
        </div>
        <div class="app-about-container-adward" v-if="rewardList.length >= 1">
          <div class="app-about-tip">致谢</div>
          <span class="app-about-container-adward-title">好心人名单</span>
          <div class="app-about-container-adward-description">
            在这里特别鸣谢下面这些好心人，正是因为有了你们的资助，让我感受到我写的博客能够给你们带来价值，
            也让我有了信心接着在这条路上越走越远，最后再次衷心的感谢你们。
          </div>
          <div class="app-about-container-adward-list">
            <div
              class="app-about-container-adward-list-item"
              v-for="item in (rewardList as any)"
              :key="item?.id"
            >
              <div class="app-about-container-adward-list-item__name">
                {{ item.name }}
              </div>
              <div class="app-about-container-adward-list-item__bottom">
                <div
                  :class="[
                    'app-about-container-adward-list-item__bottom-money',
                    { vip: parseInt(item.amount.split('¥')[1], 10) >= 50 },
                  ]"
                >
                  {{ item.amount }}
                </div>
                <div class="app-about-container-adward-list-item__bottom-time">
                  {{ time(item?.date) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="app-about-container-data">
          <div class="app-about-container-data__container">
            <div class="app-about-tip">数据</div>
            <span class="app-about-container-data-title">网站数据</span>
            <div class="app-about-container-data__main">
              <div class="app-about-container-data__main-item">
                <span class="app-about-container-data__main-item-title"
                  >文章总数</span
                >
                <span class="app-about-container-data__main-item-amount">{{
                  data?.postAmount
                }}</span>
              </div>
              <div class="app-about-container-data__main-item">
                <span class="app-about-container-data__main-item-title"
                  >文章总字数</span
                >
                <span class="app-about-container-data__main-item-amount">{{
                  data?.wordAmount
                }}</span>
              </div>
              <div class="app-about-container-data__main-item">
                <span class="app-about-container-data__main-item-title"
                  >今日访问量</span
                >
                <span class="app-about-container-data__main-item-amount">{{
                  data?.todayAccessAmount
                }}</span>
              </div>
              <div class="app-about-container-data__main-item">
                <span class="app-about-container-data__main-item-title"
                  >总访问量</span
                >
                <span class="app-about-container-data__main-item-amount">{{
                  data?.accessAmount
                }}</span>
              </div>
              <div class="app-about-container-data__main-item">
                <span class="app-about-container-data__main-item-title"
                  >建站天数</span
                >
                <span class="app-about-container-data__main-item-amount">{{
                  days
                }}</span>
              </div>
            </div>
            <div class="app-about-container-data__main-item">
              <span class="app-about-container-data__main-item-title"
                >上次更新时间</span
              >
              <span class="app-about-container-data__main-item-amount">{{
                time(data?.updateTime)
              }}</span>
            </div>
          </div>
        </div>
        <!-- <div class="app-about-container-author">
          <div class="app-about-container-author-title">关于博主</div>
          <div class="app-about-container-author-description">
            性别男、99年、可以吃辣但不太喜欢吃辣的江西人。目前在深圳某互联网公司从事前端开发工作。爱好足球和摄影，喜欢记录生活中有意思的事物。
          </div>
        </div> -->
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
