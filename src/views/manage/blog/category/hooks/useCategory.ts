/**
 * 分类相关的hooks
 */
import { deleteCategoryApi, getTypesApi, updateCategoryApi } from '@/api';
import { onMounted, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';

export const useCategoryData = () => {
  const categoryList = ref([]);

  // 处理后的分类列表
  const processList = ref([]) as any;

  watch(
    () => categoryList.value,
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
  const getCategoryData = async () => {
    try {
      const res = await getTypesApi();
      categoryList.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // 更新分类
  const updateCategoryData = async (id: number, name: string) => {
    try {
      await updateCategoryApi({ name: name, typeId: id });
      await getCategoryData();
    } catch (error: any) {
      console.log(error);
      ElMessage.error(error.response.data.message);
    }
  };

  onMounted(() => {
    getCategoryData();
  });

  return {
    categoryList,
    processList,
    getCategoryData,
    updateCategoryData,
  };
};

export const useCategory = () => {
  const { categoryList, processList, getCategoryData, updateCategoryData } =
    useCategoryData();

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
      await deleteCategoryApi(id);
      await getCategoryData();
      ElMessage.success('删除分类成功');
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
        await updateCategoryData(id, inputValue.value);
        ElMessage.success('更新分类成功');
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
      await deleteCategoryApi(id);
      await getCategoryData();
      ElMessage.success('删除分类成功');
    } catch (error: any) {
      console.log(error);
      ElMessage.error(error.response.data.message);
    }
    // 恢复初态
    inputValue.value = '';
  };

  return {
    processList,
    categoryList,
    inputValue,
    handleClose,
    onInputBlur,
    clearInputValue,
    getCategoryData,
    updateCategoryData,
    onInputClear,
  };
};
