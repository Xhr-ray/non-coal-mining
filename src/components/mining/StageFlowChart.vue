<template>
  <div class="stage-flow-chart">
    <div class="flow-chart-container">
      <div class="flow-chart-header">
        <h2>{{ stage.title }}</h2>
        <p>{{ stage.description }}</p>
      </div>

      <div class="flow-processes">
        <div
          v-for="(process, index) in stage.processes"
          :key="process.id"
          class="process-wrapper"
        >
          <ProcessNode
            :process="process"
            :index="index"
            @click="handleProcessClick"
          />
          <div v-if="index < stage.processes.length - 1" class="process-connector">
            <div class="connector-line"></div>
            <div class="connector-arrow">↓</div>
          </div>
        </div>
      </div>

      <SafetyButtons
        v-if="stage.safetyItems && stage.safetyItems.length"
        :safety-items="stage.safetyItems"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import ProcessNode from './ProcessNode.vue'
import SafetyButtons from './SafetyButtons.vue'

const props = defineProps({
  stage: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['process-click'])
const router = useRouter()

const handleProcessClick = (process) => {
  emit('process-click', process)
  router.push(`/detail/${process.id}`)
}
</script>

<style scoped>
.stage-flow-chart {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 40px 20px;
}

.flow-chart-container {
  max-width: 1200px;
  margin: 0 auto;
}

.flow-chart-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(0, 188, 212, 0.3);
}

.flow-chart-header h2 {
  font-size: 36px;
  color: #00bcd4;
  margin-bottom: 15px;
  text-shadow: 0 0 20px rgba(0, 188, 212, 0.5);
}

.flow-chart-header p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.flow-processes {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.process-wrapper {
  width: 100%;
  max-width: 600px;
  position: relative;
}

.process-connector {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.connector-line {
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 188, 212, 0.3), rgba(0, 188, 212, 0.8));
  position: absolute;
}

.connector-arrow {
  font-size: 24px;
  color: #00bcd4;
  background: #0a1929;
  padding: 0 10px;
  z-index: 1;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@media (max-width: 768px) {
  .stage-flow-chart {
    padding: 20px 15px;
  }

  .flow-chart-header h2 {
    font-size: 28px;
  }

  .flow-chart-header p {
    font-size: 16px;
  }

  .process-wrapper {
    max-width: 100%;
  }
}
</style>