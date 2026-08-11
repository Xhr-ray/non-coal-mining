<template>
  <div class="feature-list">
    <h3>主要特点</h3>
    <ul class="features">
      <li
        v-for="(feature, index) in features"
        :key="index"
        class="feature-item"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="feature-icon">✓</div>
        <div class="feature-text">{{ feature }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  features: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.feature-list {
  margin-bottom: 25px;
}

.feature-list h3 {
  font-size: 20px;
  color: #00bcd4;
  margin-bottom: 15px;
  border-left: 3px solid #00bcd4;
  padding-left: 12px;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  margin-bottom: 10px;
  background: rgba(0, 188, 212, 0.05);
  border: 1px solid rgba(0, 188, 212, 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeInUp 0.5s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-item:hover {
  background: rgba(0, 188, 212, 0.1);
  border-color: rgba(0, 188, 212, 0.4);
  transform: translateX(5px);
}

.feature-icon {
  width: 24px;
  height: 24px;
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-text {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}

@media (max-width: 768px) {
  .feature-list h3 {
    font-size: 18px;
  }

  .feature-item {
    padding: 10px;
    gap: 10px;
  }

  .feature-icon {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }

  .feature-text {
    font-size: 14px;
  }
}
</style>