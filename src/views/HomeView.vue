<template>
  <div class="home-view">
    <StageSelector />
    <MiningScene />
  </div>
</template>

<script setup>
import StageSelector from '@/components/mining/StageSelector.vue'
import MiningScene from '@/components/mining/MiningScene.vue'
</script>

<style scoped>
.home-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>