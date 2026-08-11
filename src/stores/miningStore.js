import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { stageData } from '@/config'

export const useMiningStore = defineStore('mining', () => {
  // State
  const currentStage = ref(null)
  const selectedItem = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const stages = computed(() => stageData.stages)

  const currentStageData = computed(() => {
    if (!currentStage.value) return null
    return stages.value.find(stage => stage.id === currentStage.value)
  })

  const currentProcesses = computed(() => {
    if (!currentStageData.value) return []
    return currentStageData.value.processes || []
  })

  const currentSafetyItems = computed(() => {
    if (!currentStageData.value) return []
    return currentStageData.value.safetyItems || []
  })

  // Actions
  const setCurrentStage = (stageId) => {
    currentStage.value = stageId
    // 重置选中项
    selectedItem.value = null
  }

  const setSelectedItem = (item) => {
    selectedItem.value = item
  }

  const getItemById = (id) => {
    // 在所有阶段中查找项目
    for (const stage of stages.value) {
      // 检查流程项目
      if (stage.processes) {
        const process = stage.processes.find(p => p.id === id)
        if (process) return { ...process, type: 'process', stageId: stage.id }
      }

      // 检查安全项目
      if (stage.safetyItems) {
        const safetyItem = stage.safetyItems.find(s => s.id === id)
        if (safetyItem) return { ...safetyItem, type: 'safety', stageId: stage.id }
      }
    }
    return null
  }

  const getAllItems = () => {
    const allItems = []
    for (const stage of stages.value) {
      if (stage.processes) {
        allItems.push(...stage.processes.map(p => ({ ...p, type: 'process', stageId: stage.id })))
      }
      if (stage.safetyItems) {
        allItems.push(...stage.safetyItems.map(s => ({ ...s, type: 'safety', stageId: stage.id })))
      }
    }
    return allItems
  }

  const setLoading = (value) => {
    loading.value = value
  }

  const setError = (value) => {
    error.value = value
  }

  const clearError = () => {
    error.value = null
  }

  // 初始化默认阶段
  const initialize = () => {
    if (stages.value.length > 0 && !currentStage.value) {
      currentStage.value = stages.value[0].id
    }
  }

  return {
    // State
    currentStage,
    selectedItem,
    loading,
    error,

    // Computed
    stages,
    currentStageData,
    currentProcesses,
    currentSafetyItems,

    // Actions
    setCurrentStage,
    setSelectedItem,
    getItemById,
    getAllItems,
    setLoading,
    setError,
    clearError,
    initialize
  }
})