<template>
  <div class="stage-view">
    <StageSelector />
    <div class="stage-content">
      <!-- 这里可以添加具体的阶段内容 -->
      <div class="stage-details" v-if="currentStageData">
        <h2>{{ currentStageData.title }}</h2>
        <p>{{ currentStageData.description }}</p>

        <div class="stage-processes" v-if="currentStageData.processes && currentStageData.processes.length">
          <h3>工艺流程</h3>
          <div class="process-list">
            <div v-for="process in currentStageData.processes" :key="process.id" class="process-item">
              <div class="process-icon">{{ process.icon }}</div>
              <div class="process-info">
                <h4>{{ process.title }}</h4>
                <p>{{ process.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="no-data" v-else>
        <p>暂无阶段数据</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import StageSelector from '@/components/mining/StageSelector.vue'
import { useMiningStore } from '@/stores/miningStore'

const route = useRoute()
const miningStore = useMiningStore()

const stageId = computed(() => route.params.stageId)

// 获取当前阶段数据
const currentStageData = computed(() => {
  if (!stageId.value) return null
  return miningStore.stages.find(stage => stage.id === stageId.value)
})

// 自动设置当前阶段
if (stageId.value) {
  miningStore.setCurrentStage(stageId.value)
}
</script>

<style scoped>
.stage-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.stage-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  position: relative;
}

.stage-details {
  max-width: 1200px;
  margin: 0 auto;
}

.stage-details h2 {
  color: #00bcd4;
  margin-bottom: 16px;
  font-size: 28px;
}

.stage-details > p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 24px;
  font-size: 16px;
}

.stage-processes {
  margin-top: 32px;
}

.stage-processes h3 {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
  font-size: 20px;
  border-bottom: 2px solid #00bcd4;
  padding-bottom: 10px;
}

.process-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.process-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 188, 212, 0.3);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: all 0.3s ease;
}

.process-item:hover {
  background: rgba(0, 188, 212, 0.1);
  border-color: #00bcd4;
  transform: translateY(-2px);
}

.process-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, rgba(0, 188, 212, 0.2), rgba(0, 188, 212, 0.1));
  border: 1px solid rgba(0, 188, 212, 0.4);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.process-info {
  flex: 1;
}

.process-info h4 {
  color: #ffffff;
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
}

.process-info p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}

.no-data {
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
}

@media (max-width: 768px) {
  .stage-content {
    padding: 16px;
  }

  .stage-details h2 {
    font-size: 24px;
  }

  .process-list {
    grid-template-columns: 1fr;
  }
}
</style>