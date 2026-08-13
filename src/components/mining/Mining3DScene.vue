<template>
  <div class="mining-3d-container">
    <!-- 3D场景容器 -->
    <div
      ref="sceneContainer"
      class="scene-container"
      @click="onSceneClick"
    ></div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>场景加载中...</p>
    </div>

    <!-- 当前阶段信息 -->
    <div v-if="currentStageInfo" class="stage-info">
      <div class="stage-badge" :style="{ backgroundColor: currentStageInfo.color }">
        {{ currentStageInfo.nameEn }}
      </div>
      <h2 class="stage-title">{{ currentStageInfo.name }}</h2>
      <p class="stage-description">{{ currentStageInfo.description }}</p>
    </div>

    <!-- 操作提示 -->
    <div class="controls-hint">
      <div class="hint-item">
        <span class="hint-icon">🖱️</span>
        <span>拖动旋转视角</span>
      </div>
      <div class="hint-item">
        <span class="hint-icon">🔍</span>
        <span>滚轮缩放</span>
      </div>
      <div class="hint-item">
        <span class="hint-icon">📍</span>
        <span>点击热点查看详情</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { SceneController } from '@/3d-scene'

// Props
const props = defineProps({
  initialStage: {
    type: String,
    default: 'exploration'
  }
})

// Emits
const emit = defineEmits(['stage-changed', 'hotspot-clicked', 'scene-ready'])

// Refs
const sceneContainer = ref(null)
const loading = ref(true)
const currentStage = ref(props.initialStage)

// 场景控制器
let sceneController = null

// 计算属性
const currentStageInfo = computed(() => {
  if (!sceneController || !currentStage.value) return null
  return sceneController.getStageData(currentStage.value)
})

// 方法
const initScene = () => {
  if (!sceneContainer.value) return

  try {
    // 创建场景控制器
    sceneController = new SceneController(sceneContainer.value)

    // 设置事件监听
    setupSceneEvents()

    // 初始化场景
    sceneController.initialize()

    // 隐藏加载状态
    setTimeout(() => {
      loading.value = false
      emit('scene-ready', { stage: currentStage.value })
    }, 1000)

  } catch (error) {
    console.error('3D场景初始化失败:', error)
    loading.value = false
  }
}

const setupSceneEvents = () => {
  if (!sceneController) return

  // 监听阶段切换
  sceneController.on('stage-changed', (data) => {
    console.log('Mining3DScene: 收到阶段切换事件', data)
    currentStage.value = data.to
    emit('stage-changed', data)

    // 确保loading状态被清除
    setTimeout(() => {
      loading.value = false
      console.log('Mining3DScene: loading状态已强制清除')
    }, 1500)
  })

  // 监听热点点击
  sceneController.on('hotspot-clicked', (data) => {
    emit('hotspot-clicked', data)
  })

  // 监听相机就绪
  sceneController.on('camera-ready', (data) => {
    console.log('相机就绪:', data)
  })
}

const switchStage = (stageId) => {
  if (!sceneController) {
    console.error('场景控制器未初始化')
    loading.value = false
    return
  }

  console.log('切换阶段:', stageId)
  loading.value = true

  try {
    sceneController.switchToStage(stageId)

    // 给足够的时间让场景构建完成
    setTimeout(() => {
      loading.value = false
      console.log('阶段切换完成，loading已清除')
    }, 1000)
  } catch (error) {
    console.error('切换阶段时出错:', error)
    loading.value = false
  }
}

const onSceneClick = (event) => {
  // 点击事件由场景管理器处理
}

const resize = () => {
  if (sceneController) {
    sceneController.resize()
  }
}

// 生命周期
onMounted(() => {
  initScene()

  // 监听窗口大小变化
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)

  // 销毁场景
  if (sceneController) {
    sceneController.dispose()
    sceneController = null
  }
})

// 暴露方法供父组件调用
defineExpose({
  switchStage,
  getCurrentStage: () => currentStage.value,
  getSceneController: () => sceneController
})
</script>

<style scoped>
.mining-3d-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(to bottom, #87CEEB 0%, #E0F7FA 100%);
}

.scene-container {
  width: 100%;
  height: 100%;
  cursor: grab;
}

.scene-container:active {
  cursor: grabbing;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  color: white;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.stage-info {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 350px;
  z-index: 10;
}

.stage-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.stage-title {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  color: #333;
  line-height: 1.2;
}

.stage-description {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.controls-hint {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 12px 24px;
  display: flex;
  gap: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.hint-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #555;
}

.hint-icon {
  font-size: 18px;
}
</style>