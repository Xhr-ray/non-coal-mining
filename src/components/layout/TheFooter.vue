<template>
  <footer class="the-footer">
    <div class="footer-content">
      <div class="footer-section">
        <div class="footer-status">
          <div class="status-item">
            <div class="status-indicator online"></div>
            <span>系统运行正常</span>
          </div>
          <div class="status-item" v-if="currentStageName">
            <span class="status-label">当前阶段:</span>
            <span class="status-value">{{ currentStageName }}</span>
          </div>
        </div>
      </div>

      <div class="footer-section">
        <div class="footer-actions">
          <button class="footer-action" @click="goHome" title="返回首页">
            <span>🏠</span>
            <span v-if="!isMobile">首页</span>
          </button>
          <button class="footer-action" @click="toggleTheme" title="切换主题">
            <span>{{ isDarkMode ? "🌙" : "☀️" }}</span>
            <span v-if="!isMobile">主题</span>
          </button>
        </div>
      </div>

      <div class="footer-section">
        <div class="footer-info">
          <span>© 矿山全生命周期展示平台</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useUIStore } from "@/stores/uiStore";
import { useMiningStore } from "@/stores/miningStore";

const router = useRouter();
const uiStore = useUIStore();
const miningStore = useMiningStore();

// Responsive state
const windowWidth = ref(window.innerWidth);

// Computed
const isMobile = computed(() => windowWidth.value < 768);
const isDarkMode = computed(() => uiStore.isDarkMode);
const currentStageName = computed(() => {
  const currentStage = miningStore.stages.find(
    (s) => s.id === uiStore.currentStage,
  );
  return currentStage ? currentStage.title : "";
});

// Methods
const goHome = () => {
  router.push({ name: "home" });
};

const toggleTheme = () => {
  uiStore.toggleDarkMode();
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

// Lifecycle
onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.the-footer {
  width: 100%;
  background: linear-gradient(
    135deg,
    rgba(10, 25, 41, 0.95) 0%,
    rgba(26, 35, 50, 0.95) 100%
  );
  border-top: 1px solid rgba(0, 188, 212, 0.3);
  flex-shrink: 0;
  z-index: 100;
  position: relative;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.footer-section {
  flex: 1;
  display: flex;
  align-items: center;
}

.footer-section:first-child {
  justify-content: flex-start;
}

.footer-section:last-child {
  justify-content: flex-end;
}

.footer-section:nth-child(2) {
  justify-content: center;
}

.footer-status {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.status-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
}

.status-value {
  color: #00bcd4;
  font-weight: 500;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4caf50;
  animation: pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

.status-indicator.online {
  background: #4caf50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.6);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.footer-actions {
  display: flex;
  gap: 8px;
}

.footer-action {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.footer-action:hover {
  background: rgba(0, 188, 212, 0.2);
  border-color: rgba(0, 188, 212, 0.5);
  color: #00bcd4;
}

.footer-info {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  text-align: right;
}

/* Responsive */
@media (max-width: 1200px) {
  .footer-content {
    padding: 12px 16px;
  }

  .status-item {
    font-size: 13px;
  }

  .footer-action {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 12px;
    padding: 12px;
  }

  .footer-section {
    width: 100%;
    justify-content: center !important;
  }

  .footer-status {
    justify-content: center;
    gap: 12px;
  }

  .footer-info {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: 10px;
  }

  .status-item {
    font-size: 12px;
  }

  .footer-action {
    padding: 5px 10px;
    font-size: 12px;
  }

  .footer-info {
    font-size: 11px;
  }
}
</style>
