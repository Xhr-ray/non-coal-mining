import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { safetyData } from '@/config'

export const useSafetyStore = defineStore('safety', () => {
  // State
  const selectedSafetyItem = ref(null)
  const safetyAlerts = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const allSafetyItems = computed(() => {
    // 从配置中获取所有安全项目
    return safetyData.safetyItems || []
  })

  const criticalSafetyItems = computed(() => {
    return allSafetyItems.value.filter(item => item.level === 'critical')
  })

  const highPriorityItems = computed(() => {
    return allSafetyItems.value.filter(item => item.level === 'high')
  })

  const safetyStats = computed(() => {
    return {
      total: allSafetyItems.value.length,
      critical: criticalSafetyItems.value.length,
      high: highPriorityItems.value.length,
      activeAlerts: safetyAlerts.value.filter(alert => alert.active).length
    }
  })

  // Actions
  const setSelectedSafetyItem = (item) => {
    selectedSafetyItem.value = item
  }

  const clearSelectedSafetyItem = () => {
    selectedSafetyItem.value = null
  }

  const addSafetyAlert = (alert) => {
    const newAlert = {
      id: Date.now(),
      active: true,
      timestamp: new Date(),
      ...alert
    }
    safetyAlerts.value.push(newAlert)

    // 可以添加通知逻辑
    return newAlert
  }

  const updateSafetyAlert = (alertId, updates) => {
    const index = safetyAlerts.value.findIndex(alert => alert.id === alertId)
    if (index !== -1) {
      safetyAlerts.value[index] = {
        ...safetyAlerts.value[index],
        ...updates
      }
    }
  }

  const deactivateSafetyAlert = (alertId) => {
    updateSafetyAlert(alertId, { active: false })
  }

  const removeSafetyAlert = (alertId) => {
    const index = safetyAlerts.value.findIndex(alert => alert.id === alertId)
    if (index !== -1) {
      safetyAlerts.value.splice(index, 1)
    }
  }

  const clearSafetyAlerts = () => {
    safetyAlerts.value = []
  }

  const getSafetyItemById = (id) => {
    return allSafetyItems.value.find(item => item.id === id)
  }

  const getSafetyItemsByLevel = (level) => {
    return allSafetyItems.value.filter(item => item.level === level)
  }

  const getSafetyItemsByCategory = (category) => {
    return allSafetyItems.value.filter(item => item.category === category)
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

  // 初始化
  const initialize = () => {
    // 可以添加初始化逻辑，比如加载安全检查数据
    // 模拟一些初始安全警告
    const mockAlerts = [
      {
        id: 1,
        title: '边坡监测预警',
        description: '监测到边坡角度异常变化，请立即检查',
        level: 'critical',
        category: 'slope',
        active: true
      },
      {
        id: 2,
        title: '排水系统检查',
        description: '定期排水系统维护提醒',
        level: 'medium',
        category: 'drainage',
        active: true
      }
    ]

    safetyAlerts.value = mockAlerts
  }

  return {
    // State
    selectedSafetyItem,
    safetyAlerts,
    loading,
    error,

    // Computed
    allSafetyItems,
    criticalSafetyItems,
    highPriorityItems,
    safetyStats,

    // Actions
    setSelectedSafetyItem,
    clearSelectedSafetyItem,
    addSafetyAlert,
    updateSafetyAlert,
    deactivateSafetyAlert,
    removeSafetyAlert,
    clearSafetyAlerts,
    getSafetyItemById,
    getSafetyItemsByLevel,
    getSafetyItemsByCategory,
    setLoading,
    setError,
    clearError,
    initialize
  }
})