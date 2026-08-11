<template>
  <div class="safety-buttons">
    <div class="safety-header">
      <h3>🛡️ 安全管理红线</h3>
      <p>重点关注矿山安全关键控制点</p>
    </div>

    <div class="safety-grid">
      <div
        v-for="item in safetyItems"
        :key="item.id"
        class="safety-item"
        @click="handleSafetyClick(item)"
      >
        <div class="safety-icon">{{ item.icon || '⚠️' }}</div>
        <div class="safety-content">
          <div class="safety-title">{{ item.title }}</div>
          <div class="safety-description">{{ item.description }}</div>
        </div>
        <div class="safety-level" :class="item.level || 'high'">
          {{ levelText[item.level || 'high'] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  safetyItems: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['safety-click'])
const router = useRouter()

const levelText = {
  critical: '特别重要',
  high: '重要',
  medium: '中等',
  low: '一般'
}

const handleSafetyClick = (item) => {
  emit('safety-click', item)
  router.push(`/detail/${item.id}`)
}
</script>

<style scoped>
.safety-buttons {
  margin-top: 40px;
  padding: 30px;
  background: linear-gradient(135deg, rgba(40, 25, 26, 0.3) 0%, rgba(25, 10, 11, 0.3) 100%);
  border: 2px solid rgba(244, 67, 54, 0.4);
  border-radius: 16px;
}

.safety-header {
  text-align: center;
  margin-bottom: 25px;
}

.safety-header h3 {
  font-size: 28px;
  color: #f44336;
  margin-bottom: 10px;
  text-shadow: 0 0 15px rgba(244, 67, 54, 0.5);
}

.safety-header p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
}

.safety-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.safety-item {
  background: linear-gradient(135deg, rgba(40, 25, 26, 0.8) 0%, rgba(25, 10, 11, 0.8) 100%);
  border: 2px solid rgba(244, 67, 54, 0.5);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  position: relative;
  overflow: hidden;
}

.safety-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at 20% 20%, rgba(244, 67, 54, 0.15) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.safety-item:hover {
  transform: translateY(-4px);
  border-color: #f44336;
  box-shadow: 0 8px 30px rgba(244, 67, 54, 0.4);
}

.safety-item:hover::before {
  opacity: 1;
}

.safety-icon {
  font-size: 32px;
  min-width: 50px;
  text-align: center;
  background: rgba(244, 67, 54, 0.2);
  border-radius: 8px;
  padding: 8px;
  position: relative;
  z-index: 1;
}

.safety-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

.safety-title {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
}

.safety-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

.safety-level {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 1;
}

.safety-level.critical {
  background: rgba(244, 67, 54, 0.3);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.6);
}

.safety-level.high {
  background: rgba(255, 152, 0, 0.3);
  color: #ff9800;
  border: 1px solid rgba(255, 152, 0, 0.6);
}

.safety-level.medium {
  background: rgba(255, 193, 7, 0.3);
  color: #ffc107;
  border: 1px solid rgba(255, 193, 7, 0.6);
}

.safety-level.low {
  background: rgba(76, 175, 80, 0.3);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.6);
}

@media (max-width: 768px) {
  .safety-buttons {
    padding: 20px 15px;
    margin-top: 30px;
  }

  .safety-header h3 {
    font-size: 24px;
  }

  .safety-header p {
    font-size: 14px;
  }

  .safety-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .safety-item {
    padding: 15px;
  }

  .safety-icon {
    font-size: 24px;
    min-width: 40px;
    padding: 6px;
  }

  .safety-title {
    font-size: 14px;
  }

  .safety-description {
    font-size: 13px;
  }

  .safety-level {
    font-size: 10px;
    padding: 3px 8px;
  }
}
</style>