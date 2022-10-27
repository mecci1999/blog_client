<template>
  <div class="app-management__image-common">
    <el-form label-width="120px" class="avatar-ruleForm" status-icon>
      <el-form-item label="当前头像" prop="content">
        <el-avatar :size="128" :src="avatarImageUrl" />
      </el-form-item>
      <el-form-item label="上传头像" prop="content" fit="cover">
        <el-upload
          class="upload-demo"
          drag
          :action="uploadAvatarImageUrl"
          name="avatar"
          :headers="headers"
          :on-success="handleUploadAvatar"
          list-type="picture"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖拽至此处上传图片或者<em>点击上传图片</em>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { API_BASE_URL } from '@/config';

const store = useStore();

const token = computed(() => store.getters['login/token']);

const headers = computed(() => {
  return {
    Authorization: 'Bearer ' + token.value,
  };
});

// 头像url
const avatarImageUrl = computed(() => `${API_BASE_URL()}/users/1/avatar`);

// 上传头像url
const uploadAvatarImageUrl = computed(() => `${API_BASE_URL()}/users/1/avatar`);

// 处理上传封面
const handleUploadAvatar = (res: any, file: any, files: any) => {
  if (res.insertId) {
    ElMessage.success('上传成功');
  }
};

onMounted(() => {
  // 挂载时增加tab
  const tab = {
    name: 'manage.image.avatar',
    title: '头像管理',
  };
  store.commit('manage/addTab', tab);
  store.commit('manage/setCurrentTab', tab.name);
});
</script>

<style lang="scss">
@import './index.scss';
</style>
