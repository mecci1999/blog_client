<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';
import AppIcon from '../app-icon/index.vue';

const props = defineProps({
  // 总页数
  totalPages: {
    type: Number,
    default: 1,
  },

  // 当前页数
  currentPage: {
    type: Number,
    default: 1,
  },

  // 一次性最多展示多少个页数
  mostVisible: {
    type: Number,
    default: 4,
  },
});

const store = useStore();

const isFirstItem = computed(() => props.currentPage === 1);
const isEndItem = computed(() => props.currentPage === props.totalPages);

// 显示情况 通过currentPage和totalPages两个值进行判断
const number = computed(() => {
  // 首先判断currentPage为1的情况
  let text: any;
  if (props.currentPage === 1) {
    if (props.totalPages && props.totalPages > 2) {
      text = 2;
    }
  } else {
    if (props.totalPages === 3 || props.totalPages === 4) {
      text = 2;
    } else {
      text = props.currentPage;
    }
  }

  return text;
});

// 点击页数按钮事件
const onClickNumberItem = (number: number) => {
  store.commit('post/setNextPage', number);
};

// 点击下一页图标
const onClickNextPage = () => {
  store.commit('post/setNextPage');
};

// 点击上一页图标
const onClickPrevPage = () => {
  store.commit('post/setPrevPage');
};
</script>

<template>
  <div class="app-pagination">
    <div
      :class="['app-pagination-prev', { disabled: isFirstItem }]"
      @click="onClickPrevPage"
    >
      <AppIcon name="keyboard_arrow_left" size="24" />
    </div>
    <div class="app-pagination-number">
      <div
        :class="[
          'app-pagination-number-item',
          { active: props.currentPage === 1 },
        ]"
        @click="onClickNumberItem(1)"
      >
        1
      </div>
      <div class="app-pagination-number-space" v-show="currentPage - 1 > 3">
        …
      </div>
      <div
        class="app-pagination-number-item"
        v-show="
          (totalPages && totalPages > 5 && number && number > 3) ||
          (totalPages === 5 && currentPage === 4) ||
          (totalPages === 5 && currentPage === 5)
        "
        @click="onClickNumberItem(number - 2)"
      >
        {{ number && number - 2 }}
      </div>
      <div
        class="app-pagination-number-item"
        v-show="
          (totalPages && totalPages > 5 && number && number > 2) ||
          (totalPages === 5 && currentPage === 3) ||
          (totalPages === 5 && currentPage === 4) ||
          (totalPages === 5 && currentPage === 5)
        "
        @click="onClickNumberItem(number - 1)"
      >
        {{ number && number - 1 }}
      </div>
      <div
        :class="[
          'app-pagination-number-item',
          { active: currentPage === 2 || currentPage === number },
        ]"
        v-show="
          (totalPages && totalPages > 2 && currentPage !== totalPages) ||
          (totalPages === 3 && currentPage === 3) ||
          (totalPages === 4 && currentPage === 4)
        "
        @click="onClickNumberItem(number)"
      >
        {{ number }}
      </div>
      <div
        :class="[
          'app-pagination-number-item',
          { active: totalPages && totalPages < 5 && currentPage === 3 },
        ]"
        v-show="
          (totalPages &&
            totalPages > 3 &&
            totalPages - currentPage > 1 &&
            currentPage !== totalPages) ||
          (totalPages === 4 && currentPage === 3) ||
          (totalPages === 4 && currentPage === 4)
        "
        @click="onClickNumberItem(number + 1)"
      >
        {{ number && number + 1 }}
      </div>
      <div
        :class="[
          'app-pagination-number-item',
          { active: totalPages && totalPages < 5 && currentPage === 4 },
        ]"
        v-show="
          totalPages &&
          totalPages > 4 &&
          totalPages - currentPage > 2 &&
          currentPage !== totalPages
        "
        @click="onClickNumberItem(number + 2)"
      >
        {{ number && number + 2 }}
      </div>
      <div
        class="app-pagination-number-space"
        v-show="totalPages && totalPages - currentPage > 3 && totalPages > 6"
      >
        …
      </div>
      <div
        :class="[
          'app-pagination-number-item',
          { active: currentPage === totalPages },
        ]"
        v-show="totalPages && totalPages > 1"
        @click="onClickNumberItem(totalPages)"
      >
        {{ totalPages }}
      </div>
    </div>
    <div
      :class="['app-pagination-next', { disabled: isEndItem }]"
      @click="onClickNextPage"
    >
      <AppIcon name="keyboard_arrow_right" size="24" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
