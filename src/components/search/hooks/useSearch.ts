/**
 * 搜索相关的hooks
 */
import { onMounted, ref, watch } from 'vue';
import { debounce, uniq } from 'lodash';
import { searchApi } from '@/api';
import { useRouter } from 'vue-router';

export const useSearch = () => {
  const router = useRouter();

  // 搜索输入词
  const keyword = ref('');

  // 是否显示历史记录
  const isShowHistory = ref(false);

  // 显示为空
  const showEmptyText = ref(false);

  // 搜索记录列表
  const historyList = ref([]);

  // 搜索结果
  const resultList = ref([]);

  // 挂载时获取历史记录
  onMounted(() => {
    const list = JSON.parse(`${localStorage.getItem('history')}`);
    if (list) {
      historyList.value = list;
    }
  });

  // 搜索关键词方法
  const searchAction = async (): Promise<any> => {
    const response = await searchApi(keyword.value);

    resultList.value = response.data;

    if (resultList.value.length === 0) showEmptyText.value = true;

    const value = keyword.value.trim() as never;
    if (!value) return;

    if (historyList.value.indexOf(value) === -1) {
      // 添加到头部
      historyList.value.unshift(value);

      // 判断是否超出10个,超出则删除最后一条记录
      if (historyList.value.length > 10) {
        historyList.value.pop();
      }
      // 去重
      historyList.value = uniq(historyList.value);

      localStorage.setItem('history', JSON.stringify(historyList.value));
    } else {
      historyList.value.unshift(value);

      // 去重
      historyList.value = uniq(historyList.value);

      // 判断是否超出10个,超出则删除最后一条记录
      if (historyList.value.length > 10) {
        historyList.value.pop();
      }

      localStorage.setItem('history', JSON.stringify(historyList.value));
    }
  };

  // 搜索
  const onSearch = async () => {
    if (keyword.value) {
      debounce(await searchAction(), 500);
    }
  };

  // 删除一条记录
  const deleteOneRecord = (name: string) => {
    const list = historyList.value.filter((item) => item !== name);

    localStorage.setItem('history', JSON.stringify(list));

    historyList.value = JSON.parse(localStorage.getItem('history') || '');
  };

  // 点击跳转到对应的博客详情页
  const jumpToDetail = (id: number) => {
    router.push({
      name: 'postShow',
      params: { postId: id },
    });
  };

  // 点击搜索记录
  const onClickHistoryItem = (name: string) => {
    keyword.value = name;
    searchAction();
  };

  watch(
    () => keyword.value,
    (val, oldVal) => {
      if (val !== oldVal) {
        resultList.value = [];
        isShowHistory.value = false;
        showEmptyText.value = false;
      }
    },
  );

  return {
    keyword,
    isShowHistory,
    historyList,
    resultList,
    showEmptyText,
    onSearch,
    deleteOneRecord,
    jumpToDetail,
    onClickHistoryItem,
  };
};
