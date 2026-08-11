<template>
  <div class="stats-grid">
    <h3>关键数据</h3>
    <div class="stats-container">
      <div
        v-for="(value, key) in stats"
        :key="key"
        class="stat-item"
      >
        <div class="stat-label">{{ key }}</div>
        <div class="stat-value">{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  stats: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped>
.stats-grid {
  margin-bottom: 25px;
}

.stats-grid h3 {
  font-size: 20px;
  color: #00bcd4;
  margin-bottom: 15px;
  border-left: 3px solid #00bcd4;
  padding-left: 12px;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.stat-item {
  background: rgba(0, 188, 212, 0.1);
  border: 1px solid rgba(0, 188, 212, 0.3);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center, rgba(0, 188, 212, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-item:hover {
  background: rgba(0, 188, 212, 0.15);
  border-color: rgba(0, 188, 212, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 188, 212, 0.2);
}

.stat-item:hover::before {
  opacity: 1;
}

.stat-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #00bcd4;
  position: relative;
  z-index: 1;
  text-shadow: 0 0 10px rgba(0, 188, 212, 0.3);
}

@media (max-width: 768px) {
  .stats-grid h3 {
    font-size: 18px;
  }

  .stats-container {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }

  .stat-item {
    padding: 15px;
  }

  .stat-label {
    font-size: 12px;
  }

  .stat-value {
    font-size: 20px;
  }
}
</style>