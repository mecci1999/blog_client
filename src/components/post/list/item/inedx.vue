<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import PostTag from '@/components/post/tag/index.vue';
import { Picture } from '@element-plus/icons-vue';
import { time } from '@/utils/time';

// 属性
const props = defineProps({
  item: {
    type: Object,
  },
});

const router = useRouter();
const store = useStore();

const types = computed(() => store.getters['type/types']);

const onClickPostListItem = (id: number) => {
  // 将博客标题存储到store中
  store.commit('app/setTitle', props.item?.title);
  router.push({ name: 'postShow', params: { postId: id } });
};

const onClickPostListTypeItem = (id: number, title?: string) => {
  // 当前分类
  const type = types.value.find((item: any) => item.id === id);

  store.commit('type/setCurrentPostType', type);

  // 将博客标题存储到store中
  store.commit('app/setTitle', title);

  router.push({ name: 'postCategory', params: { typeId: id } });
};
</script>

<template>
  <div class="post-list-item" @click.stop="onClickPostListItem(item?.id)">
    <div class="post-list-item-media">
      <!-- <img class="post-list-item-media-img" :src="`http://${item?.bgImgUrl}`" /> -->
      <el-image
        style="width: 100%; height: 100%"
        :src="`http://${item?.bgImgUrl}`"
        fit="cover"
      >
        <template #error>
          <div class="image-slot">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
      <!-- <img class="post-list-item-media-img" :src="item?.bgImgUrl" /> -->
    </div>
    <div class="post-list-item-types">
      <div
        class="post-list-item-types-item"
        v-for="type in item?.types"
        :key="type.id"
        @click.stop="onClickPostListTypeItem(type?.id, type?.name)"
      >
        {{ type.name }}
      </div>
    </div>
    <div class="post-list-item-content">
      <div class="post-list-item-content-main">
        <div class="post-list-item-content-main-title">
          {{ item?.title }}
        </div>
        <div class="post-list-item-content-main-text">
          {{ item?.description }}
        </div>
      </div>
      <div class="post-list-item-content-bottom">
        <div class="post-list-item-content-bottom-tags">
          <PostTag v-for="tag in item?.tags" :key="tag.id" :item="tag" />
        </div>
        <div class="post-list-item-content-bottom-date">
          {{ time(item?.created) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './index.scss';
</style>
