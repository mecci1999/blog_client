<template>
  <div class="app-management__blog-list">
    <!-- <el-skeleton style="width: 250px">
      <template #template>
        <el-skeleton-item variant="image" style="width: 250px; height: 280px" v-for="12" />
        <div style="padding: 16px">
          <el-skeleton-item variant="p" style="width: 50%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
            "
          >
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
    </el-skeleton> -->
    <div class="app-management__blog-list__container">
      <BlogListItem
        v-for="(item, index) in list"
        :key="index"
        :post="item"
        v-loading="loading"
        @handleChangeStatus="handleChangeStatus"
        @handleDelete="handleDelete"
        @handleEdit="handleEdit"
      />
    </div>
    <div class="app-management__blog-list__pagination" v-if="list.length > 0">
      <el-pagination
        v-model:currentPage="pageIndex"
        layout="prev, pager, next, total"
        :total="total"
        background
        @current-change="handleCurrentChange"
      />
    </div>
    <el-empty v-else description="暂无内容" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useBlogList } from './hooks/useBlogList';
import BlogListItem from './item/index.vue';

const store = useStore();

// 发送请求获取列表
const {
  list,
  pageIndex,
  pageSide,
  total,
  loading,
  handleCurrentChange,
  handleChangeStatus,
  handleDelete,
  handleEdit,
} = useBlogList();

onMounted(() => {
  // 挂载时增加tab
  const tab = {
    name: 'manage.blog.list',
    title: '博客列表',
  };
  store.commit('manage/addTab', tab);
  store.commit('manage/setCurrentTab', tab.name);
});
</script>

<style lang="scss">
@import './index.scss';
</style>
