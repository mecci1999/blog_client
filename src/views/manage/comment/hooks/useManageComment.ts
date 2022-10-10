import { ref, onMounted, watch } from 'vue';
import { getComments, updateCommentStatus } from '@/api/index';
import { ElMessage } from 'element-plus';

export const useManageComment = () => {
  const currentTab = ref('all');
  //当前页数
  const pageIndex = ref(1);
  // 数量
  const pageSide = ref(10);
  // 总数
  const total = ref(0);
  const loading = ref(false);

  // 评论列表
  const comments = ref([]);

  // 处理点击tab
  const handleClick = (tab: any, event: any) => {
    currentTab.value = tab.props.name;
    pageIndex.value = 1;
  };

  watch(
    () => currentTab.value,
    (val) => {
      if (val) {
        getCommentsAction();
      }
    },
    {
      immediate: false,
    },
  );

  // 获取评论列表
  const getCommentsAction = async () => {
    try {
      loading.value = true;
      getComments(currentTab.value, pageIndex.value)
        .then((res) => {
          comments.value = res.data;
          total.value = parseInt(
            `${res.headers['X-Total-Count'] || res.headers['x-total-count']}`,
            10,
          );
        })
        .finally(() => {
          loading.value = false;
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrentChange = () => {
    getCommentsAction();
  };

  // 审核通过
  const handleApproved = async (id: number) => {
    try {
      await updateCommentStatus(id, { status: 'approved' });
      ElMessage.success('更新状态成功');
      await getCommentsAction();
    } catch (error: any) {
      ElMessage.error(error.response.data.message);
    }
  };

  // 审核拒绝
  const handleDenied = async (id: number) => {
    try {
      await updateCommentStatus(id, { status: 'denied' });
      ElMessage.success('更新状态成功');
      await getCommentsAction();
    } catch (error: any) {
      ElMessage.error(error.response.data.message);
    }
  };

  onMounted(() => {
    getCommentsAction();
  });

  return {
    currentTab,
    comments,
    pageIndex,
    total,
    loading,
    handleClick,
    getCommentsAction,
    handleCurrentChange,
    handleApproved,
    handleDenied,
  };
};
