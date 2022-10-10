import { ref, onMounted } from 'vue';
import { ElMessage, UploadProps, UploadUserFile } from 'element-plus';
import { getImageCommonList } from '@/api';

export const useImageCommon = () => {
  // 图片列表
  const imagesList = ref<UploadUserFile[]>([]);
  // 图片弹窗弹窗url
  const dialogImageUrl = ref('');
  // 图片预览弹窗显示
  const dialogVisible = ref(false);

  // 点击预览图标方法
  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!;
    dialogVisible.value = true;
  };

  // 点击删除图片方法
  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile);
  };

  // 挂载时获取图片列表
  onMounted(() => {
    getImageCommonList().then(
      (res) => {
        const list = res.data;

        imagesList.value = list.map((item: any) => {
          return {
            name: item.originalname,
            url: `http://localhost:3000/images/serve?name=${item.originalname}`,
          };
        });
      },
      (error) => {
        ElMessage.error(error.response.data.message);
      },
    );
  });

  return {
    imagesList,
    dialogImageUrl,
    dialogVisible,
    handlePictureCardPreview,
    handleRemove,
  };
};
