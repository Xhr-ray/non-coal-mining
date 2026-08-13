<template>
  <div class="mining-3d-view">
    <!-- 3D场景区域 -->
    <Mining3DScene
      ref="sceneRef"
      :initial-stage="currentStage"
      @stage-changed="onStageChanged"
      @hotspot-clicked="onHotspotClicked"
      @scene-ready="onSceneReady"
    />

    <!-- 时间轴控制 -->
    <div class="timeline-container">
      <StageTimeline
        :current-stage="currentStage"
        @stage-select="onStageSelect"
      />
    </div>

    <!-- 热点详情面板 -->
    <HotspotDetail
      :show="showHotspotDetail"
      :hotspot-data="selectedHotspot"
      @close="closeHotspotDetail"
      @view-more="onViewMore"
    />

    <!-- 场景控制按钮 -->
    <div class="scene-controls">
      <button
        class="control-button"
        title="重置视角"
        @click="resetCamera"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L10 10M10 10L2 10M10 10L18 10M10 10L10 18" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
      <button
        class="control-button"
        title="自动旋转"
        :class="{ active: autoRotate }"
        @click="toggleAutoRotate"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 18A8 8 0 1 0 10 2A8 8 0 0 0 10 18Z" stroke="currentColor" stroke-width="2"/>
          <path d="M10 6V10L13 13" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
      <button
        class="control-button"
        title="全屏模式"
        @click="toggleFullscreen"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 4H8V2H2V8H4V4Z" fill="currentColor"/>
          <path d="M16 4H12V2H18V8H16V4Z" fill="currentColor"/>
          <path d="M4 16H8V18H2V12H4V16Z" fill="currentColor"/>
          <path d="M16 16H12V18H18V12H16V16Z" fill="currentColor"/>
        </svg>
      </button>
    </div>

    <!-- 加载遮罩 -->
    <transition name="fade">
      <div v-if="loading" class="loading-mask">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <p>3D场景加载中...</p>
          <div class="loading-tips">
            <span>💡 提示：使用鼠标拖动旋转视角，滚轮缩放</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import * as THREE from 'three'
import Mining3DScene from '@/components/mining/Mining3DScene.vue'
import StageTimeline from '@/components/mining/StageTimeline.vue'
import HotspotDetail from '@/components/mining/HotspotDetail.vue'

// 路由
const router = useRouter()

// Refs
const sceneRef = ref(null)
const currentStage = ref('exploration')
const loading = ref(true)
const autoRotate = ref(false)
const showHotspotDetail = ref(false)
const selectedHotspot = ref(null)

// 生命周期
onMounted(() => {
  // 检查URL参数中是否有指定阶段
  const urlParams = new URLSearchParams(window.location.search)
  const stageParam = urlParams.get('stage')
  if (stageParam && ['exploration', 'open-pit', 'underground', 'reclamation'].includes(stageParam)) {
    currentStage.value = stageParam
  }

  // 添加键盘快捷键
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// 方法
const onSceneReady = (data) => {
  console.log('场景准备就绪:', data)
  loading.value = false
}

const onStageChanged = (data) => {
  console.log('阶段已切换:', data)
  currentStage.value = data.to

  // 清除loading状态
  loading.value = false

  // 更新URL
  const url = new URL(window.location)
  url.searchParams.set('stage', data.to)
  window.history.replaceState({}, '', url)
}

const onStageSelect = (stageId) => {
  console.log('选择了阶段:', stageId)
  if (sceneRef.value && sceneRef.value.switchStage) {
    loading.value = true
    console.log('调用switchStage:', stageId)
    sceneRef.value.switchStage(stageId)

    // 添加超时保护，防止一直显示loading
    setTimeout(() => {
      loading.value = false
      console.log('超时保护触发，强制清除loading状态')
    }, 3000)
  } else {
    console.error('场景引用或switchStage方法不可用')
    loading.value = false
  }
}

const onHotspotClicked = (data) => {
  console.log('热点被点击:', data)
  selectedHotspot.value = data.hotspotData
  showHotspotDetail.value = true
}

const closeHotspotDetail = () => {
  showHotspotDetail.value = false
  // 延迟清空数据，等待动画完成
  setTimeout(() => {
    selectedHotspot.value = null
  }, 300)
}

const onViewMore = (hotspotId) => {
  console.log('查看更多:', hotspotId)
  // 可以跳转到详情页面或打开更多信息
  router.push({
    name: 'detail',
    params: { id: hotspotId }
  })
}

const resetCamera = () => {
  if (sceneRef.value && sceneRef.value.getSceneController) {
    const controller = sceneRef.value.getSceneController()
    if (controller && controller.sceneManager) {
      const target = controller.sceneManager.controls.target
      const camera = controller.sceneManager.camera

      // 重置到当前阶段默认位置
      const positions = {
        exploration: { pos: new THREE.Vector3(150, 100, 150), target: new THREE.Vector3(0, 10, 0) },
        'open-pit': { pos: new THREE.Vector3(200, 150, 200), target: new THREE.Vector3(0, -30, 0) },
        underground: { pos: new THREE.Vector3(180, 120, 180), target: new THREE.Vector3(0, -50, 0) },
        reclamation: { pos: new THREE.Vector3(200, 100, 200), target: new THREE.Vector3(0, 20, 0) }
      }

      const defaultPos = positions[currentStage.value] || positions.exploration
      controller.sceneManager.animateCamera(defaultPos.pos, defaultPos.target, 1.5)
    }
  }
}

const toggleAutoRotate = () => {
  autoRotate.value = !autoRotate.value
  if (sceneRef.value && sceneRef.value.getSceneController) {
    const controller = sceneRef.value.getSceneController()
    if (controller && controller.sceneManager && controller.sceneManager.controls) {
      controller.sceneManager.controls.autoRotate = autoRotate.value
      controller.sceneManager.controls.autoRotateSpeed = 2.0
    }
  }
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const handleKeydown = (event) => {
  // ESC键关闭热点详情
  if (event.key === 'Escape' && showHotspotDetail.value) {
    closeHotspotDetail()
  }

  // 数字键快速切换阶段
  const stageKeys = {
    '1': 'exploration',
    '2': 'open-pit',
    '3': 'underground',
    '4': 'reclamation'
  }

  if (stageKeys[event.key] && !showHotspotDetail.value) {
    onStageSelect(stageKeys[event.key])
  }
}
</script>

<style scoped>
.mining-3d-view {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #87CEEB 0%, #E0F7FA 100%);
}

.timeline-container {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 900px;
  z-index: 100;
}

.scene-controls {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 100;
}

.control-button {
  width: 48px;
  height: 48px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.control-button:hover {
  background: white;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.control-button:active {
  transform: scale(0.95);
}

.control-button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.loading-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-content {
  text-align: center;
  color: white;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-content p {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
}

.loading-tips {
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  display: inline-block;
  font-size: 14px;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .timeline-container {
    bottom: 20px;
    width: 95%;
  }

  .scene-controls {
    right: 10px;
    top: auto;
    bottom: 200px;
    transform: none;
    flex-direction: row;
  }

  .control-button {
    width: 40px;
    height: 40px;
  }

  .loading-tips {
    font-size: 12px;
    padding: 10px 16px;
  }
}
</style>