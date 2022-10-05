/**
 * 博客列表相关hooks
 */
import { deletePostApi, getPostsApi, updatePostApi } from '@/api';
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

export const useBlogList = () => {
  const { list, pageIndex, pageSide, total, loading } = useGetBlogList();

  const handleCurrentChange = () => {
    try {
      loading.value = true;
      getPostsApi(pageIndex.value, '&status=')
        .then((res) => {
          total.value = parseInt(
            `${res.headers['X-Total-Count'] || res.headers['x-total-count']}`,
            10,
          );
          list.value = res.data;
        })
        .finally(() => {
          loading.value = false;
        });
    } catch (error) {
      console.log(error);
    }
  };

  // 删除当前博客
  const handleDelete = (postId: number) => {
    ElMessageBox.confirm('确认要删除该博客?', '二次确认', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        await deletePostApi(postId);
        handleCurrentChange();
        ElMessage({
          type: 'success',
          message: '删除博客成功',
        });
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除操作',
        });
      });
  };

  // 改变博客状态
  const handleChangeStatus = async (status: string, postId: number) => {
    try {
      if (status === 'published') {
        await updatePostApi(postId, { status: 'draft' });
      } else {
        await updatePostApi(postId, { status: 'published' });
      }
      handleCurrentChange();
      ElMessage.success('更新状态成功');
    } catch (error: any) {
      ElMessage.error(error.response.data.message);
    }
  };

  return {
    list,
    pageIndex,
    pageSide,
    total,
    loading,
    handleCurrentChange,
    handleChangeStatus,
    handleDelete,
  };
};

export const useGetBlogList = () => {
  const list = ref([]);
  //当前页数
  const pageIndex = ref(1);
  // 数量
  const pageSide = ref(12);
  // 总数
  const total = ref(0);
  const loading = ref(false);

  onMounted(() => {
    try {
      loading.value = true;
      getPostsApi(pageIndex.value, '&status=')
        .then((res) => {
          total.value = parseInt(
            `${res.headers['X-Total-Count'] || res.headers['x-total-count']}`,
            10,
          );
          list.value = res.data;
        })
        .finally(() => {
          loading.value = false;
        });
    } catch (error) {
      console.log(error);
    }
  });

  return {
    list,
    pageIndex,
    pageSide,
    total,
    loading,
  };
};
