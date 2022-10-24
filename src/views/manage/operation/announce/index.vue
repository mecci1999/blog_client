<template>
  <div class="app-management__announce">
    <div class="app-management__announce-main">
      <el-tabs v-model="currentTab" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="公告" name="list">
          <div
            class="app-management__announce-list"
            v-if="announceList.length > 0"
          >
            <AppManageAnnounceListItem
              v-for="item in (announceList as any)"
              :key="item.id"
              :item="item"
              @handleDelete="handleDeleta"
            />
          </div>
          <el-empty v-else description="暂无内容" />
          <!-- <div class="app-management__comment-pagination">
          <el-pagination
            v-model:currentPage="pageIndex"
            layout="prev, pager, next, total"
            :total="total"
            background
            @current-change="handleCurrentChange"
          />
        </div> -->
        </el-tab-pane>
        <el-tab-pane label="发布" name="publish">
          <div class="app-management__announce-main_pubilsh">
            <el-form
              :model="form"
              :rules="rules"
              label-width="120px"
              class="publish-ruleForm"
              status-icon
            >
              <el-form-item label="公告内容" prop="content">
                <el-col :span="12">
                  <el-input type="textarea" v-model="form.content" :rows="8" />
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="12">
                  <el-button type="primary" @click="handlePublish"
                    >发布公告</el-button
                  >
                </el-col>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useAnnounceManage } from './hooks/useAnnounceManage';
import AppManageAnnounceListItem from './item/index.vue';

const {
  announceList,
  loading,
  rules,
  form,
  getAnnounceListAction,
  handleDeleta,
  handlePublish,
} = useAnnounceManage();

const store = useStore();

const currentTab = ref('list');

// 处理点击tab
const handleClick = (tab: any, event: any) => {
  currentTab.value = tab.props.name;
};

onMounted(() => {
  // 挂载时增加tab
  const tab = {
    name: 'manage.operation.announce',
    title: '网站公告',
  };
  store.commit('manage/addTab', tab);
  store.commit('manage/setCurrentTab', tab.name);
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
