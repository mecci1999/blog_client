/**
 * 分类相关的hooks
 */
import { getTypesApi } from '@/api';
import { onMounted, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';

export const useCategoryData = () => {
  const categoryList = ref([]);

  // 处理后的分类列表
  const processList = ref([]);

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
    } catch (error) {
      console.log(error);
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

  const handleClose = (index: number) => {
    // 去除当前分类
    categoryList.value.splice(index, 1);

    // 删除分类
  };

  // 处理失焦
  const onInputBlur = (index: number) => {
    // 判断input的值是否改变,如果发生改变就发送请求更新热词
    if (
      inputValue.value !== processList.value[index].name &&
      !isInputClear.value
    ) {
      // 发送请求
    }
  };
};
