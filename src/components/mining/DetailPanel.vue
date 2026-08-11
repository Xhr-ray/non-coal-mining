<template>
  <div class="detail-panel">
    <button class="close-button" @click="close">×</button>

    <div class="detail-content">
      <div class="detail-header">
        <div class="detail-icon">{{ detailData.icon || '⚙️' }}</div>
        <h2>{{ detailData.title }}</h2>
        <div v-if="detailData.type" class="detail-type" :class="detailData.type">
          {{ typeText[detailData.type] }}
        </div>
      </div>

      <div class="detail-body">
        <!-- 图片展示区域 -->
        <ImageGallery
          v-if="detailData.images && detailData.images.length"
          :images="detailData.images"
        />

        <!-- 详细描述区域 -->
        <div class="detail-description">
          <h3>详细说明</h3>
          <DescriptionContent :content="detailData.longDescription || detailData.shortDescription" />
        </div>

        <!-- 主要特点 -->
        <FeatureList
          v-if="detailData.features && detailData.features.length"
          :features="detailData.features"
        />

        <!-- 关键数据 -->
        <StatsGrid
          v-if="detailData.stats"
          :stats="detailData.stats"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import ImageGallery from '@/components/common/ImageGallery.vue'
import DescriptionContent from '@/components/common/DescriptionContent.vue'
import FeatureList from '@/components/common/FeatureList.vue'
import StatsGrid from '@/components/common/StatsGrid.vue'

const props = defineProps({
  detailData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const typeText = {
  safety: '安全红线',
  process: '工艺流程',
  system: '辅助系统'
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.detail-panel {
  background: linear-gradient(135deg, rgba(10, 25, 41, 0.95) 0%, rgba(26, 35, 50, 0.95) 100%);
  border: 2px solid #00bcd4;
  border-radius: 15px;
  max-width: 1200px;
  max-height: 85vh;
  width: 85%;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 188, 212, 0.3);
  position: relative;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.close-button {
  position: absolute;
  top: 15px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 188, 212, 0.2);
  color: #00bcd4;
  font-size: 28px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.close-button:hover {
  background: rgba(0, 188, 212, 0.4);
  transform: rotate(90deg);
}

.detail-content {
  padding: 40px 30px 30px;
}

.detail-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 188, 212, 0.3);
  position: relative;
}

.detail-icon {
  font-size: 64px;
  margin-bottom: 15px;
}

.detail-header h2 {
  font-size: 32px;
  color: #00bcd4;
  margin: 0 0 10px 0;
  text-shadow: 0 0 15px rgba(0, 188, 212, 0.5);
}

.detail-type {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 15px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.detail-type.safety {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.5);
}

.detail-type.process {
  background: rgba(0, 188, 212, 0.2);
  color: #00bcd4;
  border: 1px solid rgba(0, 188, 212, 0.5);
}

.detail-type.system {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.5);
}

.detail-body {
  color: #ffffff;
}

.detail-description {
  margin-bottom: 25px;
}

.detail-description h3 {
  font-size: 20px;
  color: #00bcd4;
  margin-bottom: 15px;
  border-left: 3px solid #00bcd4;
  padding-left: 12px;
}

.detail-panel::-webkit-scrollbar {
  width: 8px;
}

.detail-panel::-webkit-scrollbar-track {
  background: rgba(0, 188, 212, 0.1);
  border-radius: 4px;
}

.detail-panel::-webkit-scrollbar-thumb {
  background: rgba(0, 188, 212, 0.5);
  border-radius: 4px;
}

.detail-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 188, 212, 0.7);
}

@media (max-width: 768px) {
  .detail-panel {
    width: 95%;
    max-height: 90vh;
  }

  .detail-content {
    padding: 30px 20px 20px;
  }

  .detail-header {
    margin-bottom: 20px;
  }

  .detail-icon {
    font-size: 48px;
  }

  .detail-header h2 {
    font-size: 24px;
  }

  .close-button {
    width: 35px;
    height: 35px;
    font-size: 24px;
    top: 10px;
    right: 15px;
  }
}
</style>