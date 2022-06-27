<script lang="ts">
import { defineComponent,ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'NavMenuItem',

  props:{
    item: {
      type: Object,
    }
  },

  setup() {
    const store = useStore();
    // 定义切换主题方法
    const changeTheme = () => {
      const theme = store.getters['theme/theme'] === 'dark' ? 'light' : 'dark';

      store.commit('theme/setTheme', theme);
    };

    // 是否打开目录菜单
    const showExpolerMenu = ref(false);

    const onClickMenuItem = (icon: string) => {
      if(icon === 'explore') {
        onClickExplore();
      }else {
        console.log(1);
      }
      
    }

    // 点击目录触发的方法
    const onClickExplore = () => {
      showExpolerMenu.value = !showExpolerMenu.value;
    }

    return {
      changeTheme,
      showExpolerMenu,
      onClickMenuItem,
      onClickExplore,
    }
  },

  components: {},
});
</script>

<template>
  <div class="nav-menu-list-item" @click="onClickMenuItem(item.icon)">
      <AppIcon :name="item.icon" size="20" />
      <span class="nav-menu-list-item-name">{{ item.text}}</span>
      <div class="explore-menu" v-show="showExpolerMenu">
        <div class="exlore-menu-list">分类</div>
        <div class="exlore-menu-list">标签</div>
        <div class="exlore-menu-list">归档</div>
      </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
