/**
 * 勘探阶段场景构建器 - 重新构建版本
 */
import * as THREE from 'three'
import { TerrainGenerator } from '../objects/TerrainGenerator.js'
import { EquipmentFactory } from '../objects/EquipmentFactory.js'

export class ExplorationStage {
  constructor(sceneManager) {
    this.sceneManager = sceneManager
    this.terrainGenerator = new TerrainGenerator(sceneManager)
    this.equipmentFactory = new EquipmentFactory(sceneManager)
    this.sceneObjects = []
    this.hotspots = []
  }

  /**
   * 构建勘探阶段场景
   */
  build() {
    // 清除现有场景
    this.sceneManager.clearScene()
    this.clearPreviousObjects()

    // 创建地形：中间平地 + 四周山脉
    this.createExplorationTerrain()

    // 创建勘探设备
    this.createEquipment()

    // 添加热点
    this.addHotspots()

    // 设置相机位置
    this.setupCamera()
  }

  /**
   * 创建勘探地形：中间平地，四周山脉
   */
  createExplorationTerrain() {
    const terrainGroup = new THREE.Group()

    // 地形参数
    const plainRadius = 150 // 中间平地半径
    const mountainDistance = 200 // 山脉距离中心的距离
    const mountainHeight = 60 // 山脉高度

    // 创建大平面
    const planeGeometry = new THREE.PlaneGeometry(600, 600, 100, 100)
    const vertices = planeGeometry.attributes.position.array
    const colors = []

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]
      const y = vertices[i + 1]

      // 计算距离中心的距离
      const distance = Math.sqrt(x * x + y * y)

      let height = 0

      if (distance < plainRadius) {
        // 中间平地区域 - 保持平坦
        height = 0
      } else {
        // 四周山脉区域
        const mountainFactor = (distance - plainRadius) / (mountainDistance - plainRadius)
        // 使用正弦函数创建起伏的山脉效果
        const mountainNoise = Math.sin(x * 0.02) * Math.cos(y * 0.02) * 20 +
                              Math.sin(x * 0.05 + 1) * Math.cos(y * 0.05 + 2) * 10 +
                              Math.sin(x * 0.1 + 3) * Math.cos(y * 0.1 + 4) * 5

        height = mountainFactor * mountainHeight + mountainNoise
        height = Math.max(height, 5) // 确保山脉有一定高度
      }

      vertices[i + 2] = height

      // 计算颜色
      let color
      if (distance < plainRadius) {
        // 平地颜色
        color = new THREE.Color(0x8B7355) // 土黄色
      } else {
        // 山脉颜色 - 根据高度变化
        const normalizedHeight = height / (mountainHeight + 30)
        const baseColor = new THREE.Color(0x6B8E23) // 橄榄绿
        const rockColor = new THREE.Color(0x808080) // 岩石灰
        color = baseColor.clone().lerp(rockColor, Math.min(normalizedHeight, 1))
      }

      colors.push(color.r, color.g, color.b)
    }

    // 设置顶点颜色
    planeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    planeGeometry.computeVertexNormals()

    // 创建材质
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      metalness: 0.0,
      flatShading: true
    })

    const terrain = new THREE.Mesh(planeGeometry, material)
    terrain.rotation.x = -Math.PI / 2
    terrain.receiveShadow = true
    terrain.castShadow = true
    terrainGroup.add(terrain)

    this.sceneManager.scene.add(terrainGroup)
    this.sceneObjects.push(terrainGroup)

    // 也将地形添加到terrainGenerator的跟踪列表中，确保能被正确清除
    this.terrainGenerator.terrainMeshes.push(terrainGroup)
  }

  /**
   * 创建勘探设备
   */
  createEquipment() {
    // 钻探设备（多台） - 布置在中间平地上
    const drillPositions = [
      { x: 60, y: 0, z: 40 },
      { x: 80, y: 0, z: 60 },
      { x: 50, y: 0, z: 80 },
      { x: -70, y: 0, z: 30 },
      { x: -40, y: 0, z: -60 }
    ]

    drillPositions.forEach(pos => {
      const rig = this.equipmentFactory.createDrillingRig(pos)
      this.sceneObjects.push(rig)
    })

    // 测量设备 - 布置在平地不同位置
    const surveyPositions = [
      { x: -40, y: 0, z: 30 },
      { x: -30, y: 0, z: 50 },
      { x: -50, y: 0, z: 60 },
      { x: 70, y: 0, z: -40 },
      { x: 40, y: 0, z: -80 }
    ]

    surveyPositions.forEach(pos => {
      const survey = this.equipmentFactory.createSurveyEquipment(pos)
      this.sceneObjects.push(survey)
    })

    // 地质标记点
    this.createGeologicalMarkers()

    // 临时勘探营地
    this.createExplorationCamp()
  }

  /**
   * 创建地质标记点
   */
  createGeologicalMarkers() {
    const positions = [
      { x: 20, y: 0, z: -30 },
      { x: 40, y: 0, z: -50 },
      { x: 60, y: 0, z: -40 },
      { x: -80, y: 0, z: -70 },
      { x: 90, y: 0, z: 20 }
    ]

    positions.forEach(pos => {
      const marker = this.createGeologicalMarker(pos)
      this.sceneObjects.push(marker)
    })
  }

  /**
   * 创建单个地质标记
   */
  createGeologicalMarker(position) {
    const marker = new THREE.Group()

    // 标记杆
    const poleGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 8)
    const poleMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFF00,
      roughness: 0.6
    })
    const pole = new THREE.Mesh(poleGeometry, poleMaterial)
    pole.position.y = 1.5
    marker.add(pole)

    // 标记旗
    const flagGeometry = new THREE.BoxGeometry(1.5, 1, 0.1)
    const flagMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF0000,
      roughness: 0.7
    })
    const flag = new THREE.Mesh(flagGeometry, flagMaterial)
    flag.position.set(0.75, 2.5, 0)
    marker.add(flag)

    marker.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(marker)

    return marker
  }

  /**
   * 创建勘探营地
   */
  createExplorationCamp() {
    const campGroup = new THREE.Group()

    // 营地地面
    const groundGeometry = new THREE.CircleGeometry(25, 32)
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x9B8B65,
      roughness: 0.95
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = 0.1
    campGroup.add(ground)

    // 办公帐篷（多个）
    const tentPositions = [
      { x: -10, z: 5 },
      { x: 10, z: 5 },
      { x: 0, z: -10 },
      { x: -8, z: -8 },
      { x: 8, z: -8 }
    ]

    tentPositions.forEach(pos => {
      const tent = this.createTent(pos.x, pos.z)
      campGroup.add(tent)
    })

    // 主办公楼
    const office = this.createOfficeBuilding()
    campGroup.add(office)

    // 样品堆放区
    this.createSampleArea(campGroup)

    // 营地围栏
    this.createCampFence(campGroup)

    // 营地标识牌
    this.createCampSign(campGroup)

    campGroup.position.set(-80, 0, 80)
    this.sceneManager.scene.add(campGroup)
    this.sceneObjects.push(campGroup)
  }

  /**
   * 创建帐篷
   */
  createTent(x, z) {
    const tentGroup = new THREE.Group()

    // 帐篷主体
    const tentGeometry = new THREE.ConeGeometry(3, 4, 4)
    const tentMaterial = new THREE.MeshStandardMaterial({
      color: 0xD2B48C,
      roughness: 0.9,
      side: THREE.DoubleSide
    })
    const tent = new THREE.Mesh(tentGeometry, tentMaterial)
    tent.position.y = 2
    tent.rotation.y = Math.PI / 4
    tent.castShadow = true
    tent.receiveShadow = true
    tentGroup.add(tent)

    tentGroup.position.set(x, 0, z)
    return tentGroup
  }

  /**
   * 创建办公楼
   */
  createOfficeBuilding() {
    const officeGroup = new THREE.Group()

    // 主建筑
    const mainGeometry = new THREE.BoxGeometry(15, 6, 10)
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0xE8E8E8,
      roughness: 0.8
    })
    const main = new THREE.Mesh(mainGeometry, mainMaterial)
    main.position.y = 3
    main.castShadow = true
    main.receiveShadow = true
    officeGroup.add(main)

    // 屋顶
    const roofGeometry = new THREE.BoxGeometry(17, 1, 12)
    const roofMaterial = new THREE.MeshStandardMaterial({
      color: 0x4A4A4A,
      roughness: 0.7
    })
    const roof = new THREE.Mesh(roofGeometry, roofMaterial)
    roof.position.y = 6.5
    roof.castShadow = true
    officeGroup.add(roof)

    // 门窗
    // 门
    const doorGeometry = new THREE.BoxGeometry(3, 4, 0.2)
    const doorMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      roughness: 0.8
    })
    const door = new THREE.Mesh(doorGeometry, doorMaterial)
    door.position.set(0, 2, 5.1)
    officeGroup.add(door)

    // 窗户
    const windowGeometry = new THREE.BoxGeometry(2, 2, 0.2)
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x87CEEB,
      roughness: 0.3,
      transparent: true,
      opacity: 0.7
    })

    const windowPositions = [
      { x: -4, z: 5.1 },
      { x: 4, z: 5.1 },
      { x: -4, z: -5.1 },
      { x: 4, z: -5.1 }
    ]

    windowPositions.forEach(pos => {
      const window = new THREE.Mesh(windowGeometry, windowMaterial)
      window.position.set(pos.x, 3.5, pos.z)
      officeGroup.add(window)
    })

    officeGroup.position.set(15, 0, 0)
    return officeGroup
  }

  /**
   * 创建样品堆放区
   */
  createSampleArea(parent) {
    const areaGroup = new THREE.Group()

    // 围栏
    const fenceMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      roughness: 0.9
    })

    // 四周围栏
    const fencePositions = [
      { x: 0, z: 8, ry: 0 },
      { x: 0, z: -8, ry: 0 },
      { x: 8, z: 0, ry: Math.PI / 2 },
      { x: -8, z: 0, ry: Math.PI / 2 }
    ]

    fencePositions.forEach(pos => {
      const fenceGeometry = new THREE.BoxGeometry(16, 1.5, 0.3)
      const fence = new THREE.Mesh(fenceGeometry, fenceMaterial)
      fence.position.set(pos.x, 0.75, pos.z)
      fence.rotation.y = pos.ry
      fence.castShadow = true
      areaGroup.add(fence)
    })

    // 样品箱
    const boxGeometry = new THREE.BoxGeometry(1.2, 0.8, 1.2)
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xDEB887,
      roughness: 0.8
    })

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 2; j++) {
        const box = new THREE.Mesh(boxGeometry, boxMaterial)
        box.position.set(-4 + i * 2.5, 0.4, -3 + j * 5)
        box.castShadow = true
        areaGroup.add(box)
      }
    }

    areaGroup.position.set(-40, 0, -10)
    parent.add(areaGroup)
  }

  /**
   * 创建营地围栏
   */
  createCampFence(parent) {
    const fenceMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 0.9
    })

    // 圆形围栏
    const fenceRadius = 30
    const fenceSegments = 16

    for (let i = 0; i < fenceSegments; i++) {
      const angle = (i / fenceSegments) * Math.PI * 2
      const nextAngle = ((i + 1) / fenceSegments) * Math.PI * 2

      const x1 = Math.cos(angle) * fenceRadius
      const z1 = Math.sin(angle) * fenceRadius
      const x2 = Math.cos(nextAngle) * fenceRadius
      const z2 = Math.sin(nextAngle) * fenceRadius

      // 围栏段
      const segmentGeometry = new THREE.BoxGeometry(
        Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2),
        1.8,
        0.3
      )
      const segment = new THREE.Mesh(segmentGeometry, fenceMaterial)
      segment.position.set((x1 + x2) / 2, 0.9, (z1 + z2) / 2)
      segment.rotation.y = -Math.atan2(x2 - x1, z2 - z1)
      segment.castShadow = true
      parent.add(segment)
    }

    // 入口标识
    const gateGeometry = new THREE.BoxGeometry(6, 2.5, 0.3)
    const gateMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF6600,
      roughness: 0.7,
      emissive: 0xFF6600,
      emissiveIntensity: 0.2
    })
    const gate = new THREE.Mesh(gateGeometry, gateMaterial)
    gate.position.set(30, 1.25, 0)
    parent.add(gate)
  }

  /**
   * 创建营地标识牌
   */
  createCampSign(parent) {
    const signGroup = new THREE.Group()

    // 标识板
    const boardGeometry = new THREE.BoxGeometry(8, 3, 0.3)
    const boardMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFAA00,
      roughness: 0.6,
      emissive: 0xFFAA00,
      emissiveIntensity: 0.2
    })
    const board = new THREE.Mesh(boardGeometry, boardMaterial)
    board.position.set(35, 4, 0)
    board.castShadow = true
    signGroup.add(board)

    // 支撑杆
    const poleGeometry = new THREE.CylinderGeometry(0.2, 0.2, 5, 8)
    const poleMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.7
    })
    const pole1 = new THREE.Mesh(poleGeometry, poleMaterial)
    pole1.position.set(32, 2.5, -1)
    signGroup.add(pole1)

    const pole2 = new THREE.Mesh(poleGeometry, poleMaterial)
    pole2.position.set(32, 2.5, 1)
    signGroup.add(pole2)

    parent.add(signGroup)
  }

  /**
   * 添加热点
   */
  addHotspots() {
    // 钻探作业热点
    const drillingHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(60, 15, 40),
      {
        id: 'exploration-drilling',
        title: '地质钻探',
        description: '通过钻探获取地下岩心样品，分析地质构造和矿体特征',
        details: [
          '钻探深度：可达2000米',
          '取心率：>90%',
          '钻孔间距：100-200米',
          '岩心分析：矿物组成、品位测定'
        ],
        originalPosition: new THREE.Vector3(60, 0, 40)
      }
    )
    this.hotspots.push(drillingHotspot)

    // 地质测量热点
    const surveyHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(-40, 12, 30),
      {
        id: 'exploration-survey',
        title: '地质测量',
        description: '进行详细地质填图和构造测量，查明矿体分布规律',
        details: [
          '测量比例尺：1:1000-1:5000',
          'GPS定位精度：厘米级',
          '测量内容：地形、地质构造、矿体边界',
          '成果：地质图、剖面图、储量计算'
        ],
        originalPosition: new THREE.Vector3(-40, 0, 30)
      }
    )
    this.hotspots.push(surveyHotspot)

    // 勘探营地热点
    const campHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(-80, 10, 80),
      {
        id: 'exploration-camp',
        title: '勘探营地',
        description: '野外勘探工作人员的临时生活和办公场所',
        details: [
          '营地设施：办公室、宿舍、食堂',
          '样品管理：专用样品存放室',
          '安全设施：通信设备、急救站',
          '环保措施：废物处理、污水处理'
        ],
        originalPosition: new THREE.Vector3(-80, 0, 80)
      }
    )
    this.hotspots.push(campHotspot)

    // 山脉地形热点
    const mountainHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(180, 35, -180),
      {
        id: 'exploration-terrain',
        title: '勘探区域地形',
        description: '周围山脉环绕，中间为平坦的勘探作业区域',
        details: [
          '地形特征：盆地地形，四周环山',
          '海拔高度：相对高差60-80米',
          '地质条件：复杂构造，多岩层露头',
          '勘探优势：露头良好，易于观测'
        ],
        originalPosition: new THREE.Vector3(180, 20, -180)
      }
    )
    this.hotspots.push(mountainHotspot)
  }

  /**
   * 设置相机位置
   */
  setupCamera() {
    // 前期准备场景不需要直接设置相机，由SceneController的transitionCamera处理
    console.log('前期准备场景setupCamera被调用，跳过直接相机设置')
  }

  /**
   * 清除之前的对象
   */
  clearPreviousObjects() {
    this.sceneObjects.forEach(obj => {
      this.sceneManager.scene.remove(obj)
      obj.traverse(child => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose()
          if (child.material) child.material.dispose()
        }
      })
    })
    this.sceneObjects = []
    this.hotspots = []
  }

  /**
   * 销毁场景
   */
  dispose() {
    this.clearPreviousObjects()
    this.terrainGenerator.clearAll()
    this.equipmentFactory.clearAll()
  }
}

export default ExplorationStage