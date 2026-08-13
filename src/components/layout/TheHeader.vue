<template>
  <header class="the-header">
    <div class="header-content">
      <div class="header-brand">
        <h1 class="header-title">矿山全生命周期展示平台</h1>
        <div class="header-subtitle">Mining Lifecycle Platform</div>
      </div>

      <!-- Desktop Navigation - 隐藏 -->
      <nav class="header-nav" v-if="!isMobile && false">
        <button
          v-for="stage in stages"
          :key="stage.id"
          class="nav-button"
          :class="{ active: currentStage === stage.id }"
          @click="navigateToStage(stage.id)"
          :title="stage.title"
        >
          <span class="nav-icon">{{ stage.icon }}</span>
          <span class="nav-text">{{ stage.title }}</span>
        </button>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="mobile-menu-button"
        v-if="isMobile"
        @click="toggleMobileMenu"
        :aria-expanded="showMobileMenu"
      >
        <span>{{ showMobileMenu ? '✕' : '☰' }}</span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <nav class="mobile-nav" v-if="isMobile && showMobileMenu">
      <button
        v-for="stage in stages"
        :key="stage.id"
        class="mobile-nav-item"
        :class="{ active: currentStage === stage.id }"
        @click="navigateToStage(stage.id)"
      >
        <span class="mobile-nav-icon">{{ stage.icon }}</span>
        <span class="mobile-nav-text">{{ stage.title }}</span>
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMiningStore } from '@/stores/miningStore'
import { useUIStore } from '@/stores/uiStore'

const router = useRouter()
const miningStore = useMiningStore()
const uiStore = useUIStore()

// Responsive state
const windowWidth = ref(window.innerWidth)
const showMobileMenu = ref(false)

// Computed
const isMobile = computed(() => windowWidth.value < 1024)
const stages = computed(() => miningStore.stages)
const currentStage = computed(() => uiStore.currentStage)

// Methods
const navigateToStage = (stageId) => {
  uiStore.setCurrentStage(stageId)
  showMobileMenu.value = false
  router.push({ name: 'stage', params: { stageId } })
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  if (!isMobile.value) {
    showMobileMenu.value = false
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.the-header {
  width: 100%;
  background: linear-gradient(135deg, rgba(10, 25, 41, 0.95) 0%, rgba(26, 35, 50, 0.95) 100%);
  border-bottom: 2px solid #00bcd4;
  flex-shrink: 0;
  z-index: 100;
  position: sticky;
  top: 0;
  backdrop-filter: blur(10px);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.header-brand {
  flex-shrink: 0;
}

.header-title {
  font-size: 28px;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(0, 188, 212, 0.6), 0 2px 10px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
  margin: 0;
  font-weight: 600;
}

.header-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 1px;
  margin-top: 4px;
  text-transform: uppercase;
}

/* Desktop Navigation */
.header-nav {
  display: flex;
  gap: 8px;
  flex: 1;
  justify-content: center;
  overflow-x: auto;
  padding: 0 16px;
}

.nav-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
}

.nav-button:hover {
  background: rgba(0, 188, 212, 0.2);
  border-color: rgba(0, 188, 212, 0.5);
  color: #ffffff;
  transform: translateY(-2px);
}

.nav-button.active {
  background: rgba(0, 188, 212, 0.3);
  border-color: #00bcd4;
  color: #00bcd4;
  box-shadow: 0 0 20px rgba(0, 188, 212, 0.4);
}

.nav-icon {
  font-size: 1.5rem;
}

.nav-text {
  font-size: 0.75rem;
  font-weight: 500;
}

/* Mobile Menu Button */
.mobile-menu-button {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.mobile-menu-button:hover {
  background: rgba(0, 188, 212, 0.2);
  border-color: #00bcd4;
}

/* Mobile Navigation */
.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-height: 400px;
  overflow-y: auto;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: rgba(26, 35, 50, 0.95);
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
}

.mobile-nav-item:hover,
.mobile-nav-item.active {
  background: rgba(0, 188, 212, 0.2);
  color: #00bcd4;
}

.mobile-nav-icon {
  font-size: 1.5rem;
}

.mobile-nav-text {
  font-size: 1rem;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 1200px) {
  .header-content {
    padding: 12px 16px;
  }

  .header-title {
    font-size: 24px;
    letter-spacing: 1px;
  }

  .nav-button {
    min-width: 80px;
    padding: 6px 12px;
  }

  .nav-text {
    font-size: 0.7rem;
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 12px;
    gap: 12px;
  }

  .header-title {
    font-size: 20px;
  }

  .header-subtitle {
    display: none;
  }

  .header-nav {
    display: none;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 16px;
    letter-spacing: 0.5px;
  }

  .mobile-menu-button {
    width: 40px;
    height: 40px;
  }

  .mobile-nav-item {
    padding: 12px 16px;
  }
}
</style>