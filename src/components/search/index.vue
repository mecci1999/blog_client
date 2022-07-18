<script lang="ts" setup></script>

<template>
  <div class="app-search">
    <div class="app-search-dialog">
      <div class="app-search-dialog-header">
        <div class="app-search-dialog-header-title">搜索</div>
        <div class="app-search-dialog-header-button"></div>
      </div>
      <div class="app-search-dialog-panel">
        <div class="app-search-dialog-panel-input">
          <div class="app-search-dialog-panel-input-box">
            <input
              type="text"
              placeholder="输入关键词快速查找"
              role="textbox"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              class="input-field"
            />
          </div>
        </div>
      </div>
      <div class="app-search-dialog-search-result">
        <div class="app-search-dialog-search-result-hits">
          <div class="app-search-dialog-search-result-hits-item">
            <div class="app-search-dialog-search-result-hits-item-link"></div>
          </div>
        </div>
        <div class="app-search-dialog-search-result-pagination"></div>
        <div class="app-search-dialog-search-result-stats"></div>
      </div>
    </div>
    <div class="app-search-mask"></div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
