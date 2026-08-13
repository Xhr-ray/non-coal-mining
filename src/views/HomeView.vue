<template>
  <div class="home-view">
    <!-- 3D视图入口横幅 -->
    <div class="view-entrance-banner">
      <div class="banner-content">
        <div class="banner-text">
          <h1 class="banner-title">矿山全生命周期展示平台</h1>
          <p class="banner-subtitle">Mining Lifecycle Exhibition Platform</p>
          <p class="banner-description">
            体验全新的交互式3D矿山场景，探索从勘探到生态修复的完整生命周期
          </p>
          <router-link to="/3d" class="cta-button">
            <span>进入3D场景</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L10 10M10 10L2 10M10 10L18 10M10 10L10 18" stroke="currentColor" stroke-width="2"/>
            </svg>
          </router-link>
        </div>
        <div class="banner-visual">
          <div class="floating-card card-1">
            <div class="card-icon">🔍</div>
            <div class="card-text">前期准备</div>
          </div>
          <div class="floating-card card-2">
            <div class="card-icon">⛏️</div>
            <div class="card-text">露天开采</div>
          </div>
          <div class="floating-card card-3">
            <div class="card-icon">🏔️</div>
            <div class="card-text">地下开采</div>
          </div>
          <div class="floating-card card-4">
            <div class="card-icon">🌱</div>
            <div class="card-text">生态修复</div>
          </div>
        </div>
      </div>
    </div>

    <StageSelector />
    <MiningScene />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import StageSelector from '@/components/mining/StageSelector.vue'
import MiningScene from '@/components/mining/MiningScene.vue'

onMounted(() => {
  // 可以添加一些初始化逻辑
})
</script>

<style scoped>
.home-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.view-entrance-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 40px;
  position: relative;
  overflow: hidden;
}

.view-entrance-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: pulse 15s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 10;
}

.banner-text {
  color: white;
}

.banner-title {
  font-size: 48px;
  font-weight: 800;
  margin: 0 0 12px 0;
  line-height: 1.1;
  letter-spacing: -1px;
}

.banner-subtitle {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 20px 0;
  opacity: 0.9;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.banner-description {
  font-size: 18px;
  line-height: 1.6;
  margin: 0 0 32px 0;
  opacity: 0.85;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.banner-visual {
  position: relative;
  height: 300px;
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: float 6s ease-in-out infinite;
}

.card-1 {
  top: 0;
  left: 0;
  animation-delay: 0s;
}

.card-2 {
  top: 80px;
  right: 0;
  animation-delay: 1.5s;
}

.card-3 {
  bottom: 40px;
  left: 20px;
  animation-delay: 3s;
}

.card-4 {
  bottom: 0;
  right: 40px;
  animation-delay: 4.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(2deg);
  }
}

.card-icon {
  font-size: 32px;
}

.card-text {
  font-size: 14px;
  font-weight: 600;
}

@media (max-width: 1024px) {
  .banner-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .banner-title {
    font-size: 36px;
  }

  .banner-visual {
    height: 250px;
  }
}

@media (max-width: 768px) {
  .view-entrance-banner {
    padding: 40px 20px;
  }

  .banner-title {
    font-size: 28px;
  }

  .banner-subtitle {
    font-size: 14px;
  }

  .banner-description {
    font-size: 16px;
  }

  .banner-visual {
    height: 200px;
  }

  .floating-card {
    padding: 16px;
  }

  .card-icon {
    font-size: 24px;
  }

  .card-text {
    font-size: 12px;
  }
}
</style>