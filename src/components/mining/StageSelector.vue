<template>
  <div class="stage-selector">
    <div class="stage-container">
      <div
        v-for="stage in stages"
        :key="stage.id"
        class="stage-card"
        :class="{ active: currentStage === stage.id }"
        @click="selectStage(stage.id)"
      >
        <div class="stage-icon">{{ stage.icon }}</div>
        <div class="stage-info">
          <div class="stage-title">{{ stage.title }}</div>
          <div class="stage-subtitle">{{ stage.subtitle }}</div>
        </div>
        <div class="stage-arrow">→</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMiningStore } from '@/stores/miningStore'

const miningStore = useMiningStore()

const stages = computed(() => miningStore.stages)
const currentStage = computed(() => miningStore.currentStage)

const selectStage = (stageId) => {
  miningStore.setCurrentStage(stageId)
}
</script>

<style scoped>
.stage-selector {
  width: 100%;
  padding: 20px 0;
  background: rgba(10, 25, 41, 0.5);
  border-bottom: 1px solid rgba(0, 188, 212, 0.3);
}

.stage-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 15px;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: #00bcd4 rgba(0, 188, 212, 0.2);
}

.stage-container::-webkit-scrollbar {
  height: 6px;
}

.stage-container::-webkit-scrollbar-track {
  background: rgba(0, 188, 212, 0.1);
  border-radius: 3px;
}

.stage-container::-webkit-scrollbar-thumb {
  background: #00bcd4;
  border-radius: 3px;
}

.stage-card {
  flex: 1;
  min-width: 200px;
  max-width: 250px;
  background: rgba(26, 35, 50, 0.8);
  border: 2px solid rgba(0, 188, 212, 0.3);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 15px;
}

.stage-card:hover {
  background: rgba(26, 35, 50, 0.95);
  border-color: #00bcd4;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 188, 212, 0.3);
}

.stage-card.active {
  background: linear-gradient(135deg, rgba(0, 188, 212, 0.2) 0%, rgba(0, 150, 136, 0.2) 100%);
  border-color: #00bcd4;
  box-shadow: 0 4px 20px rgba(0, 188, 212, 0.4);
}

.stage-icon {
  font-size: 32px;
  min-width: 50px;
  text-align: center;
}

.stage-info {
  flex: 1;
}

.stage-title {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 5px;
}

.stage-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.stage-arrow {
  font-size: 20px;
  color: rgba(0, 188, 212, 0.6);
  transition: transform 0.3s ease;
}

.stage-card:hover .stage-arrow {
  transform: translateX(5px);
  color: #00bcd4;
}

@media (max-width: 1024px) {
  .stage-container {
    flex-direction: column;
    overflow-x: visible;
  }

  .stage-card {
    max-width: 100%;
    min-width: 100%;
  }

  .stage-arrow {
    transform: rotate(90deg);
  }

  .stage-card:hover .stage-arrow {
    transform: rotate(90deg) translateX(5px);
  }
}

@media (max-width: 768px) {
  .stage-selector {
    padding: 15px 0;
  }

  .stage-card {
    padding: 15px;
  }

  .stage-icon {
    font-size: 24px;
    min-width: 40px;
  }

  .stage-title {
    font-size: 14px;
  }

  .stage-subtitle {
    font-size: 11px;
  }
}
</style>