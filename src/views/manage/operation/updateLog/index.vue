<template>
  <div class="app-management__updateLog">
    <div class="app-management__updateLog-main">
      <el-tabs v-model="currentTab" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="更新日志" name="list">
          <div
            class="app-management__updateLog-list"
            v-if="updateLogList.length > 0"
          >
            <AppManageAnnounceListItem
              v-for="item in (updateLogList as any)"
              :key="item.id"
              :item="item"
              @handleDelete="handleDeleta"
            />
          </div>
          <el-empty v-else description="暂无内容" />
        </el-tab-pane>
        <el-tab-pane label="发布" name="publish">
          <div class="app-management__updateLog-main__pubilsh">
            <el-row>
              <el-col :span="12">
                <el-form
                  :model="form"
                  :rules="rules"
                  label-width="120px"
                  class="publish-ruleForm"
                  status-icon
                >
                  <el-form-item label="更新日志内容" prop="text">
                    <el-col :span="24">
                      <el-input v-model="form.text" :rows="8" />
                    </el-col>
                  </el-form-item>
                  <el-form-item>
                    <el-col :span="12">
                      <el-button type="primary" @click="moveContent"
                        >确定</el-button
                      >
                    </el-col>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="10">
                <div class="app-management__updateLog-main__publish-content">
                  <ul>
                    <li
                      class="app-management__updateLog-main__publish-content-text"
                      v-for="(text, index) in form.content"
                      :key="index"
                    >
                      {{ text }}
                    </li>
                  </ul>
                </div>
                <el-col :span="12">
                  <el-button type="primary" @click="handlePublish"
                    >发布更新日志</el-button
                  >
                </el-col>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useUpdateLogManage } from './hooks/useUpdateLogManage';
import AppManageAnnounceListItem from './item/index.vue';

const {
  updateLogList,
  loading,
  rules,
  form,
  getUpdateLogListAction,
  handleDeleta,
  handlePublish,
  moveContent,
} = useUpdateLogManage();

const store = useStore();

const currentTab = ref('list');

// 处理点击tab
const handleClick = (tab: any, event: any) => {
  currentTab.value = tab.props.name;
};

onMounted(() => {
  // 挂载时增加tab
  const tab = {
    name: 'manage.operation.updateLog',
    title: '更新日志',
  };
  store.commit('manage/addTab', tab);
  store.commit('manage/setCurrentTab', tab.name);
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
