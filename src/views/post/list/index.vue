<script lang="ts" setup>
import NavBar from '@/components/navBar/index.vue';
import AppFooter from '@/components/footer/index.vue';
import PostIndex from '@/components/post/index/index.vue';
import { getPostsApi } from '@/api/index'
import { onMounted,ref,watch } from 'vue';
import AppPagination from '@/components/common/pagination/index.vue'

// 当前页数
const curPage = ref(1)
// 总数
const totalCount = ref(0)

// 总页数
const totalPages = ref(1)

// 当前posts
const posts = ref([])

watch(() => curPage.value,async (val) => {
  if(val) {
    const response =  await getPostsApi(val)
    posts.value = response.data
    totalCount.value = parseInt(`${response.headers['X-Total-Count'] || response.headers['x-total-count']}`, 10)
    totalPages.value = Math.ceil(totalCount.value / 10)
  }
}, {
  immediate:false
})

onMounted(async() => {
 const response = await getPostsApi(curPage.value)
 posts.value = response.data
 totalCount.value = parseInt(`${response.headers['X-Total-Count'] || response.headers['x-total-count']}`, 10)
 totalPages.value = Math.ceil(totalCount.value / 10)
})
</script>

<template>
  <div class="post-article">
    <NavBar />
    <div class="post-article-container">
      <PostIndex :posts="posts" title="文章 - " :amount="totalCount" />
    </div>
    <AppPagination :currentPage="curPage" :totalPages="totalPages" />
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
