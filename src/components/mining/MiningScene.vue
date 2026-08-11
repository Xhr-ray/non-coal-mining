<template>
  <div class="mining-scene">
    <StageFlowChart v-if="currentStageData" :stage="currentStageData" />
    <div v-else class="scene-placeholder">
      <div class="placeholder-content">
        <h2>请选择一个阶段开始探索</h2>
        <p>点击上方的阶段卡片查看详细的流程图</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMiningStore } from '@/stores/miningStore'
import StageFlowChart from './StageFlowChart.vue'

const miningStore = useMiningStore()

const currentStageData = computed(() => miningStore.currentStageData)
</script>

<style scoped>
.mining-scene {
  width: 100%;
  height: 100%;
  position: relative;
  background: #0a1929;
  overflow: hidden;
}

.scene-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at 20% 20%, rgba(0, 188, 212, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 30%, rgba(0, 150, 136, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, #0a1929 0%, #1a2332 100%);
}

.placeholder-content {
  text-align: center;
  color: rgba(255, 255, 255, 0.3);
}

.placeholder-content h2 {
  font-size: 32px;
  margin-bottom: 15px;
  font-weight: 300;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.5);
}

.placeholder-content p {
  font-size: 18px;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .placeholder-content h2 {
    font-size: 24px;
  }

  .placeholder-content p {
    font-size: 16px;
  }
}
</style>