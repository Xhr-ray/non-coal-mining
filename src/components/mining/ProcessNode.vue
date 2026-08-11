<template>
  <div
    class="process-node"
    :class="{ 'safety-node': process.type === 'safety' }"
    @click="handleClick"
  >
    <div class="node-header">
      <div class="node-icon">{{ process.icon || '⚙️' }}</div>
      <div class="node-title">{{ process.title }}</div>
    </div>

    <div v-if="process.description" class="node-description">
      {{ process.description }}
    </div>

    <div class="node-footer">
      <div class="node-meta">
        <span v-if="process.duration" class="meta-item">
          ⏱️ {{ process.duration }}
        </span>
        <span v-if="process.status" class="meta-item status" :class="process.status">
          {{ process.status }}
        </span>
      </div>
      <div class="node-action">查看详情 →</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  process: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', props.process)
}
</script>

<style scoped>
.process-node {
  background: linear-gradient(135deg, rgba(26, 35, 50, 0.9) 0%, rgba(10, 25, 41, 0.9) 100%);
  border: 2px solid rgba(0, 188, 212, 0.4);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.process-node::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at 20% 20%, rgba(0, 188, 212, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.process-node:hover {
  transform: translateY(-4px);
  border-color: #00bcd4;
  box-shadow: 0 8px 30px rgba(0, 188, 212, 0.4);
}

.process-node:hover::before {
  opacity: 1;
}

.process-node.safety-node {
  border-color: rgba(244, 67, 54, 0.6);
  background: linear-gradient(135deg, rgba(40, 25, 26, 0.9) 0%, rgba(25, 10, 11, 0.9) 100%);
}

.process-node.safety-node:hover {
  border-color: #f44336;
  box-shadow: 0 8px 30px rgba(244, 67, 54, 0.4);
}

.node-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 12px;
}

.node-icon {
  font-size: 32px;
  min-width: 50px;
  text-align: center;
  background: rgba(0, 188, 212, 0.2);
  border-radius: 8px;
  padding: 8px;
}

.safety-node .node-icon {
  background: rgba(244, 67, 54, 0.2);
}

.node-title {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  flex: 1;
}

.node-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 15px;
}

.node-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.node-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(0, 188, 212, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid rgba(0, 188, 212, 0.3);
}

.safety-node .meta-item {
  background: rgba(244, 67, 54, 0.1);
  border-color: rgba(244, 67, 54, 0.3);
}

.meta-item.status {
  font-weight: 600;
}

.meta-item.status.normal {
  color: #4caf50;
  background: rgba(76, 175, 80, 0.1);
  border-color: rgba(76, 175, 80, 0.3);
}

.meta-item.status.warning {
  color: #ff9800;
  background: rgba(255, 152, 0, 0.1);
  border-color: rgba(255, 152, 0, 0.3);
}

.node-action {
  font-size: 14px;
  color: #00bcd4;
  font-weight: 600;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.process-node:hover .node-action {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 768px) {
  .process-node {
    padding: 15px;
  }

  .node-header {
    gap: 10px;
  }

  .node-icon {
    font-size: 24px;
    min-width: 40px;
    padding: 6px;
  }

  .node-title {
    font-size: 16px;
  }

  .node-description {
    font-size: 13px;
  }

  .node-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .node-action {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>