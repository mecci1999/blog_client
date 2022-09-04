/**
 *  评论相关的hooks
 */
import { getReplyCommentsApi } from '@/api';
import { ref } from 'vue';

export const useComment = () => {
  // 是否显示回复评论和更多
  const showMoreComment = ref(false);

  const parentName = ref('');

  // 评论列表
  const list = ref([]);

  // 获取某条评论的回复评论列表
  const getReplyComments = async (id: number) => {
    const response = await getReplyCommentsApi(id);

    list.value = response.data;
  };

  // 获取更多评论
  const handleFoldMore = async (id: number, name: string) => {
    parentName.value = name;
    if (!showMoreComment.value) {
      await getReplyComments(id);
    }
    showMoreComment.value = !showMoreComment.value;
  };

  return { showMoreComment, list, parentName, handleFoldMore };
};
