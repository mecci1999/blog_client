<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import NavBar from '@/components/navBar/index.vue';
import UserInfo from '@/components/user/info/index.vue';
import {
  changeBackgroundImageByTime,
  getCurrnetTime,
} from '@/utils/changeBackgroundImage';
import PostShowInfo from '@/components/post/show/info/index.vue';
import PostShowContent from '@/components/post/show/content/index.vue';
import PostShowFooter from '@/components/post/show/footer/index.vue';
import { useRoute } from 'vue-router';
import CommentPanel from '@/components/comment/index.vue';
import { APP_CLIENT_BASE_URL } from '@/config';
import AppFooter from '@/components/footer/index.vue';

export default defineComponent({
  name: 'PostShow',

  setup() {
    let time = ref('');
    let date: any;
    let style = reactive({
      backgroundImage: '',
    });

    // 博客数据
    const post = {
      id: 1,
      title: '为什么要写博客？',
      description:
        '从0到1独立完成搭建属于自己的个人博客网站，此次开发使用到的技术栈前端为vue3+vite+ts,后端的技术栈为express+mysql。',
      content: `<h1>欢迎使用 Cmd Markdown 编辑阅读器</h1>
<hr>
<p>我们理解您需要更便捷更高效的工具记录思想，整理笔记、知识，并将其中承载的价值传播给他人，<strong>Cmd Markdown</strong> 是我们给出的答案 —— 我们为记录思想和分享知识提供更专业的工具。 您可以使用 Cmd Markdown：</p>
<blockquote>
<ul>
<li>整理知识，学习笔记</li>
<li>发布日记，杂文，所见所想</li>
<li>撰写发布技术文稿（代码支持）</li>
<li>撰写发布学术论文（LaTeX 公式支持）</li>
</ul>
</blockquote>
<p><img src="https://www.zybuluo.com/static/img/logo.png" alt="cmd-markdown-logo"></p>
<p>除了您现在看到的这个 Cmd Markdown 在线版本，您还可以前往以下网址下载：</p>
<h3 id="windowsmaclinux-全平台客户端"><a href="https://www.zybuluo.com/cmd/">Windows/Mac/Linux 全平台客户端</a></h3>
<blockquote>
<p>请保留此份 Cmd Markdown 的欢迎稿兼使用说明，如需撰写新稿件，点击顶部工具栏右侧的 <i class="icon-file"></i> <strong>新文稿</strong> 或者使用快捷键 <code>Ctrl+Alt+N</code>。</p>
</blockquote>
<hr>
<h2 id="什么是-markdown">什么是 Markdown</h2>
<p>Markdown 是一种方便记忆、书写的纯文本标记语言，用户可以使用这些标记符号以最小的输入代价生成极富表现力的文档：譬如您正在阅读的这份文档。它使用简单的符号标记不同的标题，分割不同的段落，<strong>粗体</strong> 或者 <em>斜体</em> 某些文字，更棒的是，它还可以</p>
<h3 id="1-制作一份待办事宜-todo-列表">1. 制作一份待办事宜
 <a href="https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#13-%E5%BE%85%E5%8A%9E%E4%BA%8B%E5%AE%9C-todo-%E5%88%97%E8%A1%A8">Todo 列表</a></h3>
<ul>
<li><input disabled="" type="checkbox"> 支持以 PDF 格式导出文稿</li>
<li><input disabled="" type="checkbox"> 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率</li>
<li><input checked="" disabled="" type="checkbox"> 新增 Todo 列表功能</li>
<li><input checked="" disabled="" type="checkbox"> 修复 LaTex 公式渲染问题</li>
<li><input checked="" disabled="" type="checkbox"> 新增 LaTex 公式编号功能</li>
</ul>
<h3 id="2-书写一个质能守恒公式latex">2. 书写一个质能守恒公式[^LaTeX]</h3>
<p>$$E=mc^2$$</p>
<h3 id="3-高亮一段代码code">3. 高亮一段代码[^code]</h3>
<pre ><code class="language-javasript">
  export const test = () => {
    console.log('Hello,World!);
  }
</code></pre>`,
      wordAmount: '800',
      readTime: '10min',
      created: '2022-06-14 23:26:35',
      updated: '2022-06-15 12:20:20',
      commentAmount: 10,
      accessAmount: 4000,
    };

    onMounted(async () => {
      date = setInterval(() => {
        time.value = getCurrnetTime();
        style.backgroundImage = changeBackgroundImageByTime(
          time.value.slice(0, 2),
        );

        clearInterval(date);
      }, 1000);
    });

    const route = useRoute();
    const link = APP_CLIENT_BASE_URL + route.path;

    return {
      style,
      time,
      post,
      link,
    };
  },

  components: {
    NavBar,
    UserInfo,
    PostShowInfo,
    PostShowContent,
    PostShowFooter,
    CommentPanel,
    AppFooter,
  },
});
</script>

<template>
  <div class="post-show">
    <header class="post-show-header" :style="style">
      <NavBar />
      <div class="post-show-header-title">{{ post.title }}</div>
    </header>
    <main class="post-show-main">
      <div class="post-show-main-header">
        <PostShowInfo :post="post" />
      </div>
      <div class="post-show-main-line"></div>
      <div class="post-show-main-container">
        <PostShowContent :post="post" />
      </div>
      <div class="post-show-main-line"></div>
      <div class="post-show-main-footer">
        <PostShowFooter :link="link" />
      </div>
    </main>
    <CommentPanel />
    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
