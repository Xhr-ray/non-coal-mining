<template>
  <div class="stage-view">
    <StageSelector />
    <div class="stage-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import StageSelector from '@/components/mining/StageSelector.vue'
import { useMiningStore } from '@/stores/miningStore'

const route = useRoute()
const miningStore = useMiningStore()

const stageId = computed(() => route.params.id)

// 自动设置当前阶段
miningStore.setCurrentStage(stageId.value)
</script>

<style scoped>
.stage-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.stage-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}
</style>