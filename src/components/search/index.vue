<script lang="ts" setup>
import { useStore } from 'vuex';
import AppIcon from '../common/app-icon/index.vue';
import { useRouter } from 'vue-router';
import { useSearch } from './hooks/useSearch';
import { highLight } from '@/utils/highlight';

const store = useStore();
const router = useRouter();

const {
  keyword,
  isShowHistory,
  historyList,
  resultList,
  showEmptyText,
  onSearch,
  deleteOneRecord,
  jumpToDetail,
  onClickHistoryItem,
} = useSearch();

const onClickCloseSearchDialog = () =>
  store.commit('search/changeSearchDialogStatus');

// 点击搜索内容跳转到对应博客
const onClickJumpToPost = (id: number) => {
  jumpToDetail(id);
  store.commit('search/changeSearchDialogStatus');
};
</script>

<template>
  <div class="app-search">
    <div class="app-search-dialog">
      <div class="app-search-dialog-header">
        <div class="app-search-dialog-header-title">搜索</div>
        <div
          class="app-search-dialog-header-button"
          @click.stop="onClickCloseSearchDialog"
        >
          <AppIcon name="clear" size="24" />
        </div>
      </div>
      <div class="app-search-dialog-panel">
        <div class="app-search-dialog-panel-input">
          <div class="app-search-dialog-panel-input-box">
            <el-input
              v-model="keyword"
              placeholder="输入关键词快速查找"
              @change="onSearch"
            />
          </div>
        </div>
      </div>
      <div class="app-search-dialog-search-result">
        <div
          class="app-search-dialog-search-result-hits"
          v-show="resultList.length > 0"
        >
          <div
            class="app-search-dialog-search-result-hits-item"
            v-for="item in resultList"
            :key="item.postId"
            @click="onClickJumpToPost(item.postId)"
          >
            <div
              class="app-search-dialog-search-result-hits-item-link"
              v-html="highLight(item.title, keyword)"
            ></div>
          </div>
        </div>
        <!-- <div class="app-search-dialog-search-result-pagination"></div> -->
        <div
          class="app-search-dialog-search-result-status"
          v-show="resultList.length > 0"
        >
          找到 {{ resultList.length }} 条结果
        </div>
        <div
          class="app-search-dialog-search-result-empty"
          v-show="showEmptyText"
        >
          抱歉，没有找到相关文章
        </div>
      </div>
      <div
        class="app-search-dialog-search-history"
        v-show="
          historyList.length > 0 &&
          !isShowHistory &&
          resultList.length === 0 &&
          !showEmptyText
        "
      >
        <div
          class="app-search-dialog-search-history-item"
          v-for="(item, index) in historyList"
          :key="index"
          @click="onClickHistoryItem(item)"
        >
          <span class="app-search-dialog-search-history-item-text">{{
            item
          }}</span>
          <div
            class="app-search-dialog-search-history-item-close"
            @click.stop="deleteOneRecord(item)"
          >
            <AppIcon name="clear" size="16" />
          </div>
        </div>
        <div
          class="app-search-dialog-search-history-tip"
          v-show="
            historyList.length > 0 && !isShowHistory && resultList.length === 0
          "
        >
          历史记录
        </div>
      </div>
    </div>
    <div class="app-search-mask" @click.stop="onClickCloseSearchDialog"></div>
  </div>
</template>

<style lang="scss">
@import './index.scss';
</style>
