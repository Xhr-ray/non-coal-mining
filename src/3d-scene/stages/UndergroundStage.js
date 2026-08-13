/**
 * 地下开采阶段场景构建器
 */
import * as THREE from 'three'
import { TerrainGenerator } from '../objects/TerrainGenerator.js'
import { EquipmentFactory } from '../objects/EquipmentFactory.js'

export class UndergroundStage {
  constructor(sceneManager) {
    this.sceneManager = sceneManager
    this.terrainGenerator = new TerrainGenerator(sceneManager)
    this.equipmentFactory = new EquipmentFactory(sceneManager)
    this.sceneObjects = []
    this.hotspots = []
  }

  /**
   * 构建地下开采场景
   */
  build() {
    // 清除现有场景
    this.sceneManager.clearScene()
    this.clearPreviousObjects()

    // 创建地形
    this.createTerrain()

    // 创建井口设施
    this.createShaftFacilities()

    // 创建地下开采示意
    this.createUndergroundVisualization()

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
    const terrain = this.terrainGenerator.createUndergroundTerrain()
    this.sceneObjects.push(terrain)
  }

  /**
   * 创建井口设施
   */
  createShaftFacilities() {
    // 主井架
    const mainHeadframe = this.equipmentFactory.createHeadframe({ x: 50, y: 0, z: 50 })
    this.sceneObjects.push(mainHeadframe)

    // 副井架
    const auxHeadframe = this.equipmentFactory.createHeadframe({ x: -60, y: 0, z: -40 })
    this.sceneObjects.push(auxHeadframe)

    // 井口房
    this.createShaftHouse({ x: 50, y: 0, z: 70 })
    this.createShaftHouse({ x: -60, y: 0, z: -20 })

    // 提升机房
    this.createHoistRoom({ x: 30, y: 0, z: 80 })
    this.createHoistRoom({ x: -80, y: 0, z: -30 })
  }

  /**
   * 创建井口房
   */
  createShaftHouse(position) {
    const house = new THREE.Group()

    // 房屋主体
    const mainGeometry = new THREE.BoxGeometry(8, 6, 8)
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.7,
      metalness: 0.3
    })
    const main = new THREE.Mesh(mainGeometry, mainMaterial)
    main.position.y = 3
    main.castShadow = true
    house.add(main)

    // 井筒口
    const shaftGeometry = new THREE.CylinderGeometry(3, 3, 2, 16)
    const shaftMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8
    })
    const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial)
    shaft.position.y = 1
    house.add(shaft)

    house.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(house)
    this.sceneObjects.push(house)
  }

  /**
   * 创建提升机房
   */
  createHoistRoom(position) {
    const room = new THREE.Group()

    // 机房主体
    const mainGeometry = new THREE.BoxGeometry(15, 10, 12)
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0xDEB887,
      roughness: 0.7
    })
    const main = new THREE.Mesh(mainGeometry, mainMaterial)
    main.position.y = 5
    main.castShadow = true
    room.add(main)

    // 提升机卷筒（示意）
    const drumGeometry = new THREE.CylinderGeometry(4, 4, 8, 16)
    const drumMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.5,
      metalness: 0.8
    })
    const drum = new THREE.Mesh(drumGeometry, drumMaterial)
    drum.position.set(0, 4, 0)
    drum.rotation.z = Math.PI / 2
    drum.castShadow = true
    room.add(drum)

    // 电机
    const motorGeometry = new THREE.BoxGeometry(4, 4, 4)
    const motorMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.4,
      metalness: 0.7
    })
    const motor = new THREE.Mesh(motorGeometry, motorMaterial)
    motor.position.set(8, 2, 0)
    motor.castShadow = true
    room.add(motor)

    room.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(room)
    this.sceneObjects.push(room)
  }

  /**
   * 创建地下开采示意
   */
  createUndergroundVisualization() {
    // 创建半透明剖面显示地下巷道
    this.createUndergroundLevels()
  }

  /**
   * 创建地下开采水平示意
   */
  createUndergroundLevels() {
    const levels = [
      { y: -150, color: 0x4A4A4A, name: '-150m水平' },
      { y: -200, color: 0x3A3A3A, name: '-200m水平' },
      { y: -250, color: 0x2A2A2A, name: '-250m水平' }
    ]

    levels.forEach((level, index) => {
      const levelGroup = this.createMiningLevel(level.y, level.color, index, level.name)
      this.sceneObjects.push(levelGroup)
    })

    // 添加竖井连接线
    this.createShaftLines()

    // 添加深井特征
    this.createDeepShaftFeatures()

    // 添加巷道支护设备
    this.createTunnelSupports()
  }

  /**
   * 创建深井特征
   */
  createDeepShaftFeatures() {
    console.log('创建深井特征...')

    // 主井筒可视化 - 增加尺寸和可见度
    const mainShaftGeometry = new THREE.CylinderGeometry(8, 8, 250, 32, 1, true)
    const shaftMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF6600,
      roughness: 0.6,
      metalness: 0.8,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      emissive: 0xFF6600,
      emissiveIntensity: 0.3
    })
    const mainShaft = new THREE.Mesh(mainShaftGeometry, shaftMaterial)
    mainShaft.position.set(50, -175, 50)
    this.sceneManager.scene.add(mainShaft)
    this.sceneObjects.push(mainShaft)

    // 添加井筒边缘加强环 - 调整到更深的深度
    const ringPositions = [0, -100, -150, -200, -250]
    ringPositions.forEach(y => {
      const ringGeometry = new THREE.TorusGeometry(8, 0.8, 16, 32)
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xFF4400,
        roughness: 0.5,
        metalness: 0.9,
        emissive: 0xFF4400,
        emissiveIntensity: 0.4
      })
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.position.set(50, y, 50)
      ring.rotation.x = Math.PI / 2
      this.sceneManager.scene.add(ring)
      this.sceneObjects.push(ring)
    })

    // 副井筒
    const auxShaft = new THREE.Mesh(mainShaftGeometry, shaftMaterial)
    auxShaft.position.set(-60, -175, -40)
    this.sceneManager.scene.add(auxShaft)
    this.sceneObjects.push(auxShaft)

    // 添加井筒标识
    this.createShaftLabels()

    // 添加井内设备示意（罐道、梯子间等）
    this.createShaftInternalFeatures()

    console.log('深井特征创建完成')
  }

  /**
   * 创建井筒标识
   */
  createShaftLabels() {
    // 主井标识
    const mainLabel = this.createTextLabel('主井', 0xFF6600)
    mainLabel.position.set(50, 20, 50)
    this.sceneManager.scene.add(mainLabel)
    this.sceneObjects.push(mainLabel)

    // 副井标识
    const auxLabel = this.createTextLabel('副井', 0xFF6600)
    auxLabel.position.set(-60, 20, -40)
    this.sceneManager.scene.add(auxLabel)
    this.sceneObjects.push(auxLabel)
  }

  /**
   * 创建文本标签
   */
  createTextLabel(text, color) {
    const labelGroup = new THREE.Group()

    // 背景板
    const bgGeometry = new THREE.BoxGeometry(8, 3, 0.5)
    const bgMaterial = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.7,
      emissive: color,
      emissiveIntensity: 0.4
    })
    const bg = new THREE.Mesh(bgGeometry, bgMaterial)
    labelGroup.add(bg)

    // 模拟文本（使用细条表示文字）
    const textMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.5,
      emissive: 0xFFFFFF,
      emissiveIntensity: 0.3
    })

    // 简单的"井"字模拟
    const line1 = new THREE.Mesh(new THREE.BoxGeometry(4, 0.4, 0.1), textMaterial)
    line1.position.set(0, 0.5, 0.3)
    labelGroup.add(line1)

    const line2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2, 0.1), textMaterial)
    line2.position.set(0, 0, 0.3)
    labelGroup.add(line2)

    return labelGroup
  }

  /**
   * 创建井内特征
   */
  createShaftInternalFeatures() {
    console.log('创建井内特征...')

    const shaftPositions = [
      { x: 50, z: 50 },
      { x: -60, z: -40 }
    ]

    shaftPositions.forEach(pos => {
      // 罐道线 - 增加粗细和可见性
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2
        const radius = 5

        const points = []
        for (let y = 20; y > -330; y -= 5) {
          points.push(new THREE.Vector3(
            pos.x + Math.cos(angle) * radius,
            y,
            pos.z + Math.sin(angle) * radius
          ))
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
          color: 0x00FF00,
          linewidth: 3
        })
        const guideLine = new THREE.Line(geometry, material)
        this.sceneManager.scene.add(guideLine)
        this.sceneObjects.push(guideLine)
      }

      // 添加电梯罐笼示意
      this.createElevatorCage(pos)
    })

    console.log('井内特征创建完成')
  }

  /**
   * 创建电梯罐笼示意
   */
  createElevatorCage(position) {
    const cageGeometry = new THREE.BoxGeometry(6, 8, 6)
    const cageMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFAA00,
      roughness: 0.5,
      metalness: 0.8,
      transparent: true,
      opacity: 0.7,
      emissive: 0xFFAA00,
      emissiveIntensity: 0.3
    })
    const cage = new THREE.Mesh(cageGeometry, cageMaterial)
    cage.position.set(position.x, -150, position.z)
    this.sceneManager.scene.add(cage)
    this.sceneObjects.push(cage)

    // 添加连接线到地表
    const cablePoints = [
      new THREE.Vector3(position.x, -150, position.z),
      new THREE.Vector3(position.x, 20, position.z)
    ]
    const cableGeometry = new THREE.BufferGeometry().setFromPoints(cablePoints)
    const cableMaterial = new THREE.LineBasicMaterial({
      color: 0x333333,
      linewidth: 2
    })
    const cable = new THREE.Line(cableGeometry, cableMaterial)
    this.sceneManager.scene.add(cable)
    this.sceneObjects.push(cable)
  }

  /**
   * 创建巷道支护
   */
  createTunnelSupports() {
    console.log('创建巷道支护...')

    const levels = [-150, -200, -250]

    levels.forEach(level => {
      // 在主要巷道中添加支护示意
      for (let i = 0; i < 12; i++) {
        const supportGroup = this.createTunnelSupport()
        supportGroup.position.set(-80 + i * 15, level, 0)
        this.sceneManager.scene.add(supportGroup)
        this.sceneObjects.push(supportGroup)
      }

      // 添加交叉巷道支护
      for (let j = 0; j < 8; j++) {
        const crossSupport = this.createTunnelSupport()
        crossSupport.position.set(-60 + j * 20, level, -30)
        crossSupport.rotation.y = Math.PI / 2
        this.sceneManager.scene.add(crossSupport)
        this.sceneObjects.push(crossSupport)
      }
    })

    console.log('巷道支护创建完成')
  }

  /**
   * 创建单个巷道支护
   */
  createTunnelSupport() {
    const support = new THREE.Group()

    // 拱形支架 - 增加尺寸和亮度
    const archGeometry = new THREE.TorusGeometry(4, 0.3, 12, 24, Math.PI)
    const archMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF0000,
      roughness: 0.4,
      metalness: 0.8,
      emissive: 0xFF0000,
      emissiveIntensity: 0.3
    })
    const arch = new THREE.Mesh(archGeometry, archMaterial)
    arch.rotation.y = Math.PI / 2
    arch.position.y = 4
    support.add(arch)

    // 立柱 - 增加尺寸
    const pillarGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 12)
    const pillarMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF0000,
      roughness: 0.4,
      metalness: 0.8,
      emissive: 0xFF0000,
      emissiveIntensity: 0.2
    })

    const leftPillar = new THREE.Mesh(pillarGeometry, pillarMaterial)
    leftPillar.position.set(-4, 2, 0)
    support.add(leftPillar)

    const rightPillar = new THREE.Mesh(pillarGeometry, pillarMaterial)
    rightPillar.position.set(4, 2, 0)
    support.add(rightPillar)

    // 添加底部连接横梁
    const beamGeometry = new THREE.BoxGeometry(8, 0.3, 0.3)
    const beam = new THREE.Mesh(beamGeometry, pillarMaterial)
    beam.position.y = 0.15
    support.add(beam)

    return support
  }

  /**
   * 创建单个开采水平
   */
  createMiningLevel(depth, color, index, name = '') {
    console.log('创建开采水平:', name, '深度:', depth)

    const level = new THREE.Group()

    // 主要运输巷道（更明亮，更显眼）- 增加尺寸和亮度
    const mainTunnelGeometry = new THREE.BoxGeometry(200, 10, 10)
    const tunnelMaterial = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.5,
      transparent: true,
      opacity: 0.85,
      emissive: color,
      emissiveIntensity: 0.4
    })
    const mainTunnel = new THREE.Mesh(mainTunnelGeometry, tunnelMaterial)
    mainTunnel.position.y = depth
    level.add(mainTunnel)

    // 添加巷道边缘线框
    const edgeGeometry = new THREE.EdgesGeometry(mainTunnelGeometry)
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xFFFFFF,
      linewidth: 2
    })
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial)
    edges.position.y = depth
    level.add(edges)

    // 穿脉巷道 - 增加数量
    const crossTunnelGeometry = new THREE.BoxGeometry(10, 8, 150)
    for (let i = 0; i < 8; i++) {
      const crossTunnel = new THREE.Mesh(crossTunnelGeometry, tunnelMaterial)
      crossTunnel.position.set(-80 + i * 25, depth, 0)
      level.add(crossTunnel)

      // 添加交叉巷道边缘线框
      const crossEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(crossTunnelGeometry),
        edgeMaterial
      )
      crossEdges.position.set(-80 + i * 25, depth, 0)
      level.add(crossEdges)
    }

    // 采矿房柱
    this.createRoomPillars(level, depth)

    // 水平标注（带名称）
    this.createLevelLabel(level, depth, index, name)

    // 添加通风管道
    this.createVentilationSystem(level, depth)

    this.sceneManager.scene.add(level)
    console.log('开采水平创建完成:', name)
    return level
  }

  /**
   * 创建通风系统
   */
  createVentilationSystem(levelGroup, depth) {
    console.log('创建通风系统，深度:', depth)

    // 通风管道 - 增加尺寸和可见性
    const ventPipeGeometry = new THREE.CylinderGeometry(1, 1, 180, 16)
    const ventMaterial = new THREE.MeshStandardMaterial({
      color: 0x00AAFF,
      roughness: 0.3,
      metalness: 0.9,
      transparent: true,
      opacity: 0.8,
      emissive: 0x00AAFF,
      emissiveIntensity: 0.4
    })

    const mainVentPipe = new THREE.Mesh(ventPipeGeometry, ventMaterial)
    mainVentPipe.rotation.z = Math.PI / 2
    mainVentPipe.position.set(0, depth + 8, 0)
    levelGroup.add(mainVentPipe)

    // 通风机位置 - 增加尺寸和亮度
    const fanPositions = [-80, 0, 80]
    fanPositions.forEach(xPos => {
      const fanGeometry = new THREE.CylinderGeometry(2.5, 2.5, 2, 16)
      const fanMaterial = new THREE.MeshStandardMaterial({
        color: 0x0088FF,
        roughness: 0.3,
        metalness: 0.9,
        emissive: 0x0088FF,
        emissiveIntensity: 0.5
      })
      const fan = new THREE.Mesh(fanGeometry, fanMaterial)
      fan.rotation.x = Math.PI / 2
      fan.position.set(xPos, depth + 8, 0)
      levelGroup.add(fan)

      // 添加风流动向标识
      const flowIndicator = this.createAirflowIndicator(xPos, depth + 10)
      levelGroup.add(flowIndicator)
    })

    console.log('通风系统创建完成')
  }

  /**
   * 创建风流动向标识
   */
  createAirflowIndicator(x, y) {
    const indicatorGroup = new THREE.Group()

    // 箭头几何
    const arrowGeometry = new THREE.ConeGeometry(0.5, 1.5, 8)
    const arrowMaterial = new THREE.MeshStandardMaterial({
      color: 0x00FF88,
      emissive: 0x00FF88,
      emissiveIntensity: 0.4
    })

    for (let i = 0; i < 5; i++) {
      const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial)
      arrow.position.set(-20 + i * 10, 0, 0)
      arrow.rotation.z = -Math.PI / 2
      indicatorGroup.add(arrow)
    }

    indicatorGroup.position.set(x, y, 0)
    return indicatorGroup
  }

  /**
   * 创建房柱式采矿示意
   */
  createRoomPillars(levelGroup, depth) {
    // 矿房
    const roomGeometry = new THREE.BoxGeometry(25, 8, 25)
    const roomMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B8B83,
      roughness: 0.8,
      transparent: true,
      opacity: 0.5
    })

    // 矿柱
    const pillarGeometry = new THREE.BoxGeometry(6, 8, 6)
    const pillarMaterial = new THREE.MeshStandardMaterial({
      color: 0x696969,
      roughness: 0.7
    })

    for (let x = -60; x <= 60; x += 30) {
      for (let z = -40; z <= 40; z += 25) {
        const room = new THREE.Mesh(roomGeometry, roomMaterial)
        room.position.set(x, depth, z)
        levelGroup.add(room)

        // 添加矿柱
        const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial)
        pillar.position.set(x, depth, z)
        levelGroup.add(pillar)
      }
    }
  }

  /**
   * 创建水平标注
   */
  createLevelLabel(levelGroup, depth, index, name = '') {
    // 标注板
    const labelGeometry = new THREE.BoxGeometry(4, 2.5, 0.2)
    const labelMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFF00,
      roughness: 0.5,
      emissive: 0xFFFF00,
      emissiveIntensity: 0.3
    })
    const label = new THREE.Mesh(labelGeometry, labelMaterial)
    label.position.set(100, depth + 12, 0)
    label.rotation.y = Math.PI / 4
    levelGroup.add(label)

    // 深度标记（半透明文本框模拟）
    const depthLabelGeometry = new THREE.BoxGeometry(3, 1.5, 0.1)
    const depthLabelMaterial = new THREE.MeshStandardMaterial({
      color: 0x00FF00,
      roughness: 0.5,
      emissive: 0x00FF00,
      emissiveIntensity: 0.2
    })
    const depthLabel = new THREE.Mesh(depthLabelGeometry, depthLabelMaterial)
    depthLabel.position.set(100, depth + 10, 0)
    depthLabel.rotation.y = Math.PI / 4
    levelGroup.add(depthLabel)

    // 标注杆
    const poleGeometry = new THREE.CylinderGeometry(0.15, 0.15, 12, 8)
    const poleMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF6600,
      roughness: 0.7,
      metalness: 0.5
    })
    const pole = new THREE.Mesh(poleGeometry, poleMaterial)
    pole.position.set(100, depth + 5, 0)
    levelGroup.add(pole)
  }

  /**
   * 创建竖井连接线
   */
  createShaftLines() {
    // 主井
    const mainShaftGeometry = new THREE.CylinderGeometry(4, 4, 200, 16)
    const shaftMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.7,
      transparent: true,
      opacity: 0.6
    })

    const mainShaft = new THREE.Mesh(mainShaftGeometry, shaftMaterial)
    mainShaft.position.set(50, -100, 50)
    this.sceneManager.scene.add(mainShaft)
    this.sceneObjects.push(mainShaft)

    // 副井
    const auxShaft = new THREE.Mesh(mainShaftGeometry, shaftMaterial)
    auxShaft.position.set(-60, -100, -40)
    this.sceneManager.scene.add(auxShaft)
    this.sceneObjects.push(auxShaft)
  }

  /**
   * 创建辅助设施
   */
  createAuxiliaryFacilities() {
    // 办公室
    const office = this.equipmentFactory.createOffice({
      x: -100,
      y: 0,
      z: 100
    })
    this.sceneObjects.push(office)

    // 维修车间
    const workshop = this.createWorkshop({ x: 120, y: 0, z: 80 })
    this.sceneObjects.push(workshop)

    // 通风机房
    this.createVentilationRoom({ x: -120, y: 0, z: -80 })

    // 变电所
    this.createSubstation({ x: 100, y: 0, z: -100 })
  }

  /**
   * 创建维修车间
   */
  createWorkshop(position) {
    const workshop = new THREE.Group()

    const mainGeometry = new THREE.BoxGeometry(20, 8, 15)
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.7,
      metalness: 0.5
    })
    const main = new THREE.Mesh(mainGeometry, mainMaterial)
    main.position.y = 4
    main.castShadow = true
    workshop.add(main)

    workshop.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(workshop)

    return workshop
  }

  /**
   * 创建通风机房
   */
  createVentilationRoom(position) {
    const room = new THREE.Group()

    // 机房
    const mainGeometry = new THREE.BoxGeometry(12, 8, 10)
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0x708090,
      roughness: 0.7
    })
    const main = new THREE.Mesh(mainGeometry, mainMaterial)
    main.position.y = 4
    main.castShadow = true
    room.add(main)

    // 风机
    const fanGeometry = new THREE.CylinderGeometry(3, 3, 4, 12)
    const fanMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.5,
      metalness: 0.8
    })
    const fan = new THREE.Mesh(fanGeometry, fanMaterial)
    fan.position.set(0, 10, 0)
    fan.rotation.z = Math.PI / 2
    fan.castShadow = true
    room.add(fan)

    // 风筒
    const ductGeometry = new THREE.CylinderGeometry(2.5, 2.5, 20, 12)
    const duct = new THREE.Mesh(ductGeometry, fanMaterial)
    duct.position.set(10, 10, 0)
    duct.rotation.z = Math.PI / 2
    room.add(duct)

    room.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(room)
    this.sceneObjects.push(room)
  }

  /**
   * 创建变电所
   */
  createSubstation(position) {
    const substation = new THREE.Group()

    // 变电室
    const mainGeometry = new THREE.BoxGeometry(10, 6, 8)
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0x708090,
      roughness: 0.6
    })
    const main = new THREE.Mesh(mainGeometry, mainMaterial)
    main.position.y = 3
    main.castShadow = true
    substation.add(main)

    // 变压器
    const transformerGeometry = new THREE.BoxGeometry(4, 5, 3)
    const transformerMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.5,
      metalness: 0.7
    })
    const transformer1 = new THREE.Mesh(transformerGeometry, transformerMaterial)
    transformer1.position.set(-4, 2.5, 6)
    transformer1.castShadow = true
    substation.add(transformer1)

    const transformer2 = new THREE.Mesh(transformerGeometry, transformerMaterial)
    transformer2.position.set(4, 2.5, 6)
    transformer2.castShadow = true
    substation.add(transformer2)

    // 高压线塔
    this.createTransmissionTower(substation, { x: -20, y: 0, z: 20 })
    this.createTransmissionTower(substation, { x: 20, y: 0, z: 20 })

    substation.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(substation)
    this.sceneObjects.push(substation)
  }

  /**
   * 创建输电塔
   */
  createTransmissionTower(parent, position) {
    const tower = new THREE.Group()

    // 塔身
    const bodyGeometry = new THREE.CylinderGeometry(1, 2, 20, 4)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.7
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 10
    body.castShadow = true
    tower.add(body)

    // 横担
    const armGeometry = new THREE.BoxGeometry(8, 0.5, 0.5)
    const arm1 = new THREE.Mesh(armGeometry, bodyMaterial)
    arm1.position.y = 18
    tower.add(arm1)

    const arm2 = new THREE.Mesh(armGeometry, bodyMaterial)
    arm2.position.y = 15
    arm2.rotation.y = Math.PI / 4
    tower.add(arm2)

    tower.position.set(position.x, position.y, position.z)
    parent.add(tower)
  }

  /**
   * 添加热点
   */
  addHotspots() {
    // 井口设施热点
    const shaftHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(50, 20, 50),
      {
        id: 'underground-shaft',
        title: '井口设施',
        description: '包括井架、井口房、提升机房等，是连接地面与地下的咽喉',
        details: [
          '井架高度：30-40米',
          '提升机：多绳摩擦式提升机',
          '提升能力：500-1000t/班',
          '安全设施：防坠器、过卷保护装置'
        ],
        originalPosition: new THREE.Vector3(50, 0, 50)
      }
    )
    this.hotspots.push(shaftHotspot)

    // 地下开采系统热点
    const miningHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(0, -50, 0),
      {
        id: 'underground-mining',
        title: '地下开采系统',
        description: '采用房柱式开采法，分为多个中段同时作业',
        details: [
          '开采方法：房柱式采矿法',
          '中段高度：50米',
          '矿房尺寸：25m×25m×8m',
          '矿柱尺寸：6m×6m×8m'
        ],
        originalPosition: new THREE.Vector3(0, -50, 0)
      }
    )
    this.hotspots.push(miningHotspot)

    // 通风系统热点
    const ventilationHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(-120, 8, -80),
      {
        id: 'underground-ventilation',
        title: '通风系统',
        description: '为井下作业提供新鲜空气，排除有毒有害气体',
        details: [
          '通风方式：机械抽出式',
          '通风机：轴流式通风机',
          '风量：300-500m³/min',
          '风速：巷道2-8m/s，工作面0.25-4m/s'
        ],
        originalPosition: new THREE.Vector3(-120, 0, -80)
      }
    )
    this.hotspots.push(ventilationHotspot)

    // 提升运输热点
    const hoistingHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(30, 8, 80),
      {
        id: 'underground-hoisting',
        title: '提升运输',
        description: '负责矿石、废石、材料设备和人员的升降运输',
        details: [
          '提升容器：箕斗+罐笼',
          '提升速度：8-12m/s',
          '钢丝绳：三角股钢丝绳',
          '安全检查：每日检查，定期检验'
        ],
        originalPosition: new THREE.Vector3(30, 0, 80)
      }
    )
    this.hotspots.push(hoistingHotspot)

    // 安全监测热点
    const safetyHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(-60, 5, -40),
      {
        id: 'underground-safety',
        title: '安全监测系统',
        description: '实时监测井下瓦斯、地压、水害等安全参数',
        details: [
          '监测项目：瓦斯、风速、温度、湿度',
          '监测设备：传感器、监控分站、监控主机',
          '预警功能：超限自动报警断电',
          '应急避险：避险硐室、避灾路线'
        ],
        originalPosition: new THREE.Vector3(-60, 0, -40)
      }
    )
    this.hotspots.push(safetyHotspot)
  }

  /**
   * 设置相机位置
   */
  setupCamera() {
    // 地下开采场景不需要直接设置相机，由SceneController的transitionCamera处理
    console.log('地下开采场景setupCamera被调用，跳过直接相机设置')
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

export default UndergroundStage