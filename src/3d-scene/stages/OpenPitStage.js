/**
 * 露天开采阶段场景构建器 - 重新构建版本（真正的圆形台阶矿坑）
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
    console.log('OpenPitStage: 开始构建露天开采场景');

    // 清除现有场景
    this.sceneManager.clearScene()
    this.clearPreviousObjects()

    // 强制清除SceneManager的基础地形（这是造成遮挡的主要原因）
    if (this.sceneManager.objects?.terrain) {
      console.log('OpenPitStage: 强制清除SceneManager基础地形');
      this.sceneManager.scene.remove(this.sceneManager.objects.terrain);
      if (this.sceneManager.objects.terrain.geometry) {
        this.sceneManager.objects.terrain.geometry.dispose();
      }
      if (this.sceneManager.objects.terrain.material) {
        this.sceneManager.objects.terrain.material.dispose();
      }
      this.sceneManager.objects.terrain = null;
    }

    // 创建圆形台阶矿坑地形
    this.createCircularPitTerrain();

    // 创建台阶细节和边缘
    this.createBenchDetails();

    // 创建采矿设备（在第3、4层台阶）
    this.createMiningEquipment();

    // 创建运输系统
    this.createTransportSystem();

    // 创建破碎系统
    this.createCrushingSystem();

    // 创建辅助设施
    this.createAuxiliaryFacilities();

    // 添加热点
    this.addHotspots();

    // 设置相机位置
    this.setupCamera();

    console.log('OpenPitStage: 露天开采场景构建完成');
  }

  /**
   * 创建圆形台阶矿坑地形
   */
  createCircularPitTerrain() {
    // 矿坑参数
    const pitParams = {
      totalDepth: 120,        // 总深度120米
      outerRadius: 150,       // 最外层半径150米
      bottomRadius: 30,       // 坑底半径30米
      benchCount: 6,          // 6层台阶
      benchHeight: 20,        // 每层高度20米
      benchWidth: 25          // 每层宽度25米
    }

    // 创建大平面地形 - 必须足够大以覆盖整个视野，防止看到边缘
    const planeGeometry = new THREE.PlaneGeometry(800, 800, 200, 200)
    const vertices = planeGeometry.attributes.position.array
    const colors = []

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]
      const y = vertices[i + 1]

      // 计算距离中心的距离
      const distance = Math.sqrt(x * x + y * y)

      let height = 0 // 地表高度

      if (distance > pitParams.outerRadius + 100) {
        // 矿坑外围的自然地形
        const terrainNoise = Math.sin(x * 0.01) * Math.cos(y * 0.01) * 5 +
                             Math.sin(x * 0.03 + 1) * Math.cos(y * 0.03 + 2) * 3
        height = terrainNoise // 保持在地表高度
      } else if (distance < pitParams.bottomRadius) {
        // 矿坑底部平地 - 深度从地表开始计算
        height = -pitParams.totalDepth
      } else if (distance > pitParams.outerRadius) {
        // 过渡区域
        const transitionFactor = (distance - pitParams.outerRadius) / 50
        height = -transitionFactor * 5
      } else {
        // 计算当前点在哪一层台阶上
        const currentRadius = pitParams.outerRadius
        const radiusStep = (pitParams.outerRadius - pitParams.bottomRadius) / pitParams.benchCount

        for (let bench = 0; bench < pitParams.benchCount; bench++) {
          const outerRadius = currentRadius - bench * radiusStep
          const innerRadius = outerRadius - pitParams.benchWidth

          if (distance <= outerRadius && distance >= innerRadius) {
            // 在该层台阶的工作面上
            height = -bench * pitParams.benchHeight // 从地表开始逐层下降
            break
          } else if (bench < pitParams.benchCount - 1) {
            const nextOuterRadius = currentRadius - (bench + 1) * radiusStep
            // 在该层台阶的斜坡上
            if (distance < innerRadius && distance >= nextOuterRadius) {
              // 线性插值计算斜坡高度
              const slopeProgress = (innerRadius - distance) / (innerRadius - nextOuterRadius)
              const currentHeight = -bench * pitParams.benchHeight
              const nextHeight = -(bench + 1) * pitParams.benchHeight
              height = currentHeight - slopeProgress * pitParams.benchHeight
              break
            }
          }
        }
      }

      vertices[i + 2] = height

      // 计算地形颜色
      const color = this.calculateTerrainColor(distance, height, pitParams)
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
      flatShading: true,
      side: THREE.DoubleSide // 双面渲染，确保从任何角度都能看到
    })

    const terrain = new THREE.Mesh(planeGeometry, material)
    terrain.rotation.x = -Math.PI / 2
    terrain.position.y = 0 // 确保地形在正确位置
    terrain.receiveShadow = true
    terrain.castShadow = true

    this.sceneManager.scene.add(terrain)
    this.sceneObjects.push(terrain)

    // 也将地形添加到terrainGenerator的跟踪列表中，确保能被正确清除
    this.terrainGenerator.terrainMeshes.push(terrain)

    console.log('OpenPitStage: 圆形台阶矿坑地形创建完成')
  }

  /**
   * 计算地形颜色
   */
  calculateTerrainColor(distance, height, pitParams) {
    if (distance > pitParams.outerRadius + 50) {
      // 外围自然地形 - 绿色
      return new THREE.Color(0x6B8E23)
    } else if (distance > pitParams.outerRadius) {
      // 过渡区域 - 混合颜色
      return new THREE.Color(0x7A8B45)
    } else if (distance < pitParams.bottomRadius) {
      // 矿坑底部 - 深色土质
      return new THREE.Color(0x4A3A25)
    } else {
      // 台阶区域 - 根据深度变化
      const depthFactor = Math.abs(height) / pitParams.totalDepth
      const topColor = new THREE.Color(0x8B7355) // 浅土色
      const bottomColor = new THREE.Color(0x5A4A35) // 深土色
      return topColor.clone().lerp(bottomColor, depthFactor)
    }
  }

  /**
   * 创建台阶细节和边缘
   */
  createBenchDetails() {
    const pitParams = {
      outerRadius: 150,
      bottomRadius: 30,
      benchCount: 6,
      benchHeight: 20,
      benchWidth: 25
    }

    const radiusStep = (pitParams.outerRadius - pitParams.bottomRadius) / pitParams.benchCount

    // 为每层台阶创建细节
    for (let bench = 0; bench < pitParams.benchCount; bench++) {
      const outerRadius = pitParams.outerRadius - bench * radiusStep
      const innerRadius = outerRadius - pitParams.benchWidth
      const benchDepth = -bench * pitParams.benchHeight

      // 创建台阶边缘线（自然土色，不太明显）
      this.createBenchEdgeLine(outerRadius, benchDepth)

      // 创建台阶编号标识（每隔一层）
      if (bench % 2 === 0) {
        this.createBenchNumberMarker(outerRadius, benchDepth, bench + 1)
      }
    }
  }

  /**
   * 创建台阶边缘线
   */
  createBenchEdgeLine(radius, depth) {
    const edgeMaterial = new THREE.MeshBasicMaterial({
      color: 0x6A5A45, // 自然土色
      side: THREE.DoubleSide
    })

    // 创建圆形边缘线
    const edgeGeometry = new THREE.RingGeometry(radius - 0.3, radius + 0.3, 64)
    const edge = new THREE.Mesh(edgeGeometry, edgeMaterial)
    edge.rotation.x = -Math.PI / 2
    edge.position.y = depth + 0.1

    this.sceneManager.scene.add(edge)
    this.sceneObjects.push(edge)
  }

  /**
   * 创建台阶编号标识
   */
  createBenchNumberMarker(radius, depth, benchNumber) {
    const markerGroup = new THREE.Group()

    // 小型标识牌
    const boardGeometry = new THREE.BoxGeometry(4, 2, 0.2)
    const boardMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 0.9
    })
    const board = new THREE.Mesh(boardGeometry, boardMaterial)
    board.position.set(radius - 8, depth + 1.2, 0)
    board.castShadow = true
    markerGroup.add(board)

    // 编号（使用简单几何体）
    const numberMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.5,
      emissive: 0xFFFFFF,
      emissiveIntensity: 0.1
    })

    // 简单的编号表示
    for (let i = 0; i < benchNumber; i++) {
      const barGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.1)
      const bar = new THREE.Mesh(barGeometry, numberMaterial)
      bar.position.set(radius - 8 + 0.5, depth + 1.5 - i * 0.4, 0.15)
      markerGroup.add(bar)
    }

    this.sceneManager.scene.add(markerGroup)
    this.sceneObjects.push(markerGroup)
  }

  /**
   * 创建采矿设备（在第3、4层台阶）
   */
  createMiningEquipment() {
    const pitParams = {
      outerRadius: 150,
      benchCount: 6,
      benchHeight: 20,
      benchWidth: 25
    }

    const radiusStep = (pitParams.outerRadius - 30) / pitParams.benchCount

    // 第3层台阶（深度-40米）和第4层台阶（深度-60米）
    const equipmentBenches = [2, 3] // 0-based index

    equipmentBenches.forEach(benchIndex => {
      const outerRadius = pitParams.outerRadius - benchIndex * radiusStep
      const innerRadius = outerRadius - pitParams.benchWidth
      const benchDepth = -benchIndex * pitParams.benchHeight
      const midRadius = (outerRadius + innerRadius) / 2

      // 在该层台阶布置设备
      const equipmentCount = benchIndex === 2 ? 4 : 3 // 第3层4台设备，第4层3台设备

      for (let i = 0; i < equipmentCount; i++) {
        const angle = (i / equipmentCount) * Math.PI * 2 + Math.PI / 4
        const radius = innerRadius + 10 + Math.random() * 10

        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        // 根据索引决定设备类型
        let equipment
        if (i % 2 === 0) {
          // 铲车/挖掘机
          equipment = this.equipmentFactory.createExcavator({ x, y: benchDepth, z })
          equipment.position.y = benchDepth + 4
        } else {
          // 卡车
          equipment = this.equipmentFactory.createMiningTruck({ x, z })
          equipment.position.y = benchDepth + 3
        }

        // 设备朝向矿坑中心
        equipment.rotation.y = -angle + Math.PI / 2

        this.sceneManager.scene.add(equipment)
        this.sceneObjects.push(equipment)
      }

      // 添加钻机在特定位置
      if (benchIndex === 2) {
        const drillAngle = Math.PI
        const drillRadius = innerRadius + 15
        const drillX = Math.cos(drillAngle) * drillRadius
        const drillZ = Math.sin(drillAngle) * drillRadius

        const drill = this.equipmentFactory.createDrillingRig({ x: drillX, y: benchDepth, z: drillZ })
        drill.position.y = benchDepth + 8
        drill.rotation.y = -drillAngle + Math.PI / 2

        this.sceneManager.scene.add(drill)
        this.sceneObjects.push(drill)
      }
    })
  }

  /**
   * 创建运输系统
   */
  createTransportSystem() {
    // 创建从矿坑向外的运输道路
    const roadGroup = new THREE.Group()

    // 螺旋式运输道路参数
    const roadPoints = []
    for (let i = 0; i <= 120; i += 10) {
      const angle = (i / 120) * Math.PI * 0.8
      const radius = 160 - i * 0.8
      const depth = -i

      roadPoints.push({ angle, radius, depth })
    }

    // 创建道路段
    roadPoints.forEach((point, index) => {
      if (index < roadPoints.length - 1) {
        const nextPoint = roadPoints[index + 1]

        const roadGeometry = new THREE.BoxGeometry(10, 0.5, 12)
        const roadMaterial = new THREE.MeshStandardMaterial({
          color: 0x4A4A4A,
          roughness: 0.9
        })
        const road = new THREE.Mesh(roadGeometry, roadMaterial)

        const midAngle = (point.angle + nextPoint.angle) / 2
        const midRadius = (point.radius + nextPoint.radius) / 2
        const midDepth = (point.depth + nextPoint.depth) / 2

        road.position.set(
          Math.cos(midAngle) * midRadius,
          midDepth + 0.25,
          Math.sin(midAngle) * midRadius
        )

        const dx = Math.cos(nextPoint.angle) * nextPoint.radius - Math.cos(point.angle) * point.radius
        const dz = Math.sin(nextPoint.angle) * nextPoint.radius - Math.sin(point.angle) * point.radius
        const rotation = Math.atan2(dz, dx)

        road.rotation.y = -rotation + Math.PI / 2
        road.rotation.x = Math.atan2(nextPoint.depth - point.depth, Math.sqrt(dx * dx + dz * dz))

        this.sceneManager.scene.add(road)
        this.sceneObjects.push(road)
      }
    })

    // 添加运输卡车
    this.createHaulTrucks()
  }

  /**
   * 创建运输卡车
   */
  createHaulTrucks() {
    const truckPositions = [
      { angle: Math.PI / 6, radius: 145, depth: -10 },
      { angle: Math.PI / 4, radius: 125, depth: -30 },
      { angle: Math.PI / 3, radius: 105, depth: -50 },
      { angle: Math.PI / 2, radius: 85, depth: -70 }
    ]

    truckPositions.forEach((pos, index) => {
      const x = Math.cos(pos.angle) * pos.radius
      const z = Math.sin(pos.angle) * pos.radius

      const truck = this.equipmentFactory.createMiningTruck({ x, z })
      truck.position.y = pos.depth + 3

      // 卡车朝向
      if (index < truckPositions.length - 1) {
        const nextPos = truckPositions[index + 1]
        const nextX = Math.cos(nextPos.angle) * nextPos.radius
        const nextZ = Math.sin(nextPos.angle) * nextPos.radius
        const angle = Math.atan2(nextZ - z, nextX - x)
        truck.rotation.y = -angle + Math.PI / 2
      }

      this.sceneManager.scene.add(truck)
      this.sceneObjects.push(truck)
    })
  }

  /**
   * 创建破碎系统
   */
  createCrushingSystem() {
    const crusherPositions = [
      { x: 180, y: 0, z: 100 },
      { x: -180, y: 0, z: -100 }
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
      x: -180,
      y: 0,
      z: 120
    })
    this.sceneObjects.push(office)

    // 修理车间
    const workshop = this.createWorkshop({ x: 180, y: 0, z: -120 })
    this.sceneObjects.push(workshop)

    // 油库
    const fuelStation = this.createFuelStation({ x: 160, y: 0, z: -140 })
    this.sceneObjects.push(fuelStation)

    // 排土场标识
    this.createWasteDump()
  }

  /**
   * 创建修理车间
   */
  createWorkshop(position) {
    const workshop = new THREE.Group()

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

    const doorGeometry = new THREE.BoxGeometry(8, 8, 0.5)
    const doorMaterial = new THREE.MeshStandardMaterial({
      color: 0x606060,
      roughness: 0.8
    })
    const door = new THREE.Mesh(doorGeometry, doorMaterial)
    door.position.set(0, 4, 10.25)
    workshop.add(door)

    workshop.position.set(position.x, position.y, position.z)
    this.sceneManager.scene.add(workshop)

    return workshop
  }

  /**
   * 创建加油站
   */
  createFuelStation(position) {
    const station = new THREE.Group()

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

    for (let i = 0; i < 5; i++) {
      const pileGeometry = new THREE.ConeGeometry(15 + i * 3, 10 + i * 2, 8)
      const pileMaterial = new THREE.MeshStandardMaterial({
        color: 0x6B6B6B,
        roughness: 0.9
      })
      const pile = new THREE.Mesh(pileGeometry, pileMaterial)
      pile.position.set(-200 + i * 20, (10 + i * 2) / 2, -180 + i * 15)
      pile.castShadow = true
      dump.add(pile)
    }

    this.sceneManager.scene.add(dump)
    this.sceneObjects.push(dump)
  }

  /**
   * 添加热点
   */
  addHotspots() {
    // 采矿作业热点（第3层台阶）
    const miningHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(80, -45, 60),
      {
        id: 'openpit-mining',
        title: '露天采矿作业',
        description: '采用圆形台阶式开采，自上而下分层剥离和采矿',
        details: [
          '台阶高度：20米',
          '台阶宽度：25米',
          '边坡角度：自然坡度',
          '开采方法：穿孔爆破-采装-运输'
        ],
        originalPosition: new THREE.Vector3(80, -40, 60)
      }
    )
    this.hotspots.push(miningHotspot)

    // 运输系统热点
    const transportHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(120, -15, 80),
      {
        id: 'openpit-transport',
        title: '矿岩运输系统',
        description: '重型卡车沿螺旋道路将矿石运出矿坑',
        details: [
          '运输设备：大型矿用卡车（载重100-300吨）',
          '运输道路：螺旋式布置，宽度10米',
          '运输能力：500-1000万吨/年',
          '运输成本：占采矿总成本40%以上'
        ],
        originalPosition: new THREE.Vector3(120, -10, 80)
      }
    )
    this.hotspots.push(transportHotspot)

    // 台阶结构热点
    const benchHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(-100, -25, -50),
      {
        id: 'openpit-bench',
        title: '圆形台阶结构',
        description: '同心圆形台阶设计，从外向内逐层下降',
        details: [
          '台阶层数：6层开采台阶',
          '每层高度：20米',
          '工作面：25米宽环形平台',
          '坑底：30米半径的圆形平地'
        ],
        originalPosition: new THREE.Vector3(-100, -20, -50)
      }
    )
    this.hotspots.push(benchHotspot)

    // 破碎系统热点
    const crushingHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(180, 12, 100),
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
        originalPosition: new THREE.Vector3(180, 0, 100)
      }
    )
    this.hotspots.push(crushingHotspot)

    // 矿坑底部热点
    const bottomHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(20, -118, 20),
      {
        id: 'openpit-bottom',
        title: '矿坑底部',
        description: '露天开采的最底层，圆形平地用于集中装载',
        details: [
          '底部深度：-120米',
          '底部直径：60米',
          '功能：矿石集中装载区',
          '排水：设有排水设施'
        ],
        originalPosition: new THREE.Vector3(20, -120, 20)
      }
    )
    this.hotspots.push(bottomHotspot)
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
