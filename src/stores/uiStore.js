import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // State
  const sidebarOpen = ref(false)
  const modalOpen = ref(false)
  const detailModalOpen = ref(false)
  const editMode = ref(false)
  const theme = ref('dark')
  const loading = ref(false)
  const notifications = ref([])
  const currentStage = ref('exploration') // 默认显示前期准备阶段

  // Computed
  const isMobile = computed(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  })

  const isTablet = computed(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= 768 && window.innerWidth < 1024
  })

  const isDesktop = computed(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= 1024
  })

  const breakpoint = computed(() => {
    if (isMobile.value) return 'mobile'
    if (isTablet.value) return 'tablet'
    return 'desktop'
  })

  const isDarkMode = computed(() => theme.value === 'dark')

  // Actions
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const closeSidebar = () => {
    sidebarOpen.value = false
  }

  const openModal = () => {
    modalOpen.value = true
  }

  const closeModal = () => {
    modalOpen.value = false
  }

  const openDetailModal = () => {
    detailModalOpen.value = true
  }

  const closeDetailModal = () => {
    detailModalOpen.value = false
  }

  const toggleEditMode = () => {
    editMode.value = !editMode.value
  }

  const setEditMode = (value) => {
    editMode.value = value
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
    // 可以添加主题切换的持久化逻辑
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  const setCurrentStage = (stageId) => {
    currentStage.value = stageId
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentStage', stageId)
    }
  }

  const setLoading = (value) => {
    loading.value = value
  }

  const addNotification = (notification) => {
    const id = Date.now()
    notifications.value.push({
      id,
      ...notification,
      timestamp: new Date()
    })

    // 自动移除通知
    if (notification.autoRemove !== false) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }

    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearNotifications = () => {
    notifications.value = []
  }

  // 初始化
  const initialize = () => {
    // 从本地存储恢复主题
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        theme.value = savedTheme
      }

      // 恢复当前阶段
      const savedStage = localStorage.getItem('currentStage')
      if (savedStage) {
        currentStage.value = savedStage
      }
    }
  }

  return {
    // State
    sidebarOpen,
    modalOpen,
    detailModalOpen,
    editMode,
    theme,
    loading,
    notifications,
    currentStage,

    // Computed
    isMobile,
    isTablet,
    isDesktop,
    breakpoint,
    isDarkMode,

    // Actions
    toggleSidebar,
    closeSidebar,
    openModal,
    closeModal,
    openDetailModal,
    closeDetailModal,
    toggleEditMode,
    setEditMode,
    setTheme,
    toggleTheme,
    setCurrentStage,
    setLoading,
    addNotification,
    removeNotification,
    clearNotifications,
    initialize
  }
})