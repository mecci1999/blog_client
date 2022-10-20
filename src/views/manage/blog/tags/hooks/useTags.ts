/**
 * 分类相关的hooks
 */
import { getTagsApi, updateTagsApi, deleteTagsApi } from '@/api';
import { onMounted, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';

export const useTagsData = () => {
  const tagsList = ref([]);

  // 处理后的分类列表
  const processList = ref([]);

  watch(
    () => tagsList.value,
    (list: any) => {
      processList.value = list.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          visible: true,
        };
      });
    },
    {
      immediate: true,
    },
  );

  // 获取分类列表
  const getTagsData = async () => {
    try {
      const res = await getTagsApi();
      tagsList.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // 更新分类
  const updateTagsData = async (id: number, name: string) => {
    try {
      await updateTagsApi({ name: name, tagId: id });
      await getTagsData();
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(() => {
    getTagsData();
  });

  return {
    tagsList,
    processList,
    getTagsData,
    updateTagsData,
  };
};

export const useTags = () => {
  const { tagsList, processList, getTagsData, updateTagsData } = useTagsData();

  // 输入框值
  const inputValue = ref('');

  // 清空输入框
  const clearInputValue = () => {
    inputValue.value = '';
  };

  // 输入框清空
  const isInputClear = ref(false);

  const handleClose = async (id: number) => {
    // 删除分类
    try {
      await deleteTagsApi(id);
      await getTagsData();
      ElMessage.success('删除标签成功');
    } catch (error: any) {
      console.log(error);
      ElMessage.error(error.response.data.message);
    }
  };

  // 处理失焦
  const onInputBlur = async (index: number, id: number) => {
    // 判断input的值是否改变,如果发生改变就发送请求更新热词
    if (
      inputValue.value !== '' &&
      inputValue.value !== processList.value[index].name &&
      !isInputClear.value
    ) {
      // 发送请求,更新分类
      try {
        await updateTagsData(id, inputValue.value);
        ElMessage.success('更新标签成功');
      } catch (error: any) {
        console.log(error);
        ElMessage.error(error.response.data.message);
      }

      isInputClear.value = false;
    }

    // 恢复初态
    inputValue.value = '';
    processList.value[index].visible = true;
  };

  // 点击关闭按钮删除该标签
  const onInputClear = async (id: number) => {
    isInputClear.value = true;
    try {
      await deleteTagsApi(id);
      await getTagsData();
      ElMessage.success('删除标签成功');
    } catch (error: any) {
      console.log(error);
      ElMessage.error(error.response.data.message);
    }
    // 恢复初态
    inputValue.value = '';
  };

  return {
    processList,
    tagsList,
    inputValue,
    handleClose,
    onInputBlur,
    clearInputValue,
    getTagsData,
    updateTagsData,
    onInputClear,
  };
};
