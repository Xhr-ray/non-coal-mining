/**
 * 辅助生产系统场景构建器
 */
import * as THREE from 'three'
import { TerrainGenerator } from '../objects/TerrainGenerator.js'
import { EquipmentFactory } from '../objects/EquipmentFactory.js'

export class AuxiliaryStage {
  constructor(sceneManager) {
    this.sceneManager = sceneManager
    this.terrainGenerator = new TerrainGenerator(sceneManager)
    this.equipmentFactory = new EquipmentFactory(sceneManager)
    this.sceneObjects = []
    this.hotspots = []
  }

  /**
   * 构建辅助系统场景
   */
  build() {
    // 清除现有场景
    this.sceneManager.clearScene()
    this.clearPreviousObjects()

    // 创建地形
    this.createTerrain()

    // 创建通风系统设备
    this.createVentilationSystems()

    // 创建排水系统
    this.createDrainageSystems()

    // 创建供配电设施
    this.createPowerSystems()

    // 创建调度通信中心
    this.createCommunicationCenter()

    // 添加热点
    this.addHotspots()

    // 设置相机位置
    this.setupCamera()
  }

  /**
   * 创建地形
   */
  createTerrain() {
    const terrain = this.terrainGenerator.createExplorationTerrain()
    this.sceneObjects.push(terrain)
  }

  /**
   * 创建通风系统
   */
  createVentilationSystems() {
    // 通风机房
    const ventPositions = [
      { x: -80, y: 0, z: -60 },
      { x: 80, y: 0, z: 60 }
    ]

    ventPositions.forEach(pos => {
      const ventBuilding = this.createVentilationBuilding(pos)
      this.sceneObjects.push(ventBuilding)

      // 通风机
      const fan = this.createVentilationFan({
        x: pos.x,
        y: 8,
        z: pos.z + 10
      })
      this.sceneObjects.push(fan)
    })
  }

  /**
   * 创建通风机房
   */
  createVentilationBuilding(position) {
    const building = new THREE.Group()

    const mainGeometry = new THREE.BoxGeometry(15, 10, 12)
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0x708090,
      roughness: 0.7
    })
    const main = new THREE.Mesh(mainGeometry, mainMaterial)
    main.position.y = 5
    main.castShadow = true
    building.add(main)

    // 屋顶通风管道
    const ductGeometry = new THREE.CylinderGeometry(2, 2, 15, 12)
    const ductMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.6,
      metalness: 0.7
    })
    const duct = new THREE.Mesh(ductGeometry, ductMaterial)
    duct.position.set(0, 12, 0)
    duct.rotation.z = Math.PI / 2
    duct.castShadow = true
    building.add(duct)

    building.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(building)

    return building
  }

  /**
   * 创建通风机
   */
  createVentilationFan(position) {
    const fanGroup = new THREE.Group()

    // 风机外壳
    const housingGeometry = new THREE.CylinderGeometry(4, 4, 3, 16)
    const housingMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.5,
      metalness: 0.8
    })
    const housing = new THREE.Mesh(housingGeometry, housingMaterial)
    housing.position.y = 4
    housing.rotation.z = Math.PI / 2
    housing.castShadow = true
    fanGroup.add(housing)

    // 风扇叶片（示意）
    const bladeGeometry = new THREE.BoxGeometry(6, 0.5, 0.5)
    const bladeMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.4,
      metalness: 0.9
    })
    const blade1 = new THREE.Mesh(bladeGeometry, bladeMaterial)
    blade1.position.set(0, 4, 0)
    fanGroup.add(blade1)

    const blade2 = new THREE.Mesh(bladeGeometry, bladeMaterial)
    blade2.position.set(0, 4, 0)
    blade2.rotation.y = Math.PI / 2
    fanGroup.add(blade2)

    fanGroup.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(fanGroup)

    return fanGroup
  }

  /**
   * 创建排水系统
   */
  createDrainageSystems() {
    // 水泵房
    const pumpRoom = this.createPumpRoom({ x: -60, y: 0, z: 80 })
    this.sceneObjects.push(pumpRoom)

    // 水仓示意
    this.createWaterReservoir({ x: -80, y: 0, z: 100 })
  }

  /**
   * 创建水泵房
   */
  createPumpRoom(position) {
    const room = new THREE.Group()

    const buildingGeometry = new THREE.BoxGeometry(12, 8, 10)
    const buildingMaterial = new THREE.MeshStandardMaterial({
      color: 0x607D8B,
      roughness: 0.7
    })
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial)
    building.position.y = 4
    building.castShadow = true
    room.add(building)

    // 水泵示意
    const pumpGeometry = new THREE.BoxGeometry(3, 4, 3)
    const pumpMaterial = new THREE.MeshStandardMaterial({
      color: 0x455A64,
      roughness: 0.6,
      metalness: 0.7
    })
    const pump1 = new THREE.Mesh(pumpGeometry, pumpMaterial)
    pump1.position.set(-3, 3, 0)
    pump1.castShadow = true
    room.add(pump1)

    const pump2 = new THREE.Mesh(pumpGeometry, pumpMaterial)
    pump2.position.set(3, 3, 0)
    pump2.castShadow = true
    room.add(pump2)

    room.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(room)

    return room
  }

  /**
   * 创建水仓
   */
  createWaterReservoir(position) {
    const reservoir = new THREE.Group()

    // 水仓主体
    const tankGeometry = new THREE.CylinderGeometry(8, 8, 6, 16)
    const tankMaterial = new THREE.MeshStandardMaterial({
      color: 0x607D8B,
      roughness: 0.6,
      metalness: 0.5,
      transparent: true,
      opacity: 0.8
    })
    const tank = new THREE.Mesh(tankGeometry, tankMaterial)
    tank.position.y = 3
    tank.castShadow = true
    reservoir.add(tank)

    // 水位示意
    const waterGeometry = new THREE.CylinderGeometry(7.5, 7.5, 4, 16)
    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x2196F3,
      roughness: 0.1,
      transparent: true,
      opacity: 0.6
    })
    const water = new THREE.Mesh(waterGeometry, waterMaterial)
    water.position.y = 2
    reservoir.add(water)

    reservoir.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(reservoir)

    return reservoir
  }

  /**
   * 创建供配电系统
   */
  createPowerSystems() {
    // 变电站
    const substation = this.createSubstation({ x: 80, y: 0, z: -80 })
    this.sceneObjects.push(substation)

    // 配电室
    this.createDistributionRoom({ x: 100, y: 0, z: -60 })
  }

  /**
   * 创建变电站
   */
  createSubstation(position) {
    const substation = new THREE.Group()

    // 主变压器
    const transformerGeometry = new THREE.BoxGeometry(8, 10, 6)
    const transformerMaterial = new THREE.MeshStandardMaterial({
      color: 0x546E7A,
      roughness: 0.6,
      metalness: 0.7
    })
    const transformer = new THREE.Mesh(transformerGeometry, transformerMaterial)
    transformer.position.y = 5
    transformer.castShadow = true
    substation.add(transformer)

    // 高压线塔
    this.createTransmissionTower(substation, { x: -15, y: 0, z: 20 })
    this.createTransmissionTower(substation, { x: 15, y: 0, z: 20 })

    // 围栏
    this.createFence(substation, 25, 20)

    substation.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(substation)

    return substation
  }

  /**
   * 创建输电塔
   */
  createTransmissionTower(parent, position) {
    const tower = new THREE.Group()

    const bodyGeometry = new THREE.CylinderGeometry(1, 2, 20, 4)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x37474F,
      roughness: 0.7
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 10
    body.castShadow = true
    tower.add(body)

    const armGeometry = new THREE.BoxGeometry(8, 0.5, 0.5)
    const arm = new THREE.Mesh(armGeometry, bodyMaterial)
    arm.position.y = 18
    tower.add(arm)

    tower.position.set(position.x, position.y, position.z)
    parent.add(tower)
  }

  /**
   * 创建围栏
   */
  createFence(parent, width, depth) {
    const fenceGeometry = new THREE.BoxGeometry(0.3, 2, 0.3)
    const fenceMaterial = new THREE.MeshStandardMaterial({
      color: 0x455A64,
      roughness: 0.9
    })

    // 四周边框
    for (let i = 0; i <= width / 3; i++) {
      const fence1 = new THREE.Mesh(fenceGeometry, fenceMaterial)
      fence1.position.set(-width / 2 + i * 3, 1, -depth / 2)
      parent.add(fence1)

      const fence2 = new THREE.Mesh(fenceGeometry, fenceMaterial)
      fence2.position.set(-width / 2 + i * 3, 1, depth / 2)
      parent.add(fence2)
    }

    for (let i = 0; i <= depth / 3; i++) {
      const fence3 = new THREE.Mesh(fenceGeometry, fenceMaterial)
      fence3.position.set(-width / 2, 1, -depth / 2 + i * 3)
      parent.add(fence3)

      const fence4 = new THREE.Mesh(fenceGeometry, fenceMaterial)
      fence4.position.set(width / 2, 1, -depth / 2 + i * 3)
      parent.add(fence4)
    }
  }

  /**
   * 创建配电室
   */
  createDistributionRoom(position) {
    const room = new THREE.Group()

    const buildingGeometry = new THREE.BoxGeometry(10, 6, 8)
    const buildingMaterial = new THREE.MeshStandardMaterial({
      color: 0x78909C,
      roughness: 0.7
    })
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial)
    building.position.y = 3
    building.castShadow = true
    room.add(building)

    room.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(room)

    return room
  }

  /**
   * 创建调度通信中心
   */
  createCommunicationCenter() {
    const center = new THREE.Group()

    // 主楼
    const mainGeometry = new THREE.BoxGeometry(25, 15, 20)
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0x37474F,
      roughness: 0.7
    })
    const main = new THREE.Mesh(mainGeometry, mainMaterial)
    main.position.y = 7.5
    main.castShadow = true
    center.add(main)

    // 指挥大厅玻璃幕墙
    const glassGeometry = new THREE.PlaneGeometry(20, 10)
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0x87CEEB,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.6
    })
    const glass = new THREE.Mesh(glassGeometry, glassMaterial)
    glass.position.set(0, 8, 10.1)
    center.add(glass)

    // 通信塔
    const tower = this.createCommunicationTower({ x: 0, y: 0, z: -25 })
    center.add(tower)

    center.position.set(0, 0, 0)
    this.sceneManager.scene.add(center)
    this.sceneObjects.push(center)
  }

  /**
   * 创建通信塔
   */
  createCommunicationTower(position) {
    const tower = new THREE.Group()

    // 塔身
    const bodyGeometry = new THREE.CylinderGeometry(1.5, 3, 30, 6)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x455A64,
      roughness: 0.7,
      metalness: 0.6
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 15
    body.castShadow = true
    tower.add(body)

    // 平台
    for (let i = 0; i < 3; i++) {
      const platformGeometry = new THREE.BoxGeometry(8, 0.5, 8)
      const platform = new THREE.Mesh(platformGeometry, bodyMaterial)
      platform.position.y = 8 + i * 8
      tower.add(platform)
    }

    // 天线
    const antennaGeometry = new THREE.CylinderGeometry(0.2, 0.2, 8, 8)
    const antennaMaterial = new THREE.MeshStandardMaterial({
      color: 0x37474F,
      roughness: 0.6,
      metalness: 0.8
    })
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial)
    antenna.position.y = 30
    tower.add(antenna)

    tower.position.set(position.x, position.y, position.z)
    return tower
  }

  /**
   * 添加热点
   */
  addHotspots() {
    // 通风系统热点
    const ventHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(-80, 15, -60),
      {
        id: 'auxiliary-ventilation',
        title: '通风系统',
        description: '为矿山生产提供新鲜空气，排除有害气体',
        details: [
          '主通风机：轴流式风机',
          '供风量：200-5000m³/min',
          '通风方式：机械抽出式',
          '监控参数：风量、风压、瓦斯浓度'
        ],
        originalPosition: new THREE.Vector3(-80, 0, -60)
      }
    )
    this.hotspots.push(ventHotspot)

    // 排水系统热点
    const drainageHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(-60, 12, 80),
      {
        id: 'auxiliary-drainage',
        title: '排水系统',
        description: '排除井下涌水，确保生产安全',
        details: [
          '排水能力：50-1000m³/h',
          '水泵台数：3-5台',
          '水仓容量：≥500m³',
          '控制方式：自动启停'
        ],
        originalPosition: new THREE.Vector3(-60, 0, 80)
      }
    )
    this.hotspots.push(drainageHotspot)

    // 供配电热点
    const powerHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(80, 15, -80),
      {
        id: 'auxiliary-power',
        title: '供配电系统',
        description: '为矿山各系统提供可靠电力供应',
        details: [
          '供电容量：10-100MVA',
          '电压等级：110kV',
          '供电可靠性：≥99.5%',
          '功率因数：≥0.95'
        ],
        originalPosition: new THREE.Vector3(80, 0, -80)
      }
    )
    this.hotspots.push(powerHotspot)

    // 通信中心热点
    const commHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(0, 20, 0),
      {
        id: 'auxiliary-communication',
        title: '调度通信中心',
        description: '矿山生产调度指挥和通信联络中心',
        details: [
          '调度电话：100+门',
          '覆盖范围：生产区域全覆盖',
          '应急响应：实时',
          '系统集成：调度、监控、通信'
        ],
        originalPosition: new THREE.Vector3(0, 0, 0)
      }
    )
    this.hotspots.push(commHotspot)
  }

  /**
   * 设置相机位置
   */
  setupCamera() {
    // 辅助生产系统场景不需要直接设置相机，由SceneController的transitionCamera处理
    console.log('辅助生产系统场景setupCamera被调用，跳过直接相机设置')
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

export default AuxiliaryStage