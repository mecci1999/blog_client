<script lang="ts" setup>
import { computed, ref, defineProps } from 'vue';
import InputField from '@/components/common/form/input/index.vue';
import { checkIsQQNumber, checkIsQQEmail } from '@/utils/checkIsQQNumber';
import { useStore } from 'vuex';
import TextareaField from '@/components/common/form/textarea/index.vue';
import AppIcon from '@/components/common/app-icon/index.vue';
import { createCommentApi, createReplyCommentApi } from '@/api/index';
import { CommentStatus } from '@/types/enum';
import { ElMessage } from 'element-plus';
import { getStroage } from '@/utils/localStorage';

const props = defineProps({
  postId: {
    type: Number,
  },

  parentId: {
    type: Number,
    default: null,
  },

  hiddenTitle: {
    type: Boolean,
    default: false,
  },
});

const store = useStore();

const name = ref('');
const email = ref('');
const text = ref('');
const avatarImgUrl = ref('');

// 行数
const row = 7;

// 用户QQ信息
const qqUserInfo = computed(() => {
  return store.getters['comment/qqUserInfo'];
});

// 获取用户QQ信息接口
const getQQInfo = async (id: string) => {
  await store.dispatch('comment/getQQUserInfo', id);
};

/**
 * 当获取到字段的焦点时触发请求
 * 并且触发请求的条件需要满足QQ号的正则匹配，才能够发送请求，其他情况一切return
 * 查看store中是否存在数据，如果没有再发送请求。
 */
const onSendReqGetAvatarByQQ = async () => {
  // 首先判断是否为QQ号
  if (!checkIsQQNumber(name.value)) return;

  // 通过api获取用户QQ信息，并存储在store中
  // 判断store中是否用数据，如果store中有数据，就不用发送请求
  // if (qqUserInfo.value.code === 200) {
  //   avatarImgUrl.value = qqUserInfo.value.imgurl;
  //   name.value = qqUserInfo.value.name;
  //   email.value = qqUserInfo.value.mail;
  // } else {
  await getQQInfo(name.value);
  avatarImgUrl.value = qqUserInfo.value.imgurl;
  if (qqUserInfo.value.name) {
    name.value = qqUserInfo.value.name;
  }
  if (qqUserInfo.value.mail) {
    email.value = qqUserInfo.value.mail;
  }
  // }
};

const onSendReqGetAvatarByQQEmail = async () => {
  // 首先判断是否为QQ邮箱
  if (!checkIsQQEmail(email.value)) return;

  // 如果为qq邮箱就可以拿到qq去请求信息
  const QQNumber = email.value.split('@')[0];

  // 通过api获取用户QQ信息，并存储在store中
  // 判断store中是否用数据，如果store中有数据，就不用发送请求
  // if (qqUserInfo.value.code === 200) {
  //   avatarImgUrl.value = qqUserInfo.value.imgurl;
  //   name.value = qqUserInfo.value.name;
  //   email.value = qqUserInfo.value.mail;
  // } else {
  await getQQInfo(QQNumber);
  avatarImgUrl.value = qqUserInfo.value.imgurl;
  name.value = qqUserInfo.value.name;
  email.value = qqUserInfo.value.mail;
  // }
};

// 发表评论
const handleSumbit = async () => {
  if (name.value === '')
    return ElMessage({ type: 'error', message: '昵称为空，请输入昵称' });
  if (email.value === '')
    return ElMessage({ type: 'error', message: '邮箱为空，请输入邮箱' });
  if (text.value === '')
    return ElMessage({ type: 'error', message: '评论内容为空，请输入内容' });

  try {
    // 发表评论
    if (!props.hiddenTitle) {
      // 获取真实地址
      const address = getStroage('address');

      // 获取地址
      await createCommentApi({
        name: name.value,
        eMail: email.value,
        avatarImgUrl: avatarImgUrl.value,
        content: text.value,
        status: CommentStatus.pending,
        postId: props.postId,
        province: address.province,
        city: address.city,
      })
        .then(
          () => {
            ElMessage.success('发送成功，等待博主审核');
          },
          () => {
            ElMessage.error('发送失败，请重试');
          },
        )
        .finally(() => {
          name.value = '';
          email.value = '';
          text.value = '';
          avatarImgUrl.value = '';
        });
    } else {
      // 发表回复评论
      await createReplyCommentApi(props.parentId, {
        name: name.value,
        eMail: email.value,
        avatarImgUrl: avatarImgUrl.value,
        content: text.value,
        status: CommentStatus.pending,
        postId: props.postId,
      })
        .then(
          () => {
            ElMessage.success('发送成功，等待博主审核');
          },
          () => {
            ElMessage.error('发送失败，请重试');
          },
        )
        .finally(() => {
          name.value = '';
          email.value = '';
          text.value = '';
          avatarImgUrl.value = '';
        });
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="comment-operation">
    <div class="comment-operation-title" v-if="!hiddenTitle">
      <AppIcon size="30" name="sms" />
      <span class="comment-operation-title-text">写评论</span>
    </div>
    <div class="comment-operation-form">
      <div class="comment-operation-form-header">
        <div class="comment-operation-form-header-avatar">
          <img
            v-if="avatarImgUrl !== ''"
            class="comment-operation-form-header-avatar-img"
            :src="avatarImgUrl"
          />
          <div
            v-else
            :class="['comment-operation-form-header-avatar-img', 'default']"
          ></div>
        </div>
        <div class="comment-operation-form-header-input">
          <InputField
            placeholder="昵称/QQ号(必填)"
            v-model="name"
            @onBlur="onSendReqGetAvatarByQQ"
          />
          <InputField
            placeholder="邮箱(必填)"
            v-model="email"
            @onBlur="onSendReqGetAvatarByQQEmail"
          />
        </div>
      </div>
      <div class="comment-operation-form-line"></div>
      <div class="comment-operation-form-main">
        <TextareaField
          placeholder="友情提示：输入QQ号可以自动获取QQ头头像以及QQ邮箱"
          v-model="text"
          :rows="row"
        />
        <div class="comment-operation-form-main-button">
          <el-button type="primary" @click="handleSumbit">发表</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
