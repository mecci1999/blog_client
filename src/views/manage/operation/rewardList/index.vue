<template>
  <div class="app-management__rewardList">
    <div class="app-management__rewardList-main">
      <el-tabs v-model="currentTab" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="捐赠名单" name="list">
          <div
            class="app-management__rewardList-list"
            v-if="rewardList.length > 0"
          >
            <AppManageRewardListItem
              v-for="item in (rewardList as any)"
              :key="item.id"
              :item="item"
              @handleDelete="handleDelete"
            />
          </div>
          <el-empty v-else description="暂无内容" />
        </el-tab-pane>
        <el-tab-pane label="新增" name="publish">
          <div class="app-management__rewardList-main_pubilsh">
            <el-form
              :model="form"
              :rules="rules"
              label-width="120px"
              class="publish-ruleForm"
              status-icon
            >
              <el-form-item label="捐赠者姓名" prop="name">
                <el-col :span="12">
                  <el-input v-model="form.name" />
                </el-col>
              </el-form-item>
              <el-form-item label="捐赠金额" prop="amount">
                <el-col :span="12">
                  <el-input v-model="form.amount" />
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="12">
                  <el-button type="primary" @click="handlePublish"
                    >新增</el-button
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
import { useRewardList } from './hooks/useRewardList';
import AppManageRewardListItem from './item/index.vue';

const {
  rewardList,
  loading,
  rules,
  form,
  getRewardListAction,
  handleDelete,
  handlePublish,
} = useRewardList();

const store = useStore();

const currentTab = ref('list');

// 处理点击tab
const handleClick = (tab: any, event: any) => {
  currentTab.value = tab.props.name;
};

onMounted(() => {
  // 挂载时增加tab
  const tab = {
    name: 'manage.operation.rewardList',
    title: '好心人名单',
  };
  store.commit('manage/addTab', tab);
  store.commit('manage/setCurrentTab', tab.name);
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
