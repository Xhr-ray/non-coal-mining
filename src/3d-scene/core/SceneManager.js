/**
 * 3D场景管理器
 * 负责管理整个3D场景的初始化、渲染和交互
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

export class SceneManager {
  constructor(container) {
    this.container = container
    this.scene = null
    this.camera = null
    this.renderer = null
    this.controls = null
    this.startTime = performance.now()
    this.lastTime = performance.now()
    this.elapsedTime = 0

    // 场景对象管理
    this.objects = {
      terrain: null,
      buildings: [],
      equipment: [],
      hotspots: [],
      effects: []
    }

    // 状态管理
    this.currentStage = null
    this.isTransitioning = false
    this.animationCallbacks = []

    // 光照系统
    this.lights = {
      ambient: null,
      sun: null,
      hemisphere: null
    }

    // 事件监听
    this.mouse = new THREE.Vector2()
    this.raycaster = new THREE.Raycaster()
    this.eventListeners = {}

    this.init()
  }

  /**
   * 初始化场景
   */
  init() {
    // 创建场景
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x87CEEB)
    this.scene.fog = new THREE.Fog(0x87CEEB, 100, 1000)

    // 创建相机
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    )
    this.camera.position.set(150, 100, 150)

    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFShadowMap
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.0

    // 添加到容器
    this.container.appendChild(this.renderer.domElement)

    // 创建控制器
    this.createControls()

    // 设置光照
    this.setupLighting()

    // 创建基础环境
    this.createBaseEnvironment()

    // 添加事件监听
    this.setupEventListeners()

    // 开始渲染循环
    this.animate()

    console.log('3D场景初始化完成')
  }

  /**
   * 创建相机控制器
   */
  createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.screenSpacePanning = false
    this.controls.minDistance = 20
    this.controls.maxDistance = 500
    this.controls.maxPolarAngle = Math.PI / 2 - 0.05 // 防止相机钻入地下
    this.controls.target.set(0, 0, 0)

    // 限制目标点范围
    this.controls.minTargetY = 0
    this.controls.maxTargetY = 100
  }

  /**
   * 设置光照系统
   */
  setupLighting() {
    // 环境光
    this.lights.ambient = new THREE.AmbientLight(0xffffff, 0.4)
    this.scene.add(this.lights.ambient)

    // 半球光（模拟天空和地面的反射）
    this.lights.hemisphere = new THREE.HemisphereLight(
      0x87CEEB, // 天空颜色
      0x8B7355, // 地面颜色
      0.4
    )
    this.scene.add(this.lights.hemisphere)

    // 主光源（太阳）
    this.lights.sun = new THREE.DirectionalLight(0xffffff, 1.2)
    this.lights.sun.position.set(100, 200, 100)
    this.lights.sun.castShadow = true

    // 优化阴影质量
    this.lights.sun.shadow.mapSize.width = 2048
    this.lights.sun.shadow.mapSize.height = 2048
    this.lights.sun.shadow.camera.near = 0.5
    this.lights.sun.shadow.camera.far = 1000
    this.lights.sun.shadow.camera.left = -200
    this.lights.sun.shadow.camera.right = 200
    this.lights.sun.shadow.camera.top = 200
    this.lights.sun.shadow.camera.bottom = -200
    this.lights.sun.shadow.bias = -0.0001

    this.scene.add(this.lights.sun)
  }

  /**
   * 创建基础环境
   */
  createBaseEnvironment() {
    // 禁用基础地形创建，让各个阶段自己管理地形
    // this.createTerrain() // 基础地形遮挡问题，已禁用

    // 创建天空盒效果
    this.createSkybox()
  }

  /**
   * 创建地形
   */
  createTerrain() {
    // 主地面
    const groundGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100)

    // 添加地形起伏
    const vertices = groundGeometry.attributes.position.array
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]
      const y = vertices[i + 1]

      // 使用多个频率的波形组合创建自然起伏
      const elevation =
        Math.sin(x * 0.01) * Math.cos(y * 0.01) * 15 +
        Math.sin(x * 0.03 + 1) * Math.cos(y * 0.02 + 2) * 8 +
        Math.sin(x * 0.1) * Math.cos(y * 0.08) * 3

      vertices[i + 2] = elevation
    }

    groundGeometry.computeVertexNormals()

    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 0.9,
      metalness: 0.0,
      flatShading: false
    })

    this.objects.terrain = new THREE.Mesh(groundGeometry, groundMaterial)
    this.objects.terrain.rotation.x = -Math.PI / 2
    this.objects.terrain.receiveShadow = true
    this.scene.add(this.objects.terrain)
  }

  /**
   * 创建天空盒效果
   */
  createSkybox() {
    // 创建远处山脉剪影
    const mountainGeometry = new THREE.ConeGeometry(300, 150, 4)
    const mountainMaterial = new THREE.MeshBasicMaterial({
      color: 0x5D737E,
      transparent: true,
      opacity: 0.3
    })

    const mountains = []
    const mountainPositions = [
      { x: -500, z: -500 },
      { x: 0, z: -600 },
      { x: 500, z: -500 },
      { x: -600, z: 0 },
      { x: 600, z: 0 },
      { x: -500, z: 500 },
      { x: 500, z: 500 }
    ]

    mountainPositions.forEach(pos => {
      const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial)
      mountain.position.set(pos.x, 75, pos.z)
      mountain.rotation.y = Math.random() * Math.PI
      this.scene.add(mountain)
      mountains.push(mountain)
    })
  }

  /**
   * 设置事件监听
   */
  setupEventListeners() {
    // 窗口大小调整
    window.addEventListener('resize', () => this.onWindowResize())

    // 鼠标移动（用于热点检测）
    window.addEventListener('mousemove', (e) => this.onMouseMove(e))

    // 鼠标点击
    window.addEventListener('click', (e) => this.onClick(e))
  }

  /**
   * 窗口大小调整处理
   */
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  /**
   * 鼠标移动处理
   */
  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  /**
   * 鼠标点击处理
   */
  onClick(event) {
    // 更新射线
    this.raycaster.setFromCamera(this.mouse, this.camera)

    // 检测热点点击 - 改进检测逻辑
    const intersects = this.raycaster.intersectObjects(
      this.objects.hotspots.flatMap(h => [h.mesh, h.group]),
      true
    )

    if (intersects.length > 0) {
      // 找到被点击的对象对应的热点
      const clickedObject = intersects[0].object

      // 向上查找直到找到热点组或mesh
      let currentObj = clickedObject
      let foundHotspot = null

      // 向上遍历对象层级
      while (currentObj && !foundHotspot) {
        // 检查当前对象是否是热点mesh
        foundHotspot = this.objects.hotspots.find(h => h.mesh === currentObj || h.hitArea === currentObj)

        if (!foundHotspot) {
          // 检查当前对象是否属于某个热点组
          foundHotspot = this.objects.hotspots.find(h => h.group === currentObj || h.group.children.includes(currentObj))
        }

        // 移动到父对象
        currentObj = currentObj.parent
      }

      if (foundHotspot) {
        console.log('热点被点击:', foundHotspot.data, '点击对象:', clickedObject.uuid)
        this.emit('hotspot-click', foundHotspot.data)
        return true
      } else {
        console.log('点击了对象但找不到对应热点:', clickedObject.uuid)
      }
    }

    return false
  }

  /**
   * 添加热点
   */
  addHotspot(position, data) {
    const hotspotGroup = new THREE.Group()

    // 增大热点球体 - 使其更容易点击
    const sphereGeometry = new THREE.SphereGeometry(3, 24, 24)
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF6B6B,
      transparent: true,
      opacity: 0.9
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.userData.hotspotData = data
    sphere.userData.isHotspot = true
    sphere.userData.isClickTarget = true // 标记为可点击目标

    // 增大动画环
    const ringGeometry = new THREE.RingGeometry(3.5, 4.5, 32)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF6B6B,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = -Math.PI / 2
    ring.userData.isClickTarget = true

    // 添加不可见的点击区域 - 增大点击范围
    const hitAreaGeometry = new THREE.SphereGeometry(5, 16, 16)
    const hitAreaMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF6B6B,
      transparent: true,
      opacity: 0.01 // 几乎透明
    })
    const hitArea = new THREE.Mesh(hitAreaGeometry, hitAreaMaterial)
    hitArea.userData.hotspotData = data
    hitArea.userData.isHitArea = true
    hitArea.userData.isClickTarget = true

    hotspotGroup.add(sphere)
    hotspotGroup.add(ring)
    hotspotGroup.add(hitArea) // 添加不可见的点击区域
    hotspotGroup.position.copy(position)

    this.scene.add(hotspotGroup)
    this.objects.hotspots.push({
      mesh: sphere,
      group: hotspotGroup,
      hitArea: hitArea, // 添加点击区域引用
      ring: ring,
      data: data
    })

    return hotspotGroup
  }

  /**
   * 清除所有热点
   */
  clearHotspots() {
    this.objects.hotspots.forEach(hotspot => {
      this.scene.remove(hotspot.group)
      hotspot.group.traverse(child => {
        if (child.isMesh) {
          child.geometry.dispose()
          child.material.dispose()
        }
      })
    })
    this.objects.hotspots = []
  }

  /**
   * 清除场景对象
   */
  clearScene() {
    // 清除地形
    if (this.objects.terrain) {
      this.scene.remove(this.objects.terrain)
      if (this.objects.terrain.geometry) this.objects.terrain.geometry.dispose()
      if (this.objects.terrain.material) this.objects.terrain.material.dispose()
      this.objects.terrain = null
    }

    // 清除建筑
    this.objects.buildings.forEach(building => {
      this.scene.remove(building)
      building.traverse(child => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose()
          if (child.material) child.material.dispose()
        }
      })
    })
    this.objects.buildings = []

    // 清除设备
    this.objects.equipment.forEach(equipment => {
      this.scene.remove(equipment)
      equipment.traverse(child => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose()
          if (child.material) child.material.dispose()
        }
      })
    })
    this.objects.equipment = []

    // 清除热点
    this.clearHotspots()

    // 清除效果
    this.objects.effects.forEach(effect => {
      this.scene.remove(effect)
      effect.traverse(child => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose()
          if (child.material) child.material.dispose()
        }
      })
    })
    this.objects.effects = []
  }

  /**
   * 相机动画过渡
   */
  animateCamera(targetPosition, lookAtTarget, duration = 2) {
    if (this.isTransitioning) return
    this.isTransitioning = true

    const startPos = this.camera.position.clone()
    const startTarget = this.controls.target.clone()
    const endPos = typeof targetPosition === 'object' ?
      targetPosition :
      new THREE.Vector3().fromArray(targetPosition)
    const endTarget = typeof lookAtTarget === 'object' ?
      lookAtTarget :
      new THREE.Vector3().fromArray(
        Array.isArray(lookAtTarget) ? lookAtTarget : [0, 0, 0]
      )

    // 使用GSAP进行平滑动画
    const timeline = gsap.timeline({
      onComplete: () => {
        this.isTransitioning = false
        this.emit('camera-transition-complete')
      }
    })

    // 相机位置动画
    timeline.to(this.camera.position, {
      x: endPos.x,
      y: endPos.y,
      z: endPos.z,
      duration: duration,
      ease: "power2.inOut",
      onUpdate: () => {
        this.controls.update()
      }
    }, 0)

    // 目标点动画
    timeline.to(this.controls.target, {
      x: endTarget.x,
      y: endTarget.y,
      z: endTarget.z,
      duration: duration,
      ease: "power2.inOut",
      onUpdate: () => {
        this.controls.update()
      }
    }, 0)
  }

  /**
   * 更新热点动画
   */
  updateHotspots(deltaTime) {
    const time = (performance.now() - this.startTime) / 1000

    this.objects.hotspots.forEach((hotspot, index) => {
      // 旋转光环
      hotspot.ring.rotation.z = time * 2

      // 脉冲缩放
      const scale = 1 + Math.sin(time * 3 + index) * 0.2
      hotspot.ring.scale.set(scale, scale, 1)

      // 浮动效果
      hotspot.group.position.y = hotspot.data.originalPosition?.y ||
        hotspot.group.position.y + Math.sin(time * 2 + index) * 0.01
    })
  }

  /**
   * 渲染循环
   */
  animate = () => {
    requestAnimationFrame(this.animate)

    const currentTime = performance.now()
    const deltaTime = (currentTime - this.lastTime) / 1000 // 转换为秒
    this.lastTime = currentTime

    // 更新控制器
    this.controls.update()

    // 更新热点动画
    this.updateHotspots(deltaTime)

    // 调用动画回调
    this.animationCallbacks.forEach(callback => callback(deltaTime))

    // 渲染
    this.renderer.render(this.scene, this.camera)
  }

  /**
   * 添加动画回调
   */
  addAnimationCallback(callback) {
    this.animationCallbacks.push(callback)
  }

  /**
   * 移除动画回调
   */
  removeAnimationCallback(callback) {
    const index = this.animationCallbacks.indexOf(callback)
    if (index > -1) {
      this.animationCallbacks.splice(index, 1)
    }
  }

  /**
   * 事件发射
   */
  emit(eventName, data) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName].forEach(callback => {
        callback(data)
      })
    }
  }

  /**
   * 添加事件监听
   */
  on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = []
    }
    this.eventListeners[eventName].push(callback)
  }

  /**
   * 移除事件监听
   */
  off(eventName, callback) {
    if (this.eventListeners[eventName]) {
      const index = this.eventListeners[eventName].indexOf(callback)
      if (index > -1) {
        this.eventListeners[eventName].splice(index, 1)
      }
    }
  }

  /**
   * 销毁场景
   */
  dispose() {
    // 移除事件监听
    window.removeEventListener('resize', () => this.onWindowResize())
    window.removeEventListener('mousemove', (e) => this.onMouseMove(e))
    window.removeEventListener('click', (e) => this.onClick(e))

    // 清理场景
    this.clearScene()

    // 清理基础对象
    if (this.objects.terrain) {
      this.scene.remove(this.objects.terrain)
      this.objects.terrain.geometry.dispose()
      this.objects.terrain.material.dispose()
    }

    // 清理渲染器
    this.renderer.dispose()

    // 移除canvas
    if (this.container && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement)
    }

    console.log('3D场景已销毁')
  }
}

export default SceneManager