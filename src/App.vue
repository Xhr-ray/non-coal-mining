<template>
  <div class="mining-container">
    <!-- 标题区域 -->
    <div class="header-title">
      <h1>矿山全生命周期开采阶段流程图</h1>
    </div>

    <!-- 全屏实景图区域 -->
    <div class="scene-section">
      <div class="scene-background">
        <!-- 图片容器 - 与图片实际显示区域匹配 -->
        <div class="image-container" ref="imageContainer">
          <!-- 背景图片 -->
          <img
            v-if="backgroundImage"
            :src="backgroundImage"
            alt="矿区实景"
            class="scene-image"
            ref="sceneImage"
            @load="updateImageContainer"
          >
          <div v-else class="scene-placeholder">
            <div class="placeholder-content">
              <h2>矿产资源综合利用展示平台</h2>
              <p>点击下方按钮查看详细信息</p>
            </div>
          </div>

          <!-- 可点击的按钮 -->
          <div
            v-for="button in buttons"
            :key="button.id"
            class="scene-button"
            :class="{
              'edit-mode': editMode,
              'dragging': draggingButton === button.id,
              'red-button': button.type === 'red',
              'blue-button': button.type === 'blue'
            }"
            :style="{
              left: button.left,
              top: button.top,
              transform: 'translate(-50%, -50%)',
              cursor: editMode ? 'move' : 'pointer'
            }"
            @click="editMode ? startDrag(button, $event) : showDetail(button)"
            @mousedown="editMode && startDrag(button, $event)"
            @mousemove="editMode && onDrag($event)"
            @mouseup="editMode && endDrag()"
          >
            <div class="button-text">{{ button.text }}</div>
            <div class="button-pulse"></div>
            <div v-if="editMode" class="button-coords">
              {{ button.left }}, {{ button.top }}
            </div>
          </div>
        </div>

        <!-- 编辑模式控制 -->
        <div class="edit-controls">
          <button
            v-if="!editMode"
            @click="enableEditMode"
            class="edit-btn"
          >
            🎯 调整按钮位置
          </button>
          <div v-else class="edit-mode-active">
            <span class="edit-mode-text">编辑模式 - 拖拽按钮调整位置</span>
            <button @click="saveEditMode" class="save-btn">💾 保存</button>
            <button @click="exitEditMode" class="exit-btn">❌ 取消</button>
            <button @click="resetButtonPositions" class="reset-btn">🔄 重置</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <transition name="fade">
      <div v-if="selectedDetail" class="detail-overlay" @click="closeDetail">
        <div class="detail-panel" @click.stop>
          <button class="close-button" @click="closeDetail">×</button>
          <div class="detail-content">
            <div class="detail-header">
              <div class="detail-icon">{{ selectedDetail.type === 'red' ? '🔴' : '🔵' }}</div>
              <h2>{{ selectedDetail.text }}</h2>
            </div>
            <div class="detail-body">
              <!-- 图片展示区域 -->
              <div v-if="selectedDetail.images && selectedDetail.images.length" class="detail-images">
                <div v-for="(image, index) in selectedDetail.images" :key="index" class="detail-image-item">
                  <img :src="image.src" :alt="image.alt" class="detail-image">
                  <div class="image-caption">{{ image.caption }}</div>
                </div>
              </div>

              <!-- 详细描述区域 -->
              <div class="detail-description">
                <h3>详细说明</h3>
                <!-- 长文本显示支持HTML和简单Markdown -->
                <div v-if="selectedDetail.longDescription" class="long-description" v-html="renderMarkdown(selectedDetail.longDescription)"></div>
                <p v-else>{{ selectedDetail.shortDescription || selectedDetail.description }}</p>
              </div>

              <!-- 主要特点 -->
              <div v-if="selectedDetail.features && selectedDetail.features.length" class="detail-features">
                <h3>主要特点</h3>
                <ul>
                  <li v-for="(feature, index) in selectedDetail.features" :key="index">
                    {{ feature }}
                  </li>
                </ul>
              </div>

              <!-- 关键数据 -->
              <div v-if="selectedDetail.stats" class="detail-stats">
                <h3>关键数据</h3>
                <div class="stats-grid">
                  <div v-for="(stat, key) in selectedDetail.stats" :key="key" class="stat-item">
                    <div class="stat-label">{{ key }}</div>
                    <div class="stat-value">{{ stat }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { buttonConfig, buttonPositions, buttonFeatures } from './config/buttons.js'
import { buttonDetails } from './config/buttonDetails.js'

export default {
  name: 'MiningFlow',
  data() {
    return {
      // 背景图片（可选）
      backgroundImage: '/1.png',

      // 选中的详情
      selectedDetail: null,

      // 编辑模式
      editMode: false,
      draggingButton: null,
      dragOffset: { x: 0, y: 0 },
      originalPositions: {},

      // 可点击的按钮（包含详细信息）
      buttons: this.generateButtons()
    }
  },
  mounted() {
    // 加载保存的按钮位置
    this.loadSavedPositions()

    // 等待图片加载完成后更新容器大小
    this.$nextTick(() => {
      this.updateImageContainer()
    })

    // 监听窗口大小变化
    window.addEventListener('resize', this.updateImageContainer)

    // 监听图片加载完成
    if (this.$refs.sceneImage) {
      this.$refs.sceneImage.addEventListener('load', this.updateImageContainer)
    }
  },
  beforeUnmount() {
    // 清理事件监听器
    window.removeEventListener('resize', this.updateImageContainer)
    if (this.$refs.sceneImage) {
      this.$refs.sceneImage.removeEventListener('load', this.updateImageContainer)
    }
  },
  methods: {
    // 生成所有按钮
    generateButtons(savedPositions = null) {
      const allButtons = []

      // 生成蓝色按钮
      const bluePositions = savedPositions
        ? this.getSavedPositionsForType(savedPositions, 'blue')
        : this.generateButtonPositions(buttonConfig.blueButtons.length, 'blue')

      buttonConfig.blueButtons.forEach((config, index) => {
        // 如果有保存的位置就使用，否则使用默认位置
        let position
        if (savedPositions && bluePositions[config.id]) {
          position = bluePositions[config.id]
        } else {
          position = Array.isArray(bluePositions) ? bluePositions[index] : this.generateButtonPositions(1, 'blue')[0]
        }
        allButtons.push(this.createButton(config, position, 'blue'))
      })

      // 生成红色按钮
      const redPositions = savedPositions
        ? this.getSavedPositionsForType(savedPositions, 'red')
        : this.generateButtonPositions(buttonConfig.redButtons.length, 'red')

      buttonConfig.redButtons.forEach((config, index) => {
        // 如果有保存的位置就使用，否则使用默认位置
        let position
        if (savedPositions && redPositions[config.id]) {
          position = redPositions[config.id]
        } else {
          position = Array.isArray(redPositions) ? redPositions[index] : this.generateButtonPositions(1, 'red')[0]
        }
        allButtons.push(this.createButton(config, position, 'red'))
      })

      return allButtons
    },

    // 从保存的位置中获取特定类型的位置
    getSavedPositionsForType(savedPositions, type) {
      const result = {}

      savedPositions.forEach(pos => {
        // 检查位置是否匹配指定类型
        if (pos.type === type && pos.id && pos.left && pos.top) {
          result[pos.id] = {
            left: pos.left,
            top: pos.top
          }
        }
      })

      return result
    },

    // 生成按钮位置
    generateButtonPositions(count, type) {
      const positions = []
      const config = buttonPositions[type]

      if (config.layout === 'grid') {
        // 网格布局
        for (let i = 0; i < count; i++) {
          const col = i % config.cols
          const row = Math.floor(i / config.cols)
          positions.push({
            left: `${config.startX + col * config.spacingX}%`,
            top: `${config.startY + row * config.spacingY}%`
          })
        }
      } else if (config.layout === 'vertical') {
        // 垂直布局
        for (let i = 0; i < count; i++) {
          positions.push({
            left: `${config.startX}%`,
            top: `${config.startY + i * config.spacingY}%`
          })
        }
      }

      return positions
    },

    // 创建单个按钮
    createButton(config, position, type) {
      // 获取按钮的详细描述，如果没有则使用默认描述
      const details = buttonDetails[config.id] || {
        title: config.text,
        shortDescription: `${config.text}是矿山全生命周期管理的重要组成部分，确保矿山运营的安全、高效和可持续发展。`,
        longDescription: '',
        images: [],
        features: buttonFeatures,
        stats: {
          '状态': '正常运行',
          '重要性': '高',
          '更新时间': '实时更新'
        }
      }

      return {
        id: config.id,
        text: config.text,
        left: position.left,
        top: position.top,
        type: type,
        shortDescription: details.shortDescription,
        longDescription: details.longDescription,
        images: details.images,
        features: details.features,
        stats: details.stats
      }
    },

    showDetail(button) {
      this.selectedDetail = button
    },
    closeDetail() {
      this.selectedDetail = null
    },

    // 编辑模式相关方法
    enableEditMode() {
      this.editMode = true
      // 保存原始位置
      this.originalPositions = {}
      this.buttons.forEach(button => {
        this.originalPositions[button.id] = {
          left: button.left,
          top: button.top
        }
      })
    },

    exitEditMode() {
      this.editMode = false
      this.draggingButton = null
      // 恢复原始位置
      this.buttons.forEach(button => {
        if (this.originalPositions[button.id]) {
          button.left = this.originalPositions[button.id].left
          button.top = this.originalPositions[button.id].top
        }
      })
    },

    saveEditMode() {
      this.editMode = false
      this.draggingButton = null

      // 保存按钮位置到 localStorage
      this.saveButtonPositions()

      console.log('新位置保存:', this.buttons.map(b => ({ id: b.id, text: b.text, left: b.left, top: b.top })))
    },

    startDrag(button, event) {
      if (!this.editMode) return

      this.draggingButton = button.id
      const rect = event.target.getBoundingClientRect()
      this.dragOffset = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    },

    onDrag(event) {
      if (!this.editMode || !this.draggingButton) return

      event.preventDefault()
      const button = this.buttons.find(b => b.id === this.draggingButton)
      if (!button) return

      const container = this.$refs.imageContainer
      const containerRect = container.getBoundingClientRect()

      // 计算新位置（相对于图片容器）
      const newX = event.clientX - containerRect.left
      const newY = event.clientY - containerRect.top

      // 转换为百分比
      const newLeft = Math.max(0, Math.min(100, (newX / containerRect.width) * 100)) + '%'
      const newTop = Math.max(0, Math.min(100, (newY / containerRect.height) * 100)) + '%'

      button.left = newLeft
      button.top = newTop
    },

    endDrag() {
      this.draggingButton = null
    },

    // 保存按钮位置到 localStorage
    saveButtonPositions() {
      const positions = this.buttons.map(button => ({
        id: button.id,
        text: button.text,
        left: button.left,
        top: button.top,
        type: button.type
      }))

      localStorage.setItem('miningButtonPositions', JSON.stringify(positions))
      console.log('按钮位置已保存到本地存储')
    },

    // 从 localStorage 加载保存的按钮位置
    loadSavedPositions() {
      try {
        const savedPositions = JSON.parse(localStorage.getItem('miningButtonPositions'))

        if (savedPositions && savedPositions.length > 0) {
          // 使用保存的位置生成按钮
          this.buttons = this.generateButtons(savedPositions)
          console.log('从本地存储加载了保存的按钮位置')
        } else {
          // 没有保存的位置，使用默认位置
          this.buttons = this.generateButtons()
          console.log('使用默认按钮位置')
        }
      } catch (error) {
        console.error('加载保存的位置时出错:', error)
        // 出错时使用默认位置
        this.buttons = this.generateButtons()
      }
    },

    // 重置按钮位置到默认值
    resetButtonPositions() {
      if (confirm('确定要重置所有按钮位置到默认值吗？')) {
        localStorage.removeItem('miningButtonPositions')
        this.buttons = this.generateButtons()
        console.log('按钮位置已重置到默认值')
      }
    },

    // 更新图片容器大小以匹配图片实际显示区域
    updateImageContainer() {
      this.$nextTick(() => {
        const sceneSection = this.$el.querySelector('.scene-section')
        const sceneImage = this.$refs.sceneImage
        const imageContainer = this.$refs.imageContainer

        if (!sceneSection || !sceneImage || !imageContainer) return

        // 获取容器的尺寸
        const containerRect = sceneSection.getBoundingClientRect()

        // 获取图片的原始尺寸
        const imgWidth = sceneImage.naturalWidth
        const imgHeight = sceneImage.naturalHeight

        if (!imgWidth || !imgHeight) return

        // 计算图片在容器中的实际显示尺寸（使用 object-fit: contain）
        const containerRatio = containerRect.width / containerRect.height
        const imageRatio = imgWidth / imgHeight

        let displayWidth, displayHeight

        if (imageRatio > containerRatio) {
          // 图片更宽，以宽度为准
          displayWidth = containerRect.width
          displayHeight = displayWidth / imageRatio
        } else {
          // 图片更高，以高度为准
          displayHeight = containerRect.height
          displayWidth = displayHeight * imageRatio
        }

        // 计算图片在容器中的居中位置
        const left = (containerRect.width - displayWidth) / 2
        const top = (containerRect.height - displayHeight) / 2

        // 设置 image-container 的样式来匹配图片的实际显示区域
        imageContainer.style.position = 'absolute'
        imageContainer.style.left = left + 'px'
        imageContainer.style.top = top + 'px'
        imageContainer.style.width = displayWidth + 'px'
        imageContainer.style.height = displayHeight + 'px'
      })
    },

    // 简单的Markdown渲染方法
    renderMarkdown(text) {
      if (!text) return ''

      // HTML转义
      let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

      // Markdown转换规则
      // 标题
      html = html.replace(/^### (.*$)/gim, '<h4>$1</h4>')
      html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>')
      html = html.replace(/^# (.*$)/gim, '<h2>$1</h2>')

      // 粗体和斜体
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

      // 列表
      html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
      html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>')

      // 段落
      html = html.replace(/\n\n/g, '</p><p>')
      html = '<p>' + html + '</p>'

      // 清理空段落
      html = html.replace(/<p><\/p>/g, '')
      html = html.replace(/<p>(<h[1-6]>)/g, '$1')
      html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1')
      html = html.replace(/<p>(<li>)/g, '$1')
      html = html.replace(/(<\/li>)<\/p>/g, '$1')

      return html
    }
  }
}
</script>

<style scoped>
.mining-container {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 标题区域 */
.header-title {
  width: 100%;
  padding: 20px 0;
  text-align: center;
  background: linear-gradient(135deg, rgba(10, 25, 41, 0.9) 0%, rgba(26, 35, 50, 0.9) 100%);
  border-bottom: 2px solid #00bcd4;
  flex-shrink: 0;
  z-index: 100;
}

.header-title h1 {
  font-size: 32px;
  color: #ffffff;
  text-shadow:
    0 0 20px rgba(0, 188, 212, 0.6),
    0 2px 10px rgba(0, 0, 0, 0.5);
  letter-spacing: 3px;
  margin: 0;
  font-weight: 600;
}

/* 全屏实景图区域 */
.scene-section {
  width: 100%;
  flex: 1;
  position: relative;
  background: #0a1929;
  overflow: hidden;
}

.scene-background {
  width: 100%;
  height: 100%;
  position: relative;
  background: #0a1929;
}

/* 图片容器 - 匹配图片实际显示区域 */
.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

.scene-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.9;
  display: block;
}

.scene-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(ellipse at 20% 20%, rgba(0, 188, 212, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 30%, rgba(0, 150, 136, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 70%, rgba(0, 188, 212, 0.1) 0%, transparent 40%),
    linear-gradient(135deg, #0a1929 0%, #1a2332 100%);
}

.placeholder-content {
  text-align: center;
  color: rgba(255, 255, 255, 0.3);
}

.placeholder-content h2 {
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 300;
  letter-spacing: 4px;
}

.placeholder-content p {
  font-size: 24px;
  opacity: 0.6;
}

.scene-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(ellipse at 20% 20%, rgba(0, 188, 212, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 30%, rgba(0, 150, 136, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 70%, rgba(0, 188, 212, 0.15) 0%, transparent 40%);
  pointer-events: none;
}

/* 场景按钮基础样式 */
.scene-button {
  position: absolute;
  background: rgba(100, 100, 100, 0.8);
  border: 2px solid #888;
  border-radius: 8px;
  min-width: 120px;
  max-width: 160px;
  padding: 12px 16px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 50;
  overflow: visible;
}

.scene-button:hover {
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
}

.button-text {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  line-height: 1.4;
  z-index: 1;
  white-space: nowrap;
}

.button-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 2px solid rgba(0, 188, 212, 0.5);
  animation: pulse 2s ease-out infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}

/* 按钮类型样式 */
.scene-button.red-button {
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.9) 0%, rgba(198, 40, 40, 0.9) 100%);
  border-color: #f44336;
  box-shadow:
    0 4px 20px rgba(244, 67, 54, 0.5),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
}

.scene-button.red-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow:
    0 8px 30px rgba(244, 67, 54, 0.7),
    inset 0 0 30px rgba(255, 255, 255, 0.2);
  border-color: #ff5252;
}

.scene-button.red-button .button-pulse {
  border-color: rgba(244, 67, 54, 0.5);
}

.scene-button.blue-button {
  background: linear-gradient(135deg, rgba(0, 188, 212, 0.9) 0%, rgba(0, 150, 136, 0.9) 100%);
  border-color: #00bcd4;
  box-shadow:
    0 4px 20px rgba(0, 188, 212, 0.5),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
}

.scene-button.blue-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow:
    0 8px 30px rgba(0, 188, 212, 0.7),
    inset 0 0 30px rgba(255, 255, 255, 0.2);
  border-color: #00e5ff;
}

.scene-button.blue-button .button-pulse {
  border-color: rgba(0, 188, 212, 0.5);
}

/* 编辑模式样式 */
.scene-button.edit-mode {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.9) 0%, rgba(255, 87, 34, 0.9) 100%);
  border-color: #ff9800;
  animation: none;
}

.scene-button.edit-mode:hover {
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow:
    0 6px 25px rgba(255, 152, 0, 0.6),
    inset 0 0 25px rgba(255, 255, 255, 0.15);
}

.scene-button.dragging {
  opacity: 0.8;
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow:
    0 10px 40px rgba(255, 152, 0, 0.8),
    inset 0 0 30px rgba(255, 255, 255, 0.2);
}

.button-coords {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: #ff9800;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  white-space: nowrap;
  z-index: 10;
}

/* 编辑控制按钮 */
.edit-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 200;
}

.edit-btn,
.save-btn,
.exit-btn,
.reset-btn {
  background: rgba(0, 188, 212, 0.8);
  border: 1px solid #00bcd4;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.edit-btn:hover,
.save-btn:hover,
.reset-btn:hover,
.exit-btn:hover {
  background: rgba(0, 188, 212, 1);
  transform: scale(1.05);
}

.edit-mode-active {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.7);
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ff9800;
}

.edit-mode-text {
  color: #ff9800;
  font-size: 14px;
  font-weight: 600;
}

.save-btn {
  background: rgba(76, 175, 80, 0.8);
  border-color: #4caf50;
}

.save-btn:hover {
  background: rgba(76, 175, 80, 1);
}

.exit-btn {
  background: rgba(244, 67, 54, 0.8);
  border-color: #f44336;
}

.exit-btn:hover {
  background: rgba(244, 67, 54, 1);
}

.reset-btn {
  background: rgba(156, 39, 176, 0.8);
  border-color: #9c27b0;
}

.reset-btn:hover {
  background: rgba(156, 39, 176, 1);
}

/* 详情弹窗 */
.detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.detail-panel {
  background: linear-gradient(135deg, rgba(10, 25, 41, 0.95) 0%, rgba(26, 35, 50, 0.95) 100%);
  border: 2px solid #00bcd4;
  border-radius: 15px;
  max-width: 1200px;
  max-height: 85vh;
  width: 85%;
  overflow-y: auto;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(0, 188, 212, 0.3);
  position: relative;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 188, 212, 0.2);
  color: #00bcd4;
  font-size: 28px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.close-button:hover {
  background: rgba(0, 188, 212, 0.4);
  transform: rotate(90deg);
}

.detail-content {
  padding: 40px 30px 30px;
}

.detail-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 188, 212, 0.3);
}

.detail-icon {
  font-size: 64px;
  margin-bottom: 15px;
}

.detail-header h2 {
  font-size: 32px;
  color: #00bcd4;
  margin: 0;
  text-shadow: 0 0 15px rgba(0, 188, 212, 0.5);
}

.detail-body {
  color: #ffffff;
}

.detail-description,
.detail-features,
.detail-stats {
  margin-bottom: 25px;
}

.detail-description h3,
.detail-features h3,
.detail-stats h3 {
  font-size: 20px;
  color: #00bcd4;
  margin-bottom: 15px;
  border-left: 3px solid #00bcd4;
  padding-left: 12px;
}

/* 详情图片区域 */
.detail-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
}

.detail-image-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 188, 212, 0.3);
}

.detail-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  display: block;
}

.image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  font-size: 14px;
  text-align: center;
  border-top: 1px solid rgba(0, 188, 212, 0.3);
}

/* 详细描述区域 */
.long-description {
  font-size: 20px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.long-description h2,
.long-description h3,
.long-description h4 {
  color: #00bcd4;
  margin-top: 20px;
  margin-bottom: 10px;
}

.long-description h2 {
  font-size: 20px;
  border-left: 3px solid #00bcd4;
  padding-left: 12px;
}

.long-description h3 {
  font-size: 18px;
  border-left: 2px solid #00bcd4;
  padding-left: 10px;
}

.long-description h4 {
  font-size: 16px;
  color: #00e5ff;
  margin-bottom: 8px;
}

.long-description p {
  margin-bottom: 12px;
}

.long-description ul,
.long-description ol {
  margin-left: 20px;
  margin-bottom: 12px;
}

.long-description li {
  margin-bottom: 6px;
}

.long-description strong {
  color: #00e5ff;
  font-weight: 600;
}

.detail-description p {
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
}

.detail-features ul {
  list-style: none;
  padding: 0;
}

.detail-features li {
  font-size: 16px;
  line-height: 2;
  padding-left: 25px;
  position: relative;
  color: rgba(255, 255, 255, 0.85);
}

.detail-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4caf50;
  font-weight: bold;
}

.detail-stats .stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.stat-item {
  background: rgba(0, 188, 212, 0.1);
  border: 1px solid rgba(0, 188, 212, 0.3);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  color: #00bcd4;
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

/* 响应式设计 */
@media (max-width: 1200px) {
  .header-title h1 {
    font-size: 28px;
    letter-spacing: 2px;
  }

  .scene-button {
    min-width: 110px;
    max-width: 150px;
    padding: 11px 14px;
  }

  .button-text {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .header-title h1 {
    font-size: 24px;
    letter-spacing: 1px;
  }

  .scene-button {
    min-width: 100px;
    max-width: 140px;
    padding: 10px 12px;
  }

  .button-text {
    font-size: 12px;
  }

  .detail-panel {
    width: 95%;
    max-height: 85vh;
  }

  .detail-content {
    padding: 30px 20px 20px;
  }

  .detail-header {
    margin-bottom: 20px;
  }

  .detail-icon {
    font-size: 48px;
  }

  .detail-header h2 {
    font-size: 24px;
  }

  .detail-description h3,
  .detail-features h3,
  .detail-stats h3 {
    font-size: 18px;
  }

  .detail-description p,
  .detail-features li {
    font-size: 14px;
  }

  .detail-stats .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }

  .stat-item {
    padding: 10px;
  }

  .stat-label {
    font-size: 12px;
  }

  .stat-value {
    font-size: 16px;
  }
}
</style>
