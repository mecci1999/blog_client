<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import InputField from '@/components/common/form/input/index.vue';
import { checkIsQQNumber } from '@/utils/checkIsQQNumber';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CommnetOperation',

  setup() {
    const store = useStore();

    const name = ref('');
    const email = ref('');
    const avatarImgUrl = ref('../../../src/assets/icon/account-black-32px.svg');

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

      // 判断邮箱是否为空

      // 通过api获取用户QQ信息，并存储在store中
      // 判断store中是否用数据，如果store中有数据，就不用发送请求
      if (qqUserInfo.value.code === 200) {
        avatarImgUrl.value = qqUserInfo.value.imgurl;
        name.value = qqUserInfo.value.name;
        email.value = qqUserInfo.value.mail;
      } else {
        await getQQInfo(name.value);
        avatarImgUrl.value = qqUserInfo.value.imgurl;
        name.value = qqUserInfo.value.name;
        email.value = qqUserInfo.value.mail;
      }
    };

    const onSendReqGetAvatarByQQEmail = () => {
      // 首先判断是否为QQ邮箱
      console.log(email.value);
      console.log(name.value);
    };

    return {
      name,
      email,
      avatarImgUrl,
      onSendReqGetAvatarByQQ,
      onSendReqGetAvatarByQQEmail,
      getQQInfo,
      qqUserInfo,
    };
  },

  components: {
    InputField,
  },
});
</script>

<template>
  <div class="comment-operation">
    <div class="comment-operation-title">
      <i class="comment-operation-title-icon"></i>
      <span class="comment-operation-title-text">写评论</span>
    </div>
    <div class="comment-operation-form">
      <div class="comment-operation-form-header">
        <div class="comment-operation-form-header-avatar">
          <img
            class="comment-operation-form-header-avatar-img"
            :src="avatarImgUrl"
          />
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
      <div class="comment-operation-form-main"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
