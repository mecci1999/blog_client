/**
 * 日志相关的hooks
 */
import {
  addUpdateLogApi,
  deleteUpdateLogApi,
  getUpdateLogListApi,
} from '@/api';
import { ref, onMounted, reactive } from 'vue';
import { ElMessage, FormRules } from 'element-plus';

export const useUpdateLogManage = () => {
  // 公告列表
  const updateLogList = ref([]);
  const loading = ref(false);
  const form = reactive({
    content: [],
    text: '',
  }) as any;
  const rules = reactive<FormRules>({
    content: [
      {
        required: true,
        message: '内容不能为空',
        trigger: 'blur',
        validator: () => form.text.trim() !== '',
      },
    ],
  });

  // 获取公告
  const getUpdateLogListAction = async () => {
    loading.value = true;
    try {
      const res = await getUpdateLogListApi();
      loading.value = false;
      updateLogList.value = res.data;
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  };

  // 删除公告
  const handleDeleta = async (id: number) => {
    loading.value = true;
    try {
      await deleteUpdateLogApi(id);
      loading.value = false;
      await getUpdateLogListAction();
      ElMessage.success('删除成功');
    } catch (error) {
      console.log(error);
      loading.value = false;
      ElMessage.error('删除失败');
    }
  };

  // 日志内容
  const moveContent = () => {
    if (form.text.trim() == '') return ElMessage.error('文案不能为空');
    form.content.push(form.text);
    form.text = '';
  };

  // 发布内容
  const handlePublish = async () => {
    if (form.content.length == 0) return ElMessage.error('内容不能为空');
    loading.value = true;
    try {
      await addUpdateLogApi({ content: form.content.join('|') });
      loading.value = false;
      await getUpdateLogListAction();
      ElMessage.success('发布成功');
      form.content = [];
    } catch (error) {
      console.log(error);
      loading.value = false;
      ElMessage.error('发布失败');
    }
  };

  onMounted(() => {
    getUpdateLogListAction();
  });

  return {
    updateLogList,
    loading,
    rules,
    form,
    getUpdateLogListAction,
    handleDeleta,
    handlePublish,
    moveContent,
  };
};
