<template>
  <div class="app-privacy">
    <NavBar />
    <div class="app-privacy__container">
      <h1>隐私政策</h1>
      <p>
        本站非常重视用户的隐私和个人信息保护。你在使用网站时，可能会收集和使用你的相关信息。通过《隐私政策》向你说明在你访问
        <code>blog.darwin.fun</code>
        网站时，如何收集、使用、保存、共享和转让这些信息。
      </p>
      <h2>一、在访问时如何收集和使用你的个人信息</h2>
      <p>
        在访问时，收集访问信息的服务会收集不限于以下信息：
        <b>网络身份标识信息</b>
        （浏览器UA、IP地址）
      </p>
      <p><b>设备信息</b></p>
      <p>
        在访问时，本站内置的第三方服务会通过以下或更多途径，来获取你的以下或更多信息：
      </p>
      <ul>
        <li><b>腾讯云</b>会收集你的访问信息</li>
        <li>
          <b>百度地图</b
          >会在你评论时收集你的IP地址、物理地理位置（只显示省份和市区）信息，不会定位到具体地址
        </li>
      </ul>
      <p>在访问时，本人仅会处于以下目的，使用你的个人信息：</p>
      <ul>
        <li>用于网站的优化与文章分类，用户优化文章</li>
        <li>恶意访问识别，用于维护网站</li>
        <li>恶意攻击排查，用于维护网站</li>
        <li>网站点击情况监测，用于优化网站页面</li>
        <li>网站加载情况监测，用于优化网站性能</li>
        <li>用于网站搜索结果优化</li>
        <li>浏览数据的展示</li>
      </ul>
      <h2>二、在评论时如何收集和使用你的个人信息</h2>
      <p>
        评论使用的是无登陆系统的匿名评论系统，你可以填写真实的、虚假的信息作为你评论的展示信息。鼓励你使用不易被人恶意识别的昵称进行评论，但是建议你填写真实的邮箱以便收到回复。
      </p>
      <p>在你评论时，会额外收集你的个人信息。</p>
      <p>
        在评论时，本站内置的第三方服务会通过以下或更多途径，来获取你的相关信息：
      </p>
      <ul>
        <li>
          <b>百度地图</b
          >会在你评论时收集你的IP地址、物理地理位置（只显示省份和市区）信息，不会定位到具体地址
        </li>
      </ul>
      <p>在访问时，本人仅会处于以下目的，收集并使用以下信息：</p>
      <ul>
        <li>
          评论时会记录你的qq号（如果在邮箱位置填写qq邮箱或qq号），方便获取你的qq头像。如果使用QQ邮箱但不想展示QQ头像，可以填写不含QQ号的QQ邮箱。（主动，存储）
        </li>
        <li>
          评论时会记录你的邮箱，当我回复后会通过邮件通知你（主动，存储，不会公开邮箱）
        </li>
        <li>
          评论时会记录你的IP地址，作为反垃圾的用户判别依据（被动，存储，不会公开IP，会公开IP所在城市）
        </li>
        <li>
          评论会记录你的浏览器代理，用作展示系统版本、浏览器版本方便展示你使用的设备，快速定位问题（被动，存储）
        </li>
      </ul>
      <h2>三、如何使用本地 LocalStorage 存储</h2>
      <p>
        本站为实现无账号评论、深色模式切换等功能，会在你的浏览器中进行本地存储，你可以随时清除浏览器中保存的所有
        LocalStorage。
      </p>
      <p>本博客中的以下业务会在你的计算机上主动存储数据：</p>
      <ul>
        <li>深色模式</li>
      </ul>
      <h2>四、如何共享、转让你的个人信息</h2>
      <p>本人不会与任何公司、组织和个人共享你的隐私信息</p>
      <p>本人不会将你的个人信息转让给任何公司、组织和个人</p>
      <p>第三方服务的共享、转让情况详见对应服务的隐私协议</p>
      <h2>五、附属协议</h2>
      <p>
        当监测到存在恶意访问、恶意请求、恶意攻击、恶意评论的行为时，为了防止增大受害范围，可能会临时将你的ip地址及访问信息短期内添加到黑名单，短期内禁止访问。
      </p>
      <p>
        此黑名单可能被公开，并共享给其他站点（主体并非本人）使用，包括但不限于：IP地址、设备信息、地理位置。
      </p>
    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import NavBar from '@/components/navBar/index.vue';
import AppFooter from '@/components/footer/index.vue';
import { onMounted } from 'vue';

onMounted(() => {
  window.scrollTo({ top: 0 });
});
</script>

<style lang="scss">
@import './index.scss';
</style>
