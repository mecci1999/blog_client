<template>
  <div class="app-management__blog-publish">
    <div class="app-management__blog-publish__step">
      <el-steps :active="curStep" direction="vertical">
        <el-step title="填写博客相关信息" :icon="Edit" />
        <el-step title="选择分类和标签" :icon="Connection" />
        <el-step title="选择封面" :icon="Picture" />
      </el-steps>
    </div>
    <div class="app-management__blog-publish__container">
      <el-form
        :model="form"
        :rules="rules"
        v-if="curStep === 1"
        label-width="120px"
        class="publish-ruleForm"
        status-icon
      >
        <el-form-item label="标题" prop="title">
          <el-col :span="12">
            <el-input v-model="form.title" />
          </el-col>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-col :span="12">
            <el-input type="textarea" v-model="form.description" :rows="8" />
          </el-col>
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <el-upload
            class="upload-demo"
            drag
            :action="uploadContentUrl"
            name="markdown"
            :headers="headers"
            :on-success="handleUploadContent"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              拖拽至此处上传文件或者<em>点击上传文件</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="字数" prop="wordAmount">
          <el-col :span="6">
            <el-input v-model="form.wordAmount" />
          </el-col>
        </el-form-item>
        <el-form-item label="阅读时间" prop="readTime">
          <el-col :span="6">
            <el-input v-model="form.readTime" />
          </el-col>
        </el-form-item>
      </el-form>
      <el-form
        v-if="curStep === 2"
        label-width="120px"
        class="publish-ruleForm"
      >
        <el-form-item label="分类">
          <el-col :span="6">
            <el-select
              v-model="type"
              :loading="loading"
              filterable
              placeholder="选择博客分类"
              @visible-change="getTypesList"
            >
              <el-option
                v-for="item in (typesList as any)"
                :key="item?.id"
                :label="item?.name"
                :value="item?.name"
              />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="标签">
          <el-col :span="6">
            <el-select
              v-model="tags"
              :loading="loading"
              multiple
              filterable
              placeholder="选择博客分类"
              @visible-change="getTagsList"
            >
              <el-option
                v-for="item in (tagsList as any)"
                :key="item?.id"
                :label="item?.name"
                :value="item?.name"
              />
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>

      <el-form
        :model="form"
        v-if="curStep === 3"
        label-width="120px"
        class="publish-ruleForm"
        status-icon
      >
        <el-form-item label="封面" prop="content">
          <el-upload
            class="upload-demo"
            drag
            :action="uploadBgImgUrl"
            name="postBgImg"
            :headers="headers"
            :on-success="handleUploadBgImg"
            list-type="picture"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              拖拽至此处上传图片或者<em>点击上传图片</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="博客相关图片" prop="content">
          <el-upload
            class="upload-demo"
            drag
            :action="uploadImagesUrl"
            name="image"
            :headers="headers"
            :on-success="handleUploadImages"
            list-type="picture-card"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              拖拽至此处上传图片或者<em>点击上传图片</em>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="app-management__blog-publish__button">
        <!-- <el-button type="primary" @click="handlePreview">预览</el-button> -->
        <el-button type="primary" v-if="curStep === 1" @click="handleDraft"
          >下一步</el-button
        >
        <el-button
          type="primary"
          v-if="curStep === 2"
          @click="handleAddTypeAndTag"
          >下一步</el-button
        >
        <el-button type="primary" v-if="curStep === 3" @click="handlePreview"
          >预览</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { usePublished } from './hooks/usePublish';
import type { FormRules } from 'element-plus';
import {
  UploadFilled,
  Edit,
  Picture,
  Connection,
} from '@element-plus/icons-vue';
import { API_BASE_URL } from '@/config';

const store = useStore();

const {
  form,
  curStep,
  type,
  tags,
  tagsList,
  typesList,
  loading,
  postId,
  handleUploadContent,
  handlePreview,
  handleDraft,
  handleAddTypeAndTag,
  handlePublish,
  getTypesList,
  getTagsList,
  handleUploadBgImg,
  handleUploadImages,
} = usePublished();

const rules = reactive<FormRules>({
  title: [
    {
      required: true,
      message: '标题不能为空',
      trigger: 'blur',
      validator: () => form.title.trim() !== '',
    },
  ],
  description: [
    {
      required: true,
      message: '描述不能为空',
      trigger: 'blur',
      validator: () => form.description.trim() !== '',
    },
  ],
  content: [
    {
      required: true,
      message: '正文不能为空',
      trigger: 'blur',
      validator: () => form.content.trim() !== '',
    },
  ],
  readTime: [
    {
      required: true,
      message: '阅读时间不能为空',
      trigger: 'blur',
      validator: () => form.readTime.trim() !== '',
    },
  ],
  wordAmount: [
    {
      required: true,
      message: '字数不能为空',
      trigger: 'blur',
      validator: () => form.wordAmount.trim() !== '',
    },
  ],
});

const token = computed(() => store.getters['login/token']);

// 上传正文的url
const uploadContentUrl = `${API_BASE_URL()}/getHtml`;

// 上传封面的url
const uploadBgImgUrl = computed(
  () => `${API_BASE_URL()}/posts/${postId.value}/bgImg`,
);

// 上传博客相关的图片url
const uploadImagesUrl = computed(
  () => `${API_BASE_URL()}/images/upload?post=${postId.value}`,
);

// 请求头部
const headers = computed(() => {
  return {
    Authorization: 'Bearer ' + token.value,
  };
});

onMounted(() => {
  // 挂载时增加tab
  const tab = {
    name: 'manage.blog.publish',
    title: '发布博客',
  };
  store.commit('manage/addTab', tab);
  store.commit('manage/setCurrentTab', tab.name);
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
