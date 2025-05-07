<template>
  <div class="waterfall-container">
    <van-row gutter="8">
      <van-col v-for="(col, index) in columns" :key="index" span="12" class="waterfall-col">
        <div v-for="item in col" :key="item.id" class="card-item"
          :style="{ height: `${item.height}px`, marginBottom: '8px' }">
          <div class="content-wrapper">
            <van-image v-if="item.type === 'image'" :src="item.src" fit="cover"
              :style="{ height: `${item.height}px`, borderRadius: '8px' }" />
            <video v-else :src="item.src" controls autoplay muted loop playsinline @touchstart="handleVideoTouch"
              @touchmove="handleVideoTouchMove" :style="{
                width: '100%',
                height: `${item.height}px`,
                borderRadius: '8px',
                backgroundColor: '#000'
              }"></video>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Col, Row, Image, Toast } from 'vant'
import { generateMockData } from '../utils/mockData'

const columns = ref([[], []])

// 响应窗口大小变化
window.addEventListener('resize', () => {
  columns.value = calculateColumns(generateMockData())
})

// 视频触摸控制
const touchStartY = ref(0)
const handleVideoTouch = (e) => {
  touchStartY.value = e.touches[0].clientY
  e.target.play()
  Toast('音量调节：上下滑动手指')
}
const handleVideoTouchMove = (e) => {
  const video = e.target
  const deltaY = e.touches[0].clientY - touchStartY.value
  video.volume = Math.min(Math.max(1 - deltaY / 100, 0), 1)
}

const calculateColumns = (data) => {
  const cols = [[], []]
  let colHeights = [0, 0]
  const containerWidth = document.querySelector('.waterfall-container').offsetWidth
  const columnWidth = (containerWidth - 8) / 2

  data.forEach(item => {
    const minHeight = Math.min(...colHeights)
    const colIndex = colHeights.indexOf(minHeight)

    cols[colIndex].push(item)
    colHeights[colIndex] += item.height + 8 // 8px为底部间距
  })

  return cols
}

onMounted(() => {
  const urlParams = new URLSearchParams(location.search)
  const seedParam = urlParams.get('seed') || Date.now()
  const data = generateMockData(seedParam)
  columns.value = calculateColumns(data)
})
</script>

<style scoped>
.waterfall-container {
  padding: 0 8px;
}

.waterfall-col {
  display: flex;
  flex-direction: column;
}

.card-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>