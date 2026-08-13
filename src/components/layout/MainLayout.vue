<template>
  <div class="main-layout" :class="{ 'dark-mode': isDarkMode }">
    <TheHeader />
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition :key="route.fullPath" name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import TheHeader from './TheHeader.vue'
import TheFooter from './TheFooter.vue'
import { useUIStore } from '@/stores/uiStore'

const uiStore = useUIStore()

// Computed
const isDarkMode = computed(() => uiStore.isDarkMode)

// Lifecycle
onMounted(() => {
  // Initialize any global settings
  document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px')

  // Listen for resize events to update --vh
  window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px')
  })
})
</script>

<style scoped>
.main-layout {
  width: 100%;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #0a1929 0%, #1a2332 100%);
  color: #ffffff;
}

.main-layout.dark-mode {
  background: linear-gradient(135deg, #051019 0%, #0f1926 100%);
}

.main-content {
  flex: 1;
  overflow: auto;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 188, 212, 0.5) rgba(10, 25, 41, 0.3);
}

.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: rgba(10, 25, 41, 0.3);
}

.main-content::-webkit-scrollbar-thumb {
  background: rgba(0, 188, 212, 0.5);
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 188, 212, 0.7);
}

/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    overflow-x: hidden;
  }
}

@media (max-width: 480px) {
  .main-layout {
    min-height: calc(var(--vh, 1vh) * 100 - 60px);
  }
}
</style>