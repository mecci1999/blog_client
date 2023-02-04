<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Fireworks } from '@fireworks-js/vue';
import type { FireworksOptions } from '@fireworks-js/vue';

const store = useStore();
const router = useRouter();

const currentIndex = ref(0);

const left = ref(null) as any;

const num = ref(null) as any;

const right = ref(null) as any;

const starNumShow = ref(false);

const happy = ref(false);

const lauch = ref(false);

const fireworks = ref<InstanceType<typeof Fireworks>>();

const music = ref(null) as any;

const opening = ref(false);

const status = ref(0);

const options = ref<FireworksOptions>({
  autoresize: true,
  opacity: 0.5,
  acceleration: 1.05,
  friction: 0.97,
  gravity: 1.5,
  particles: 50,
  traceLength: 3,
  traceSpeed: 10,
  explosion: 5,
  intensity: 30,
  flickering: 50,
  lineStyle: 'round',
  hue: {
    min: 0,
    max: 360,
  },
  delay: {
    min: 30,
    max: 60,
  },
  rocketsPoint: {
    min: 1,
    max: 100,
  },
  lineWidth: {
    explosion: {
      min: 1,
      max: 3,
    },
    trace: {
      min: 1,
      max: 2,
    },
  },
  brightness: {
    min: 50,
    max: 80,
  },
  decay: {
    min: 0.015,
    max: 0.03,
  },
  mouse: {
    click: false,
    move: false,
    max: 1,
  },
});

async function startFireworks() {
  if (!fireworks.value) return;
  fireworks.value.start();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // await fireworks.value.waitStop();
}

// 打开后面的页面
const handleStart = () => {
  currentIndex.value === 3;
  music.value.play();
  opening.value = true;
  left.value.style = 'transform: translateX(-100%);';
  right.value.style = 'transform: translateX(100%);';

  setTimeout(() => {
    status.value = 1;
  }, 1000);
};

// 点击页面改变文字
const handleClickGift = () => {
  starNumShow.value = true;
};

const handleShowText = () => {
  num.value.style = 'transform: translateY(-20%) scale(0.5);';
  happy.value = true;
  lauch.value = true;
  // 放烟花
  setTimeout(() => {
    startFireworks();
  }, 1000);
};

onMounted(() => {});

onUnmounted(() => {
  music.value.pause();
});
</script>

<template>
  <div class="app-gift">
    <!-- 文字 -->
    <div class="app-gift__text" v-if="!opening">
      <div
        class="app-gift__text-item"
        v-if="currentIndex === 0"
        @click="currentIndex = 1"
      >
        这是一份仓促的生日礼物
      </div>
      <div
        class="app-gift__text-item"
        v-if="currentIndex === 1"
        @click="currentIndex = 2"
      >
        它只属于你一个人
      </div>
      <div
        class="app-gift__text-item"
        v-if="currentIndex === 2"
        @click="handleStart"
      >
        希望你能喜欢
      </div>
    </div>
    <!-- 开场 -->
    <div class="app-gift__start" v-if="status === 0">
      <div class="app-gift__start-left" ref="left"></div>
      <div class="app-gift__start-right" ref="right"></div>
    </div>
    <!-- 内容 -->
    <div class="app-gift__container" v-if="status === 1">
      <!-- 烟花 -->
      <Fireworks
        v-if="lauch"
        ref="fireworks"
        :options="options"
        :style="{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
          zIndex: '99',
        }"
      />
      <!-- 月亮 -->
      <div class="app-gift__container-moon" @click="handleClickGift"></div>
      <!-- 星星 -->
      <img
        class="app-gift__container-star_01"
        src="@/assets/image/star01.png"
      />
      <img
        class="app-gift__container-star_02"
        src="@/assets/image/star02.png"
      />
      <img
        class="app-gift__container-star_03"
        src="@/assets/image/star03.png"
      />
      <img
        class="app-gift__container-star_04"
        src="@/assets/image/star04.png"
      />
      <img
        class="app-gift__container-star_05"
        src="@/assets/image/star05.png"
      />
      <img
        class="app-gift__container-star_06"
        src="@/assets/image/star05.png"
      />
      <img
        class="app-gift__container-star_07"
        src="@/assets/image/star05.png"
      />
      <img
        class="app-gift__container-star_08"
        src="@/assets/image/star02.png"
      />
      <img
        class="app-gift__container-star_09"
        src="@/assets/image/star02.png"
      />
      <img
        class="app-gift__container-star_10"
        src="@/assets/image/star03.png"
      />
      <img
        class="app-gift__container-star_11"
        src="@/assets/image/star03.png"
      />
      <img
        class="app-gift__container-star_12"
        src="@/assets/image/star01.png"
      />
      <img
        class="app-gift__container-star_13"
        src="@/assets/image/star02.png"
      />
      <img
        class="app-gift__container-star_14"
        src="@/assets/image/star03.png"
      />
      <img
        class="app-gift__container-star_15"
        src="@/assets/image/star04.png"
      />
      <img
        class="app-gift__container-star_16"
        src="@/assets/image/star05.png"
      />
      <img
        class="app-gift__container-star_17"
        src="@/assets/image/star01.png"
      />
      <img
        class="app-gift__container-star_18"
        src="@/assets/image/star02.png"
      />
      <img
        class="app-gift__container-star_19"
        src="@/assets/image/star03.png"
      />
      <img
        class="app-gift__container-star_20"
        src="@/assets/image/star04.png"
      />
      <img
        class="app-gift__container-star_21"
        src="@/assets/image/star05.png"
      />
      <img
        class="app-gift__container-star_22"
        src="@/assets/image/star02.png"
      />
      <img
        class="app-gift__container-star_23"
        src="@/assets/image/star03.png"
      />
      <img
        class="app-gift__container-star_24"
        src="@/assets/image/star05.png"
      />
      <img
        class="app-gift__container-star_25"
        src="@/assets/image/star01.png"
      />
      <img
        class="app-gift__container-star_26"
        src="@/assets/image/star02.png"
      />
      <!-- 数字 -->
      <div
        class="app-gift__container-num"
        ref="num"
        v-if="starNumShow"
        @click="handleShowText"
      >
        <!-- 数字2 -->
        <div class="app-gift__container-num_two">
          <img
            class="app-gift__container-num_two_01"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_two_02"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_two_03"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_two_04"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_two_05"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_two_06"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_two_07"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_two_08"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_two_09"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_two_10"
            src="@/assets/image/star01.png"
          />
        </div>
        <!-- 数字6 -->
        <div class="app-gift__container-num_six">
          <img
            class="app-gift__container-num_six_01"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_six_02"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_six_03"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_six_04"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_six_05"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_six_06"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_six_07"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_six_08"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_six_09"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_six_10"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_six_11"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_six_12"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-num_six_13"
            src="@/assets/image/star01.png"
          />
        </div>
      </div>
      <!-- 生日快乐 -->
      <div class="app-gift__container-happy" v-if="happy">
        <div class="app-gift__container-happy-left">
          <img
            class="app-gift__container-happy-left_01"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-left_02"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-left_03"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-left_04"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-left_05"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-left_06"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-left_07"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-left_08"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_09"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_10"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_11"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_12"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_13"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_14"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_15"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_16"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_17"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_18"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_19"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_20"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_21"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_22"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_23"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_24"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_25"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_26"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_27"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_28"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_29"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_30"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_31"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_32"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_33"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_34"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_35"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_36"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-left_37"
            src="@/assets/image/star01.png"
          />
        </div>
        <div class="app-gift__container-happy-cake">
          <img
            class="app-gift__container-happy-cake_01"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-cake_02"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-cake_03"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-cake_04"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-cake_05"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-cake_06"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-cake_07"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-cake_08"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_09"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_10"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_11"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_12"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_13"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_14"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_15"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_16"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_17"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_18"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_19"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_20"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_21"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_22"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_23"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_24"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_25"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_26"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_27"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_28"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_29"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-cake_30"
            src="@/assets/image/star01.png"
          />
        </div>
        <div class="app-gift__container-happy-right">
          <img
            class="app-gift__container-happy-right_01"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_02"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_03"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_04"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_05"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_06"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-right_07"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_08"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_09"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_10"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_11"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_12"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_13"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_14"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_15"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_16"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_17"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_18"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_19"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_20"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_21"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_22"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_23"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_24"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_25"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_26"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_27"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_28"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_29"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_30"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_31"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_32"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_33"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_34"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_35"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_36"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_37"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_38"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_39"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_40"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_41"
            src="@/assets/image/star01.png"
          />
          <img
            class="app-gift__container-happy-right_42"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-right_43"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-right_44"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-right_45"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-right_46"
            src="@/assets/image/star01.png"
          />

          <img
            class="app-gift__container-happy-right_47"
            src="@/assets/image/star01.png"
          />
        </div>
      </div>
    </div>

    <!-- 背景音乐 -->
    <audio ref="music" loop autoplay>
      <source src="@/assets/music.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
