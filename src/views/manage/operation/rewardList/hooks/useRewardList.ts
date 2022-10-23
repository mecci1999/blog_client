/**
 * 捐赠名单相关的hooks
 */
import { addRewardApi, deleteRewardApi, getRewardListApi } from '@/api';
import { ref, onMounted, reactive } from 'vue';
import { ElMessage, FormRules } from 'element-plus';

export const useRewardList = () => {
  // 捐赠名单列表
  const rewardList = ref([]);
  const loading = ref(false);
  const form = reactive({
    name: '',
    amount: '',
  });
  const rules = reactive<FormRules>({
    name: [
      {
        required: true,
        message: '内容不能为空',
        trigger: 'blur',
        validator: () => form.name.trim() !== '',
      },
    ],
    amount: [
      {
        required: true,
        message: '内容不能为空',
        trigger: 'blur',
        validator: () => form.amount.trim() !== '',
      },
    ],
  });

  // 获取捐赠名单
  const getRewardListAction = async () => {
    loading.value = true;
    try {
      const res = await getRewardListApi();
      loading.value = false;
      rewardList.value = res.data;
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  };

  // 删除捐赠名单
  const handleDelete = async (id: number) => {
    loading.value = true;
    try {
      await deleteRewardApi(id);
      loading.value = false;
      await getRewardListAction();
      ElMessage.success('删除成功');
    } catch (error) {
      console.log(error);
      loading.value = false;
      ElMessage.error('删除失败');
    }
  };

  // 发布捐赠名单
  const handlePublish = async () => {
    if (form.name.trim() == '' && form.amount.trim() == '')
      return ElMessage.error('内容不能为空');
    loading.value = true;
    try {
      await addRewardApi({ name: form.name, amount: `¥${form.amount}` });
      loading.value = false;
      await getRewardListAction();
      ElMessage.success('新增成功');
      form.name = '';
      form.amount = '';
    } catch (error) {
      console.log(error);
      loading.value = false;
      ElMessage.error('新增失败');
    }
  };

  onMounted(() => {
    getRewardListAction();
  });

  return {
    rewardList,
    loading,
    rules,
    form,
    getRewardListAction,
    handleDelete,
    handlePublish,
  };
};
