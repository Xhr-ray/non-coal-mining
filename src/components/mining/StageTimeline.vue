<template>
  <div class="stage-timeline">
    <div class="timeline-header">
      <h3 class="timeline-title">矿山全生命周期</h3>
      <p class="timeline-subtitle">Mining Lifecycle Timeline</p>
    </div>

    <div class="timeline-track">
      <!-- 时间轴背景线 -->
      <div class="timeline-line"></div>

      <!-- 阶段节点 -->
      <div
        v-for="(stage, index) in stages"
        :key="stage.id"
        class="stage-node"
        :class="{ active: currentStage === stage.id }"
        :style="{ left: getStagePosition(index) + '%' }"
        @click="selectStage(stage.id)"
      >
        <!-- 节点圆点 -->
        <div class="node-dot"></div>

        <!-- 节点标签 -->
        <div class="node-label">
          <div class="label-title">{{ stage.name }}</div>
          <div class="label-subtitle">{{ stage.nameEn }}</div>
        </div>

        <!-- 连接线（除了最后一个节点） -->
        <div
          v-if="index < stages.length - 1"
          class="node-connector"
          :style="{ width: getConnectorWidth(index) + '%' }"
        ></div>
      </div>

      <!-- 进度条 -->
      <div
        class="timeline-progress"
        :style="{ width: progressWidth + '%' }"
      ></div>
    </div>

    <!-- 当前阶段详情 -->
    <div v-if="currentStageInfo" class="current-stage-details">
      <div class="detail-item">
        <span class="detail-label">阶段</span>
        <span class="detail-value">{{ currentStageInfo.name }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">周期</span>
        <span class="detail-value">{{ currentStageInfo.duration }}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">状态</span>
        <span class="detail-value status-badge" :style="{ backgroundColor: currentStageInfo.color }">
          {{ currentStage === stages[stages.length - 1].id ? '最终阶段' : '进行中' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  currentStage: {
    type: String,
    required: true
  }
})

// Emits
const emit = defineEmits(['stage-select'])

// 阶段数据 - 按照正确的矿山开采逻辑顺序
// 1. 前期准备
// 2. 露天开采和地下开采（并列结构）
// 3. 生态治理闭坑复垦
// 注意：辅助生产系统作为开采时的生产支持系统，不在时间线上单独显示
const stages = [
  {
    id: 'exploration',
    name: '前期准备',
    nameEn: 'Preparation',
    duration: '1-3年',
    color: '#00BCD4'
  },
  {
    id: 'open-pit',  // 露天开采（与地下开采并列）
    name: '露天开采',
    nameEn: 'Open Pit',
    duration: '10-30年',
    color: '#FF9800'
  },
  {
    id: 'underground',  // 地下开采（与露天开采并列）
    name: '地下开采',
    nameEn: 'Underground',
    duration: '15-40年',
    color: '#9C27B0'
  },
  {
    id: 'reclamation',  // 生态治理闭坑复垦
    name: '生态治理',
    nameEn: 'Reclamation',
    duration: '5-10年',
    color: '#4CAF50'
  }
]

// 计算属性
const currentStageInfo = computed(() => {
  return stages.find(stage => stage.id === props.currentStage)
})

const currentStageIndex = computed(() => {
  return stages.findIndex(stage => stage.id === props.currentStage)
})

const progressWidth = computed(() => {
  if (currentStageIndex.value === -1) return 0
  return ((currentStageIndex.value + 1) / stages.length) * 100
})

// 方法
const getStagePosition = (index) => {
  return (index / (stages.length - 1)) * 100
}

const getConnectorWidth = (index) => {
  return 100 / (stages.length - 1)
}

const selectStage = (stageId) => {
  console.log('StageTimeline: 选择阶段', stageId)
  emit('stage-select', stageId)
}
</script>

<style scoped>
.stage-timeline {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 0 auto;
}

.timeline-header {
  text-align: center;
  margin-bottom: 32px;
}

.timeline-title {
  margin: 0 0 4px 0;
  font-size: 20px;
  font-weight: 700;
  color: #333;
}

.timeline-subtitle {
  margin: 0;
  font-size: 14px;
  color: #888;
  font-weight: 500;
  letter-spacing: 1px;
}

.timeline-track {
  position: relative;
  height: 80px;
  margin: 0 40px;
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 3px;
  background: #E0E0E0;
  border-radius: 2px;
  transform: translateY(-50%);
}

.stage-node {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s ease;
}

.stage-node:hover .node-dot {
  transform: scale(1.2);
  box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.05);
}

.stage-node.active .node-dot {
  transform: scale(1.3);
  box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.08);
}

.node-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #BDBDBD;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.stage-node.active .node-dot {
  background: currentColor;
}

/* 根据新顺序设置激活状态颜色：前期准备、露天开采、地下开采、生态治理 */
.stage-node:nth-child(2).active .node-dot {
  background: #00BCD4;  /* 前期准备 */
}

.stage-node:nth-child(3).active .node-dot {
  background: #FF9800;  /* 露天开采 */
}

.stage-node:nth-child(4).active .node-dot {
  background: #9C27B0;  /* 地下开采 */
}

.stage-node:nth-child(5).active .node-dot {
  background: #4CAF50;  /* 生态治理 */
}

.node-label {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  text-align: center;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.stage-node.active .node-label {
  opacity: 1;
}

.label-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
}

.label-subtitle {
  font-size: 11px;
  color: #888;
  font-weight: 500;
}

.node-connector {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 3px;
  background: linear-gradient(to right, #E0E0E0, #BDBDBD);
  transform: translateY(-50%);
  z-index: 1;
}

.timeline-progress {
  position: absolute;
  top: 50%;
  left: 0;
  height: 3px;
  /* 按新顺序设置颜色渐变：前期准备、露天开采、地下开采、生态治理 */
  background: linear-gradient(to right, #00BCD4, #FF9800, #9C27B0, #4CAF50);
  transform: translateY(-50%);
  border-radius: 2px;
  z-index: 1;
  transition: width 0.5s ease;
}

.current-stage-details {
  display: flex;
  justify-content: space-around;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #E0E0E0;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.detail-label {
  font-size: 12px;
  color: #888;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  color: white;
  font-size: 12px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .stage-timeline {
    padding: 16px;
    margin: 0 10px;
  }

  .timeline-track {
    height: 60px;
    margin: 0 20px;
  }

  .node-dot {
    width: 12px;
    height: 12px;
  }

  .node-label {
    top: 30px;
  }

  .label-title {
    font-size: 12px;
  }

  .label-subtitle {
    font-size: 10px;
  }

  .current-stage-details {
    flex-direction: column;
    gap: 12px;
  }

  .detail-item {
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
  }
}
</style>