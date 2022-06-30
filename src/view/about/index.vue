<script lang="ts">
import { log } from 'console';
import {
  defineComponent,
  onUnmounted,
  onMounted,
  computed,
  ref,
  reactive,
} from 'vue';
import {
  getCurrnetTime,
  changeBackgroundImageByTime,
} from '../../utils/changeBackgroundImage';

export default defineComponent({
  name: 'AppAbout',

  setup() {
    let time = ref('');
    let date: any;
    let style = reactive({
      fontSize: 14 + 'px',
      backgroundImage: '',
    });

    onMounted(() => {
      date = setInterval(() => {
        time.value = getCurrnetTime();
        style.backgroundImage = changeBackgroundImageByTime(
          time.value.slice(0, 2),
        );
      }, 1000);
    });

    onUnmounted(() => {
      clearInterval(date);
    });

    return {
      time,
      style,
    };
  },

  components: {},
});
</script>

<template>
  <div class="app-about" :style="style"></div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
