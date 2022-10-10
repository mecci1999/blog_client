<template>
  <div class="app-management__comment">
    <el-tabs v-model="currentTab" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">
        <AppManagementCommentList
          :comments="comments"
          @handleApproved="handleApproved"
          @handleDenied="handleDenied"
        />
        <div class="app-management__comment-pagination">
          <el-pagination
            v-model:currentPage="pageIndex"
            layout="prev, pager, next, total"
            :total="total"
            background
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="待审核" name="pending">
        <AppManagementCommentList
          :comments="comments"
          @handleApproved="handleApproved"
          @handleDenied="handleDenied"
        />
        <div class="app-management__comment-pagination">
          <el-pagination
            v-model:currentPage="pageIndex"
            layout="prev, pager, next, total"
            :total="total"
            background
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="审核通过" name="approved">
        <AppManagementCommentList
          :comments="comments"
          @handleApproved="handleApproved"
          @handleDenied="handleDenied"
        />
        <div class="app-management__comment-pagination">
          <el-pagination
            v-model:currentPage="pageIndex"
            layout="prev, pager, next, total"
            :total="total"
            background
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="驳回" name="denied">
        <AppManagementCommentList
          :comments="comments"
          @handleApproved="handleApproved"
          @handleDenied="handleDenied"
        />
        <div class="app-management__comment-pagination">
          <el-pagination
            v-model:currentPage="pageIndex"
            layout="prev, pager, next, total"
            :total="total"
            background
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useManageComment } from './hooks/useManageComment';
import AppManagementCommentList from './list/index.vue';

const store = useStore();

const {
  currentTab,
  comments,
  pageIndex,
  total,
  loading,
  handleClick,
  getCommentsAction,
  handleCurrentChange,
  handleApproved,
  handleDenied,
} = useManageComment();

onMounted(() => {
  // 挂载时增加tab
  const tab = {
    name: 'manage.comment',
    title: '评论管理',
  };
  store.commit('manage/addTab', tab);
  store.commit('manage/setCurrentTab', tab.name);
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
