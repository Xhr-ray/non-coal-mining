<template>
  <div class="detail-view">
    <div class="detail-overlay" @click="handleClose">
      <DetailPanel :detail-data="detailData" @close="handleClose" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMiningStore } from '@/stores/miningStore'
import DetailPanel from '@/components/mining/DetailPanel.vue'

const route = useRoute()
const router = useRouter()
const miningStore = useMiningStore()

const detailData = computed(() => {
  const itemId = route.params.id
  // 查找对应的详情数据
  return miningStore.getItemById(itemId) || {
    title: '未找到详情',
    description: '请返回并重新选择',
    icon: '❌',
    images: [],
    features: [],
    stats: {}
  }
})

const handleClose = () => {
  router.back()
}

onMounted(() => {
  // 可以在这里添加页面加载动画或其他逻辑
})
</script>

<style scoped>
.detail-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.detail-overlay {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>