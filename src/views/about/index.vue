<script lang="ts">
import { defineComponent, onMounted, ref, reactive, computed } from 'vue';
import NavBar from '@/components/navBar/index.vue';
import { useStore } from 'vuex';
import AppFooter from '@/components/footer/index.vue';
import { websiteInfo, updatedLog, adwardInfo } from '@/api/test/index';
import TimeLine from '@/components/common/time-line/index.vue';
// import TableField from '@/components/common/form/table/index.vue';

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

    // onMounted(async () => {

    // });

    return {
      time,
      style,
      name,
      introduction,
      info,
      websiteInfo,
      updatedLog,
      adwardInfo,
    };
  },

  components: {
    NavBar,
    AppFooter,
    TimeLine,
    // TableField,
  },
});
</script>

<template>
  <div class="app-about">
    <NavBar />
    <div class="app-about-title">
      <h2 class="app-about-title-header">
        源于
        <br />
        喜欢<span>分享</span>而创造
      </h2>
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
        <p>
          创建这个网站没有什么特别的原因，就是想要有一个自己能够积累知识和技术沉淀的地方。如果能够帮助到更多的初学者解决问题，学到新知识，那博主就心满意足了。
        </p>
        <p>
          博主也不是技术大牛，也是刚入行不久，在这里会分享一些总结的干货和工作经验。除了技术上的分享，同时我也会分享一些生活中遇到的趣事和感想。
        </p>
        <p>
          如果你因为机缘巧合来到这里，我希望这里能够给你带来一些收获和惊喜。
        </p>
        <p>
          最后分享一句话，世界上只有一种真正的英雄主义，那就是在认请生活的真相后依然热爱生活。
        </p>
      </div>
      <div class="app-about-container-announcement">
        <div class="app-about-container-announcement-title">网站公告</div>
        <TimeLine :items="websiteInfo" />
      </div>
      <div class="app-about-container-log">
        <div class="app-about-container-log-title">更新日志</div>
        <TimeLine :items="updatedLog" />
      </div>
      <div class="app-about-container-adward">
        <div class="app-about-container-adward-title">好心人名单</div>
        <div class="app-about-container-adward-description">
          在这里特别鸣谢下面这些好心人，正是因为有了你们的资助，让我感受到我写的博客能够给你们带来价值，
          也让我有了信心接着在这条路上越走越远，最后再次衷心的感谢你们。
        </div>
        <div class="app-about-container-adward-table">
          <el-table :data="adwardInfo" border style="width: 100%">
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="name" label="昵称" />
            <el-table-column prop="amount" label="金额" />
          </el-table>
        </div>
      </div>
      <div class="app-about-container-author">
        <div class="app-about-container-author-title">关于博主</div>
        <div class="app-about-container-author-description">
          性别男、99年、可以吃辣但不太喜欢吃辣的江西人。目前在深圳某互联网公司从事前端开发工作。爱好足球和摄影，喜欢记录生活中有意思的事物。
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
