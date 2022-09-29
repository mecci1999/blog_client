<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import TextField from '@/components/common/form/input/index.vue'
  import ButtonField from '@/components/common/form/button/index.vue'
  import { loginApi } from '@/api/index'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'

  const store = useStore()
  const router = useRouter()

  const name = ref('')
  const password = ref('')
  const isLoggedIn = computed(() => store.getters['login/isLoggedIn'])

  // 登录
  const onClickLoginButton = async () => {
    try {
      const res = await loginApi({
        name: name.value,
        password: password.value
      })
      store.commit('login/setToken', res.data.token)
      store.dispatch('login/configApiHttpClientAuthHeader', res.data.token, {root: true})
      if(isLoggedIn) {
        router.replace({name: 'manage'})
      }
    } catch (error) {
      console.log(error);
    }
  }

  const loginButtonType = computed(() => name.value && password.value ? '' : 'outline')
</script>

<template>
  <div class="app-login">
    <div class="form">
      <h1 class="header">用户登录</h1>
      <TextField v-model="name" placeholder="用户名"></TextField>
      <TextField
        v-model="password"
        type="password"
        placeholder="密码"
      ></TextField>
      <div class="section actions">
        <ButtonField
          text="登录"
          size="large"
          @click="onClickLoginButton"
          :type="loginButtonType"
        ></ButtonField>
        <!-- <WeixinLoginButton /> -->
      </div>
    </div>
    <!-- <div class="action">
      <router-link class="link" :to="registerLinkTo">
        注册 →
      </router-link>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
