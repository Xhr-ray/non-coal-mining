<template>
  <MainLayout />
</template>

<script setup>
import MainLayout from '@/components/layout/MainLayout.vue'
import { onMounted } from 'vue'
import { useMiningStore } from '@/stores/miningStore'
import { useUIStore } from '@/stores/uiStore'
import { useSafetyStore } from '@/stores/safetyStore'

// 初始化各个store
const miningStore = useMiningStore()
const uiStore = useUIStore()
const safetyStore = useSafetyStore()

onMounted(() => {
  // 初始化各个store
  miningStore.initialize()
  uiStore.initialize()
  safetyStore.initialize()
})
</script>

<style>
/* 全局样式已经移到 style.css */
</style>
