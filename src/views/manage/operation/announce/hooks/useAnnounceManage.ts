/**
 * 公告相关的hooks
 */
import { addAnnounceApi, deleteAnnounceApi, getAnnounceListApi } from '@/api';
import { ref, onMounted, reactive } from 'vue';
import { ElMessage, FormRules } from 'element-plus';

export const useAnnounceManage = () => {
  // 公告列表
  const announceList = ref([]);
  const loading = ref(false);
  const form = reactive({
    content: '',
  });
  const rules = reactive<FormRules>({
    content: [
      {
        required: true,
        message: '内容不能为空',
        trigger: 'blur',
        validator: () => form.content.trim() !== '',
      },
    ],
  });

  // 获取公告
  const getAnnounceListAction = async () => {
    loading.value = true;
    try {
      const res = await getAnnounceListApi();
      loading.value = false;
      announceList.value = res.data;
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  };

  // 删除公告
  const handleDeleta = async (id: number) => {
    loading.value = true;
    try {
      await deleteAnnounceApi(id);
      loading.value = false;
      await getAnnounceListAction();
      ElMessage.success('删除成功');
    } catch (error) {
      console.log(error);
      loading.value = false;
      ElMessage.error('删除失败');
    }
  };

  // 发布内容
  const handlePublish = async () => {
    if (form.content.trim() == '') return ElMessage.error('发布内容不能为空');
    loading.value = true;
    try {
      await addAnnounceApi({ content: form.content });
      loading.value = false;
      await getAnnounceListAction();
      ElMessage.success('发布成功');
      form.content = '';
    } catch (error) {
      console.log(error);
      loading.value = false;
      ElMessage.error('发布失败');
    }
  };

  onMounted(() => {
    getAnnounceListAction();
  });

  return {
    announceList,
    loading,
    rules,
    form,
    getAnnounceListAction,
    handleDeleta,
    handlePublish,
  };
};
