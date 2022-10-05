import {
  addPostTags,
  addPostType,
  createPostApi,
  getTagsApi,
  getTypesApi,
} from '@/api';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

/**
 * 发布相关的hooks
 */
export const usePublished = () => {
  // 发布表单的数据
  const form = reactive({
    title: '',
    description: '',
    status: 'draft',
    userId: 1,
    wordAmount: '',
    readTime: '',
    content: '',
  });

  // 选择的分类
  const type = ref('');

  // 选择的标签
  const tags = ref([]);

  // 分类列表
  const typesList = ref([]);

  // 加载
  const loading = ref(false);

  // 标签列表
  const tagsList = ref([]);

  // 当前进度步骤
  const curStep = ref(1);

  // 创建的博客id
  const postId = ref(0);

  // 处理上传md文件转换为html
  const handleUploadContent = (res: any, file: any, files: any) => {
    form.content = res.content;
  };

  // 预览
  const handlePreview = () => {};

  // 暂存
  const handleDraft = async () => {
    try {
      const res = await createPostApi(form);
      postId.value = res.data.insertId;
      ElMessage.success('博客已暂存在草稿箱中');
      curStep.value = 2;
    } catch (error) {
      console.log(error);
    }
  };

  // 添加分类和标签
  const handleAddTypeAndTag = async () => {
    // 如果没有选择标签或分类
    if (tags.value.length === 0 || type.value === '')
      return ElMessage.error('请选择分类或标签');

    if (postId.value === 0) return;

    try {
      // 添加分类
      await addPostType(postId.value, { name: type.value });
      // 添加标签
      tags.value.map(async (tag) => {
        await addPostTags(postId.value, { name: tag });
      });
      ElMessage.success('添加标签成功');
      curStep.value = 3;
      type.value = '';
      tags.value = [];
    } catch (error) {
      console.log(error);
    }
  };

  // 选择封面
  const handlePublish = () => {};

  // 获取分类列表
  const getTypesList = async (val: boolean) => {
    if (val) {
      loading.value = true;
      try {
        const res = await getTypesApi();
        typesList.value = res.data;
        loading.value = false;
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    }
  };

  const getTagsList = async (val: boolean) => {
    if (val) {
      loading.value = true;
      try {
        const res = await getTagsApi();
        tagsList.value = res.data;
        loading.value = false;
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    }
  };

  // 处理上传封面
  const handleUploadBgImg = (res: any, file: any, files: any) => {
    if (res.insertId) {
      ElMessage.success('上传成功');
    }
  };

  return {
    form,
    curStep,
    postId,
    type,
    tags,
    typesList,
    tagsList,
    loading,
    handleUploadContent,
    handlePreview,
    handleDraft,
    handleAddTypeAndTag,
    handlePublish,
    getTypesList,
    getTagsList,
    handleUploadBgImg,
  };
};
