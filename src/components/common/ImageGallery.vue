<template>
  <div class="image-gallery">
    <div class="gallery-grid">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="gallery-item"
        :class="{ 'active': selectedImage === index }"
        @click="selectImage(index)"
      >
        <img
          :src="getImageUrl(image.src)"
          :alt="image.alt || `Image ${index + 1}`"
          class="gallery-image"
          @error="handleImageError"
        >
        <div v-if="image.caption" class="image-caption">
          {{ image.caption }}
        </div>
      </div>
    </div>

    <!-- 图片灯箱 -->
    <transition name="fade">
      <div v-if="selectedImage !== null" class="image-lightbox" @click="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">×</button>
        <button v-if="selectedImage > 0" class="lightbox-prev" @click.stop="prevImage">←</button>
        <button v-if="selectedImage < images.length - 1" class="lightbox-next" @click.stop="nextImage">→</button>

        <div class="lightbox-content" @click.stop>
          <img :src="getImageUrl(images[selectedImage].src)" :alt="images[selectedImage].alt">
          <div v-if="images[selectedImage].caption" class="lightbox-caption">
            {{ images[selectedImage].caption }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
})

const selectedImage = ref(null)

const getImageUrl = (path) => {
  if (!path) return ''
  const base = import.meta.env.BASE_URL || '/'
  return base + path.replace(/^\//, '')
}

const selectImage = (index) => {
  selectedImage.value = index
}

const closeLightbox = () => {
  selectedImage.value = null
}

const prevImage = () => {
  if (selectedImage.value > 0) {
    selectedImage.value--
  }
}

const nextImage = () => {
  if (selectedImage.value < props.images.length - 1) {
    selectedImage.value++
  }
}

const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src)
  event.target.style.display = 'none'
}
</script>

<style scoped>
.image-gallery {
  margin-bottom: 25px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.gallery-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 188, 212, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-4px);
  border-color: #00bcd4;
  box-shadow: 0 8px 25px rgba(0, 188, 212, 0.4);
}

.gallery-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 12px;
  font-size: 14px;
  text-align: center;
  border-top: 1px solid rgba(0, 188, 212, 0.3);
  backdrop-filter: blur(5px);
}

/* 灯箱样式 */
.image-lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  cursor: pointer;
}

.lightbox-content {
  max-width: 90%;
  max-height: 90%;
  position: relative;
  background: transparent;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
}

.lightbox-caption {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px;
  text-align: center;
  border-radius: 0 0 8px 8px;
  font-size: 16px;
}

.lightbox-close,
.lightbox-prev,
.lightbox-next {
  position: absolute;
  width: 50px;
  height: 50px;
  border: none;
  background: rgba(0, 188, 212, 0.3);
  color: white;
  font-size: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.lightbox-close:hover,
.lightbox-prev:hover,
.lightbox-next:hover {
  background: rgba(0, 188, 212, 0.6);
  transform: scale(1.1);
}

.lightbox-close {
  top: 20px;
  right: 20px;
}

.lightbox-prev {
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}

.lightbox-prev:hover {
  transform: translateY(-50%) scale(1.1);
}

.lightbox-next {
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

.lightbox-next:hover {
  transform: translateY(-50%) scale(1.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }

  .gallery-image {
    height: 200px;
  }

  .lightbox-close,
  .lightbox-prev,
  .lightbox-next {
    width: 40px;
    height: 40px;
    font-size: 24px;
  }

  .lightbox-close {
    top: 10px;
    right: 10px;
  }

  .lightbox-prev {
    left: 10px;
  }

  .lightbox-next {
    right: 10px;
  }
}
</style>