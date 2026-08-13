<template>
  <transition name="slide-in">
    <div v-if="show" class="hotspot-detail-panel" :class="{ 'is-visible': show }">
      <!-- 关闭按钮 -->
      <button class="close-button" @click="close">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- 热点内容 -->
      <div class="panel-content">
        <!-- 标题区域 -->
        <div class="panel-header">
          <div class="hotspot-icon">📍</div>
          <h2 class="panel-title">{{ hotspotData?.title }}</h2>
        </div>

        <!-- 描述 -->
        <p class="panel-description">{{ hotspotData?.description }}</p>

        <!-- 详细信息列表 -->
        <div v-if="hotspotData?.details && hotspotData.details.length" class="detail-list">
          <h3 class="list-title">详细信息</h3>
          <ul class="list-items">
            <li v-for="(detail, index) in hotspotData.details" :key="index">
              <span class="bullet-point"></span>
              {{ detail }}
            </li>
          </ul>
        </div>

        <!-- 相关图片 -->
        <div v-if="hotspotData?.images && hotspotData.images.length" class="image-gallery">
          <h3 class="gallery-title">相关图片</h3>
          <div class="gallery-images">
            <div
              v-for="(image, index) in hotspotData.images"
              :key="index"
              class="gallery-item"
            >
              <img :src="image.src" :alt="image.alt">
              <div class="image-caption">{{ image.caption }}</div>
            </div>
          </div>
        </div>

        <!-- 相关数据统计 -->
        <div v-if="hotspotData?.stats" class="stats-grid">
          <h3 class="stats-title">关键数据</h3>
          <div class="stats-items">
            <div
              v-for="(value, key) in hotspotData.stats"
              :key="key"
              class="stat-item"
            >
              <div class="stat-label">{{ key }}</div>
              <div class="stat-value">{{ value }}</div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="panel-actions">
          <button class="action-button secondary" @click="close">
            关闭
          </button>
          <button
            v-if="hotspotData?.id"
            class="action-button primary"
            @click="viewMore"
          >
            了解更多
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  hotspotData: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['close', 'view-more'])

// 方法
const close = () => {
  emit('close')
}

const viewMore = () => {
  if (props.hotspotData?.id) {
    emit('view-more', props.hotspotData.id)
  }
}

// 监听显示状态变化，添加/移除body滚动锁定
watch(() => props.show, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.hotspot-detail-panel {
  position: fixed;
  right: 20px;
  top: 20px;
  bottom: 20px;
  width: 400px;
  max-width: calc(100% - 40px);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: all 0.3s ease;
  z-index: 10;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  padding-top: 60px;
}

.panel-content::-webkit-scrollbar {
  width: 6px;
}

.panel-content::-webkit-scrollbar-track {
  background: transparent;
}

.panel-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.hotspot-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.panel-title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #333;
  line-height: 1.2;
}

.panel-description {
  margin: 0 0 24px 0;
  font-size: 15px;
  line-height: 1.6;
  color: #666;
}

.detail-list {
  margin-bottom: 24px;
}

.list-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.list-items {
  margin: 0;
  padding: 0;
  list-style: none;
}

.list-items li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #555;
  border-bottom: 1px solid #F0F0F0;
}

.list-items li:last-child {
  border-bottom: none;
}

.bullet-point {
  width: 6px;
  height: 6px;
  background: #667eea;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
}

.image-gallery {
  margin-bottom: 24px;
}

.gallery-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.gallery-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.gallery-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #F5F5F5;
}

.gallery-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 12px;
  line-height: 1.3;
}

.stats-grid {
  margin-bottom: 24px;
}

.stats-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.stats-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat-item {
  background: #F8F9FA;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}

.stat-label {
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.panel-actions {
  display: flex;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #E0E0E0;
}

.action-button {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-button.secondary {
  background: #F5F5F5;
  color: #666;
}

.action-button.secondary:hover {
  background: #E0E0E0;
}

.action-button.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-button.primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* 过渡动画 */
.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.3s ease;
}

.slide-in-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-in-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .hotspot-detail-panel {
    right: 10px;
    left: 10px;
    top: auto;
    bottom: 10px;
    width: auto;
    max-width: none;
    max-height: 70vh;
  }

  .panel-content {
    padding-top: 50px;
  }

  .gallery-images {
    grid-template-columns: 1fr;
  }

  .stats-items {
    grid-template-columns: 1fr;
  }
}
</style>