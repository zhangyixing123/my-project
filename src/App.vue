<template>
  <!-- <van-config-provider :theme-vars="themeVars">
    <waterfall-list />
  </van-config-provider> -->
<div>asdsadsa</div>
</template>

<script setup>
import { ref } from 'vue'
import WaterfallList from './components/WaterfallList.vue'

const themeVars = ref({
  colGutter: '8px',
  paddingMd: '12px'
})
</script>

<style>
/* 移动端优化 */
body {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
}

.waterfall-container {
  padding: 0 8px;
}

/* 视频卡片优化 */
.card-item {
  margin-bottom: 8px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

video::-webkit-media-controls {
  display: none !important;
}

body {
  max-width: 750px;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}

#app {
  padding: 12px;
}
</style>
