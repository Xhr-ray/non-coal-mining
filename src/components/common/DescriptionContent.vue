<template>
  <div class="description-content">
    <div v-html="renderedContent" class="content-text"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

const renderedContent = computed(() => {
  if (!props.content) return ''

  let html = props.content

  // HTML转义
  html = html
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
})
</script>

<style scoped>
.description-content {
  margin-bottom: 20px;
}

.content-text {
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
}

.content-text h2 {
  font-size: 20px;
  color: #00bcd4;
  margin: 25px 0 15px 0;
  border-left: 3px solid #00bcd4;
  padding-left: 12px;
  font-weight: 600;
}

.content-text h3 {
  font-size: 18px;
  color: #00bcd4;
  margin: 20px 0 12px 0;
  border-left: 2px solid #00bcd4;
  padding-left: 10px;
  font-weight: 600;
}

.content-text h4 {
  font-size: 16px;
  color: #00e5ff;
  margin: 15px 0 10px 0;
  font-weight: 600;
}

.content-text p {
  margin-bottom: 12px;
}

.content-text ul,
.content-text ol {
  margin-left: 20px;
  margin-bottom: 12px;
}

.content-text li {
  margin-bottom: 6px;
  color: rgba(255, 255, 255, 0.85);
}

.content-text strong {
  color: #00e5ff;
  font-weight: 600;
}

.content-text em {
  color: #00bcd4;
  font-style: italic;
}

@media (max-width: 768px) {
  .content-text {
    font-size: 14px;
    line-height: 1.7;
  }

  .content-text h2 {
    font-size: 18px;
  }

  .content-text h3 {
    font-size: 16px;
  }

  .content-text h4 {
    font-size: 15px;
  }
}
</style>