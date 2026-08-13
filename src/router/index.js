import { createRouter, createWebHistory } from 'vue-router'

// 路由配置
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '矿山全生命周期展示平台',
      description: '探索矿山开采的全流程管理'
    }
  },
  {
    path: '/3d',
    name: '3d-view',
    component: () => import('@/views/Mining3DView.vue'),
    meta: {
      title: '3D矿山场景展示',
      description: '交互式3D矿山全生命周期体验'
    }
  },
  {
    path: '/stage/:stageId',
    name: 'stage',
    component: () => import('@/views/StageView.vue'),
    meta: {
      title: '阶段详情',
      description: '查看具体阶段的详细信息'
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/DetailView.vue'),
    meta: {
      title: '详情查看',
      description: '查看详细的工艺流程或安全红线信息'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/'
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（比如浏览器后退），返回到保存的位置
    if (savedPosition) {
      return savedPosition
    }
    // 如果有锚点，滚动到锚点
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    // 否则滚动到顶部
    return { top: 0, behavior: 'smooth' }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 更新页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 矿山全生命周期展示平台`
  }

  // 设置页面 meta 描述
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description)
    }
  }

  next()
})

router.afterEach((to, from) => {
  // 路由切换后的处理
  // 可以添加分析数据上报、页面访问统计等
})

// 路由错误处理
router.onError((error) => {
  console.error('Router error:', error)
  // 可以添加错误上报逻辑
})

export default router