/**
 * 露天开采阶段场景构建器
 */
import * as THREE from 'three'
import { TerrainGenerator } from '../objects/TerrainGenerator.js'
import { EquipmentFactory } from '../objects/EquipmentFactory.js'

export class OpenPitStage {
  constructor(sceneManager) {
    this.sceneManager = sceneManager
    this.terrainGenerator = new TerrainGenerator(sceneManager)
    this.equipmentFactory = new EquipmentFactory(sceneManager)
    this.sceneObjects = []
    this.hotspots = []
  }

  /**
   * 构建露天开采场景
   */
  build() {
    // 清除现有场景
    this.sceneManager.clearScene()
    this.clearPreviousObjects()

    // 创建露天矿坑地形
    this.createTerrain()

    // 创建边坡台阶特征
    this.createSlopeFeatures()

    // 创建采矿设备
    this.createMiningEquipment()

    // 创建运输系统
    this.createTransportSystem()

    // 创建破碎系统
    this.createCrushingSystem()

    // 创建辅助设施
    this.createAuxiliaryFacilities()

    // 添加热点
    this.addHotspots()

    // 设置相机位置
    this.setupCamera()
  }

  /**
   * 创建地形
   */
  createTerrain() {
    const terrain = this.terrainGenerator.createOpenPitTerrain()
    this.sceneObjects.push(terrain)
  }

  /**
   * 创建采矿设备
   */
  createMiningEquipment() {
    // 大型挖掘机（在矿坑底部）
    const excavatorPositions = [
      { x: 30, y: -80, z: 30 },
      { x: -20, y: -60, z: 40 },
      { x: 40, y: -40, z: -30 }
    ]

    excavatorPositions.forEach(pos => {
      const excavator = this.equipmentFactory.createExcavator(pos)
      // 调整挖掘机到正确的标高
      excavator.position.y = pos.y
      this.sceneObjects.push(excavator)
    })

    // 钻机（用于爆破孔）
    const drillRig = this.equipmentFactory.createDrillingRig({ x: -30, y: -50, z: -20 })
    drillRig.position.y = -50
    this.sceneObjects.push(drillRig)
  }

  /**
   * 创建运输系统
   */
  createTransportSystem() {
    // 重型卡车（在不同标高道路上）
    const truckPositions = [
      { x: 80, y: -30, z: 60 },
      { x: -60, y: -20, z: 50 },
      { x: 70, y: -40, z: -40 },
      { x: -40, y: -10, z: -60 },
      { x: 50, y: 0, z: 80 }
    ]

    truckPositions.forEach(pos => {
      const truck = this.equipmentFactory.createMiningTruck(pos)
      truck.position.y = pos.y
      // 根据道路方向调整卡车朝向
      truck.rotation.y = Math.random() * Math.PI * 2
      this.sceneObjects.push(truck)
    })
  }

  /**
   * 创建破碎系统
   */
  createCrushingSystem() {
    // 破碎站（在矿坑附近）
    const crusherPositions = [
      { x: 100, y: 0, z: 80 },
      { x: -100, y: 0, z: -80 }
    ]

    crusherPositions.forEach(pos => {
      const crusher = this.equipmentFactory.createCrusher(pos)
      this.sceneObjects.push(crusher)
    })
  }

  /**
   * 创建辅助设施
   */
  createAuxiliaryFacilities() {
    // 办公室
    const office = this.equipmentFactory.createOffice({
      x: -120,
      y: 0,
      z: 100
    })
    this.sceneObjects.push(office)

    // 修理车间
    const workshop = this.createWorkshop({ x: 120, y: 0, z: -100 })
    this.sceneObjects.push(workshop)

    // 油库
    const fuelStation = this.createFuelStation({ x: 100, y: 0, z: -120 })
    this.sceneObjects.push(fuelStation)

    // 排土场标识
    this.createWasteDump()
  }

  /**
   * 创建修理车间
   */
  createWorkshop(position) {
    const workshop = new THREE.Group()

    // 车间主体
    const mainGeometry = new THREE.BoxGeometry(25, 12, 20)
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.7,
      metalness: 0.5
    })
    const main = new THREE.Mesh(mainGeometry, mainMaterial)
    main.position.y = 6
    main.castShadow = true
    workshop.add(main)

    // 大门
    const doorGeometry = new THREE.BoxGeometry(8, 8, 0.5)
    const doorMaterial = new THREE.MeshStandardMaterial({
      color: 0x606060,
      roughness: 0.8
    })
    const door = new THREE.Mesh(doorGeometry, doorMaterial)
    door.position.set(0, 4, 10.25)
    workshop.add(door)

    // 行车起重机
    const craneGeometry = new THREE.BoxGeometry(20, 0.5, 0.5)
    const craneMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF6600,
      roughness: 0.6,
      metalness: 0.7
    })
    const crane = new THREE.Mesh(craneGeometry, craneMaterial)
    crane.position.y = 11
    workshop.add(crane)

    workshop.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(workshop)

    return workshop
  }

  /**
   * 创建加油站
   */
  createFuelStation(position) {
    const station = new THREE.Group()

    // 储油罐
    const tankGeometry = new THREE.CylinderGeometry(5, 5, 12, 16)
    const tankMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.6,
      metalness: 0.7
    })
    const tank1 = new THREE.Mesh(tankGeometry, tankMaterial)
    tank1.position.set(-6, 6, 0)
    tank1.rotation.z = Math.PI / 2
    tank1.castShadow = true
    station.add(tank1)

    const tank2 = new THREE.Mesh(tankGeometry, tankMaterial)
    tank2.position.set(6, 6, 0)
    tank2.rotation.z = Math.PI / 2
    tank2.castShadow = true
    station.add(tank2)

    // 加油机
    const pumpGeometry = new THREE.BoxGeometry(2, 3, 2)
    const pumpMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFF00,
      roughness: 0.5
    })
    const pump1 = new THREE.Mesh(pumpGeometry, pumpMaterial)
    pump1.position.set(0, 1.5, 4)
    pump1.castShadow = true
    station.add(pump1)

    const pump2 = new THREE.Mesh(pumpGeometry, pumpMaterial)
    pump2.position.set(0, 1.5, -4)
    pump2.castShadow = true
    station.add(pump2)

    // 防雨棚
    const roofGeometry = new THREE.BoxGeometry(10, 0.5, 12)
    const roofMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.7
    })
    const roof = new THREE.Mesh(roofGeometry, roofMaterial)
    roof.position.y = 5
    roof.castShadow = true
    station.add(roof)

    station.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(station)

    return station
  }

  /**
   * 创建排土场
   */
  createWasteDump() {
    const dump = new THREE.Group()

    // 废石堆
    for (let i = 0; i < 5; i++) {
      const pileGeometry = new THREE.ConeGeometry(15 + i * 3, 10 + i * 2, 8)
      const pileMaterial = new THREE.MeshStandardMaterial({
        color: 0x6B6B6B,
        roughness: 0.9
      })
      const pile = new THREE.Mesh(pileGeometry, pileMaterial)
      pile.position.set(-150 + i * 20, (10 + i * 2) / 2, -150 + i * 15)
      pile.castShadow = true
      dump.add(pile)
    }

    // 警示标志
    const signGeometry = new THREE.BoxGeometry(3, 4, 0.3)
    const signMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFCC00,
      roughness: 0.6
    })
    const sign = new THREE.Mesh(signGeometry, signMaterial)
    sign.position.set(-140, 8, -140)
    dump.add(sign)

    this.sceneManager.scene.add(dump)
    this.sceneObjects.push(dump)
  }

  /**
   * 添加热点
   */
  addHotspots() {
    // 采矿作业热点
    const miningHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(30, -65, 30),
      {
        id: 'openpit-mining',
        title: '露天采矿作业',
        description: '采用台阶式开采，自上而下分层剥离和采矿',
        details: [
          '台阶高度：10-15米',
          '工作面宽度：≥30米',
          '坡面角：≤70°',
          '开采方法：穿孔爆破-采装-运输'
        ],
        originalPosition: new THREE.Vector3(30, -80, 30)
      }
    )
    this.hotspots.push(miningHotspot)

    // 运输系统热点
    const transportHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(80, -15, 60),
      {
        id: 'openpit-transport',
        title: '矿岩运输系统',
        description: '重型卡车将矿石运至破碎站，废石运至排土场',
        details: [
          '运输设备：大型矿用卡车（载重100-300吨）',
          '运输道路：宽度15-20米，坡度≤8%',
          '运输能力：500-1000万吨/年',
          '运输成本：占采矿总成本40%以上'
        ],
        originalPosition: new THREE.Vector3(80, -30, 60)
      }
    )
    this.hotspots.push(transportHotspot)

    // 破碎系统热点
    const crushingHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(100, 12, 80),
      {
        id: 'openpit-crushing',
        title: '矿石破碎系统',
        description: '粗碎设备将大块矿石破碎至合适粒度',
        details: [
          '破碎设备：旋回破碎机、颚式破碎机',
          '进料粒度：≤1500mm',
          '出料粒度：150-250mm',
          '处理能力：2000-5000t/h'
        ],
        originalPosition: new THREE.Vector3(100, 0, 80)
      }
    )
    this.hotspots.push(crushingHotspot)

    // 边坡监测热点
    const slopeHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(-60, -10, 50),
      {
        id: 'openpit-slope',
        title: '边坡安全监测',
        description: '实时监测露天矿边坡稳定性，确保安全生产',
        details: [
          '监测内容：位移、应力、地下水',
          '监测设备：GPS、测斜仪、应力计',
          '预警标准：位移速率≥2mm/天',
          '巡查频次：每日定时巡查'
        ],
        originalPosition: new THREE.Vector3(-60, -20, 50)
      }
    )
    this.hotspots.push(slopeHotspot)

    // 爆破作业热点
    const blastingHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(-30, -35, -20),
      {
        id: 'openpit-blasting',
        title: '爆破作业',
        description: '通过爆破破碎坚硬岩石，为采装作业创造条件',
        details: [
          '爆破方法：多排微差爆破',
          '炸药类型：乳化炸药、铵油炸药',
          '安全距离：人员≥200米，设备≥100米',
          '爆破效果：大块率<5%，根底率<3%'
        ],
        originalPosition: new THREE.Vector3(-30, -50, -20)
      }
    )
    this.hotspots.push(blastingHotspot)
  }

  /**
   * 创建边坡台阶特征
   */
  createSlopeFeatures() {
    // 创建显著的边坡台阶
    const slopeSteps = [
      { y: -20, radius: 80, color: 0x8B7355 },
      { y: -40, radius: 60, color: 0x7A6545 },
      { y: -60, radius: 45, color: 0x695735 },
      { y: -80, radius: 30, color: 0x584925 },
      { y: -100, radius: 20, color: 0x473B15 }
    ]

    slopeSteps.forEach((step, index) => {
      // 创建台阶环
      const ringGeometry = new THREE.RingGeometry(step.radius - 5, step.radius + 5, 64)
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: step.color,
        roughness: 0.9,
        side: THREE.DoubleSide
      })
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.rotation.x = -Math.PI / 2
      ring.position.y = step.y + 0.1
      this.sceneManager.scene.add(ring)
      this.sceneObjects.push(ring)

      // 添加台阶标记
      if (index % 2 === 0) {
        this.createStepMarker(step.radius, step.y, index + 1)
      }
    })

    // 创建边坡防护网示意
    this.createSlopeProtection()
  }

  /**
   * 创建台阶标记
   */
  createStepMarker(radius, height, stepNumber) {
    const markerGroup = new THREE.Group()

    // 标记柱
    const poleGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 8)
    const poleMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF6600,
      roughness: 0.7,
      metalness: 0.3
    })

    const positions = [
      { x: radius, z: 0 },
      { x: -radius, z: 0 },
      { x: 0, z: radius },
      { x: 0, z: -radius }
    ]

    positions.forEach(pos => {
      const pole = new THREE.Mesh(poleGeometry, poleMaterial)
      pole.position.set(pos.x, height + 1.5, pos.z)
      markerGroup.add(pole)

      // 标记牌
      const signGeometry = new THREE.BoxGeometry(1, 0.6, 0.1)
      const signMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.5
      })
      const sign = new THREE.Mesh(signGeometry, signMaterial)
      sign.position.set(pos.x * 1.1, height + 2.8, pos.z)
      markerGroup.add(sign)
    })

    this.sceneManager.scene.add(markerGroup)
    this.sceneObjects.push(markerGroup)
  }

  /**
   * 创建边坡防护
   */
  createSlopeProtection() {
    // 在主要边坡区域添加防护网示意
    const protectionPositions = [
      { startAngle: 0, endAngle: Math.PI / 2, radius: 70 },
      { startAngle: Math.PI, endAngle: Math.PI * 1.5, radius: 50 }
    ]

    protectionPositions.forEach((pos, index) => {
      const curve = new THREE.EllipseCurve(
        0, 0,
        pos.radius, pos.radius,
        pos.startAngle, pos.endAngle,
        false,
        0
      )

      const points = curve.getPoints(50)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: 0x00FF00,
        linewidth: 2
      })

      const protectionLine = new THREE.Line(geometry, material)
      protectionLine.rotation.x = -Math.PI / 2
      protectionLine.position.y = -30
      this.sceneManager.scene.add(protectionLine)
      this.sceneObjects.push(protectionLine)
    })
  }

  /**
   * 设置相机位置
   */
  setupCamera() {
    // 露天开采场景不需要直接设置相机，由SceneController的transitionCamera处理
    console.log('露天开采场景setupCamera被调用，跳过直接相机设置')
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

export default OpenPitStage