/**
 * 生态治理闭坑复垦阶段场景构建器
 */
import * as THREE from 'three'
import { TerrainGenerator } from '../objects/TerrainGenerator.js'
import { EquipmentFactory } from '../objects/EquipmentFactory.js'

export class ReclamationStage {
  constructor(sceneManager) {
    this.sceneManager = sceneManager
    this.terrainGenerator = new TerrainGenerator(sceneManager)
    this.equipmentFactory = new EquipmentFactory(sceneManager)
    this.sceneObjects = []
    this.hotspots = []
  }

  /**
   * 构建生态修复场景
   */
  build() {
    // 清除现有场景
    this.sceneManager.clearScene()
    this.clearPreviousObjects()

    // 创建修复后的地形
    this.createTerrain()

    // 创建复垦对比区域
    this.createReclamationComparison()

    // 创建植被
    this.createVegetation()

    // 创建水系
    this.createWaterSystem()

    // 创建休闲设施
    this.createRecreationalFacilities()

    // 创建科普设施
    this.createEducationalFacilities()

    // 添加热点
    this.addHotspots()

    // 设置相机位置
    this.setupCamera()
  }

  /**
   * 创建地形
   */
  createTerrain() {
    const terrain = this.terrainGenerator.createRehabilitationTerrain()
    this.sceneObjects.push(terrain)
  }

  /**
   * 创建树木
   */
  createTree(parent, x, y, z) {
    const tree = new THREE.Group()

    // 树干
    const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.5, 3, 8)
    const trunkMaterial = new THREE.MeshStandardMaterial({
      color: 0x4A3728,
      roughness: 0.9
    })
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
    trunk.position.y = 1.5
    trunk.castShadow = true
    tree.add(trunk)

    // 树冠
    const foliageGeometry = new THREE.ConeGeometry(1.5, 4, 8)
    const foliageMaterial = new THREE.MeshStandardMaterial({
      color: 0x2E8B57,
      roughness: 0.8
    })
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial)
    foliage.position.y = 4.5
    foliage.castShadow = true
    tree.add(foliage)

    tree.position.set(x, y, z)
    tree.scale.setScalar(0.8 + Math.random() * 0.4)
    parent.add(tree)
  }

  /**
   * 创建植被
   */
  createVegetation() {
    // 在外围区域种植更多树木
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2
      const radius = 120 + Math.random() * 80
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius

      const treeGroup = new THREE.Group()
      this.createTree(treeGroup, 0, 0, 0)
      treeGroup.position.set(x, 0, z)
      this.sceneManager.scene.add(treeGroup)
      this.sceneObjects.push(treeGroup)
    }

    // 创建花园区域
    this.createGarden()
  }

  /**
   * 创建花园
   */
  createGarden() {
    const garden = new THREE.Group()

    // 花坛基础
    const bedGeometry = new THREE.BoxGeometry(20, 0.5, 15)
    const bedMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      roughness: 0.9
    })
    const bed = new THREE.Mesh(bedGeometry, bedMaterial)
    bed.position.y = 0.25
    garden.add(bed)

    // 花卉
    const flowerColors = [0xFF6B6B, 0xFFD93D, 0x6BCF7F, 0x4D96FF, 0xFF6EC7]
    for (let i = 0; i < 50; i++) {
      const flowerGeometry = new THREE.SphereGeometry(0.3, 8, 8)
      const flowerMaterial = new THREE.MeshStandardMaterial({
        color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
        roughness: 0.7
      })
      const flower = new THREE.Mesh(flowerGeometry, flowerMaterial)
      flower.position.set(
        -8 + Math.random() * 16,
        0.8,
        -6 + Math.random() * 12
      )
      flower.castShadow = true
      garden.add(flower)
    }

    // 观赏树木
    const ornamentalPositions = [
      { x: -10, z: -8 },
      { x: 10, z: -8 },
      { x: -10, z: 8 },
      { x: 10, z: 8 }
    ]

    ornamentalPositions.forEach(pos => {
      this.createTree(garden, pos.x, 0, pos.z)
    })

    garden.position.set(-80, 0, -60)
    this.sceneManager.scene.add(garden)
    this.sceneObjects.push(garden)
  }

  /**
   * 创建水系
   */
  createWaterSystem() {
    // 人工湖（利用矿坑改建）
    const lake = this.createLake()
    this.sceneObjects.push(lake)

    // 喷泉
    const fountain = this.createFountain()
    this.sceneObjects.push(fountain)
  }

  /**
   * 创建人工湖
   */
  createLake() {
    const lake = new THREE.Group()

    // 湖水
    const waterGeometry = new THREE.CircleGeometry(40, 32)
    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x4A90A4,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.8
    })
    const water = new THREE.Mesh(waterGeometry, waterMaterial)
    water.rotation.x = -Math.PI / 2
    water.position.y = 0.1
    lake.add(water)

    // 湖岸石
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2
      const radius = 38 + Math.random() * 3
      const rockGeometry = new THREE.DodecahedronGeometry(1 + Math.random())
      const rockMaterial = new THREE.MeshStandardMaterial({
        color: 0x696969,
        roughness: 0.9
      })
      const rock = new THREE.Mesh(rockGeometry, rockMaterial)
      rock.position.set(
        Math.cos(angle) * radius,
        0.5 + Math.random() * 0.5,
        Math.sin(angle) * radius
      )
      rock.castShadow = true
      lake.add(rock)
    }

    // 湖边树木
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 45 + Math.random() * 5
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      this.createTree(lake, x, 0, z)
    }

    // 观景平台
    const platform = this.createViewingPlatform()
    platform.position.set(50, 0, 0)
    lake.add(platform)

    // 将人工湖下沉到复垦盆地底部
    lake.position.set(0, -8, 0)
    this.sceneManager.scene.add(lake)

    return lake
  }

  /**
   * 创建观景平台
   */
  createViewingPlatform() {
    const platform = new THREE.Group()

    // 平台地面
    const floorGeometry = new THREE.BoxGeometry(15, 0.5, 8)
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 0.8
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.position.y = 0.25
    platform.add(floor)

    // 栏杆
    const railGeometry = new THREE.BoxGeometry(15, 1, 0.2)
    const railMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 0.8
    })

    const frontRail = new THREE.Mesh(railGeometry, railMaterial)
    frontRail.position.set(0, 1, 3.9)
    platform.add(frontRail)

    const backRail = new THREE.Mesh(railGeometry, railMaterial)
    backRail.position.set(0, 1, -3.9)
    platform.add(backRail)

    // 休息椅
    this.createBench(platform, { x: -5, z: 0 })
    this.createBench(platform, { x: 5, z: 0 })

    return platform
  }

  /**
   * 创建长椅
   */
  createBench(parent, position) {
    const bench = new THREE.Group()

    // 座位
    const seatGeometry = new THREE.BoxGeometry(3, 0.2, 1)
    const seatMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 0.8
    })
    const seat = new THREE.Mesh(seatGeometry, seatMaterial)
    seat.position.y = 0.5
    bench.add(seat)

    // 靠背
    const backGeometry = new THREE.BoxGeometry(3, 0.8, 0.1)
    const back = new THREE.Mesh(backGeometry, seatMaterial)
    back.position.set(0, 1, -0.45)
    bench.add(back)

    // 腿
    const legGeometry = new THREE.BoxGeometry(0.2, 0.5, 0.8)
    const legMaterial = new THREE.MeshStandardMaterial({
      color: 0x654321,
      roughness: 0.9
    })

    const leg1 = new THREE.Mesh(legGeometry, legMaterial)
    leg1.position.set(-1.2, 0.25, 0)
    bench.add(leg1)

    const leg2 = new THREE.Mesh(legGeometry, legMaterial)
    leg2.position.set(1.2, 0.25, 0)
    bench.add(leg2)

    bench.position.set(position.x, 0, position.z)
    parent.add(bench)
  }

  /**
   * 创建喷泉
   */
  createFountain() {
    const fountain = new THREE.Group()

    // 喷泉池
    const poolGeometry = new THREE.CylinderGeometry(8, 10, 2, 16)
    const poolMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 0.8
    })
    const pool = new THREE.Mesh(poolGeometry, poolMaterial)
    pool.position.y = 1
    fountain.add(pool)

    // 池中水
    const waterGeometry = new THREE.CylinderGeometry(7, 7, 1.8, 16)
    const waterMaterial = new THREE.MeshStandardMaterial({
      color: 0x4A90A4,
      roughness: 0.1,
      transparent: true,
      opacity: 0.8
    })
    const water = new THREE.Mesh(waterGeometry, waterMaterial)
    water.position.y = 1.8
    fountain.add(water)

    // 中心喷嘴
    const nozzleGeometry = new THREE.CylinderGeometry(0.5, 0.3, 2, 12)
    const nozzleMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.5,
      metalness: 0.7
    })
    const nozzle = new THREE.Mesh(nozzleGeometry, nozzleMaterial)
    nozzle.position.y = 2.5
    fountain.add(nozzle)

    // 喷水效果（用透明圆锥模拟）
    const sprayGeometry = new THREE.ConeGeometry(1.5, 6, 12)
    const sprayMaterial = new THREE.MeshStandardMaterial({
      color: 0x87CEEB,
      transparent: true,
      opacity: 0.4
    })
    const spray = new THREE.Mesh(sprayGeometry, sprayMaterial)
    spray.position.y = 6.5
    fountain.add(spray)

    fountain.position.set(80, 0, -50)
    this.sceneManager.scene.add(fountain)

    return fountain
  }

  /**
   * 创建休闲设施
   */
  createRecreationalFacilities() {
    // 步行道
    this.createWalkingPath()

    // 休息亭
    this.createPavilion()

    // 健身器材区
    this.createFitnessArea()
  }

  /**
   * 创建步行道
   */
  createWalkingPath() {
    const path = new THREE.Group()

    // 主路径
    const mainPathGeometry = new THREE.BoxGeometry(200, 0.3, 3)
    const pathMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 0.9
    })
    const mainPath = new THREE.Mesh(mainPathGeometry, pathMaterial)
    mainPath.position.y = 0.15
    path.add(mainPath)

    // 环形路径
    const ringPathGeometry = new THREE.RingGeometry(97, 100, 32)
    const ringPath = new THREE.Mesh(ringPathGeometry, pathMaterial)
    ringPath.rotation.x = -Math.PI / 2
    ringPath.position.y = 0.15
    path.add(ringPath)

    this.sceneManager.scene.add(path)
    this.sceneObjects.push(path)
  }

  /**
   * 创建休息亭
   */
  createPavilion() {
    const pavilion = new THREE.Group()

    // 基础
    const baseGeometry = new THREE.CylinderGeometry(6, 7, 0.5, 8)
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 0.8
    })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    base.position.y = 0.25
    pavilion.add(base)

    // 柱子
    const pillarGeometry = new THREE.CylinderGeometry(0.3, 0.3, 5, 8)
    const pillarMaterial = new THREE.MeshStandardMaterial({
      color: 0xDEB887,
      roughness: 0.7
    })

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial)
      pillar.position.set(
        Math.cos(angle) * 5,
        3,
        Math.sin(angle) * 5
      )
      pillar.castShadow = true
      pavilion.add(pillar)
    }

    // 屋顶
    const roofGeometry = new THREE.ConeGeometry(8, 3, 8)
    const roofMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      roughness: 0.8
    })
    const roof = new THREE.Mesh(roofGeometry, roofMaterial)
    roof.position.y = 6.5
    roof.castShadow = true
    pavilion.add(roof)

    // 休息椅
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + Math.PI / 8
      const bench = this.createBench(pavilion, {
        x: Math.cos(angle) * 4,
        z: Math.sin(angle) * 4
      })
      if (bench) {
        bench.rotation.y = -angle
      }
    }

    pavilion.position.set(-60, 0, 80)
    this.sceneManager.scene.add(pavilion)
    this.sceneObjects.push(pavilion)
  }

  /**
   * 创建健身器材区
   */
  createFitnessArea() {
    const area = new THREE.Group()

    // 地垫
    const matGeometry = new THREE.BoxGeometry(20, 0.1, 15)
    const matMaterial = new THREE.MeshStandardMaterial({
      color: 0x4A7C59,
      roughness: 0.9
    })
    const mat = new THREE.Mesh(matGeometry, matMaterial)
    mat.position.y = 0.05
    area.add(mat)

    // 健身器材（简化示意）
    const equipmentPositions = [
      { x: -5, z: -3 },
      { x: 5, z: -3 },
      { x: 0, z: 0 },
      { x: -5, z: 3 },
      { x: 5, z: 3 }
    ]

    equipmentPositions.forEach(pos => {
      const equipment = this.createFitnessEquipment()
      equipment.position.set(pos.x, 0, pos.z)
      area.add(equipment)
    })

    area.position.set(100, 0, 50)
    this.sceneManager.scene.add(area)
    this.sceneObjects.push(area)
  }

  /**
   * 创建单个健身器材
   */
  createFitnessEquipment() {
    const equipment = new THREE.Group()

    // 支架
    const postGeometry = new THREE.BoxGeometry(0.5, 2, 0.5)
    const postMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.7,
      metalness: 0.5
    })

    const post1 = new THREE.Mesh(postGeometry, postMaterial)
    post1.position.set(-0.5, 1, 0)
    equipment.add(post1)

    const post2 = new THREE.Mesh(postGeometry, postMaterial)
    post2.position.set(0.5, 1, 0)
    equipment.add(post2)

    // 横梁
    const beamGeometry = new THREE.BoxGeometry(2, 0.3, 0.3)
    const beam = new THREE.Mesh(beamGeometry, postMaterial)
    beam.position.y = 2
    equipment.add(beam)

    return equipment
  }

  /**
   * 创建科普设施
   */
  createEducationalFacilities() {
    // 展示牌
    this.createInformationSigns()

    // 观景台
    this.createObservationDeck()
  }

  /**
   * 创建信息牌
   */
  createInformationSigns() {
    const signs = [
      { pos: { x: 60, y: 0, z: -30 }, title: '矿山复垦', content: '生态修复技术展示' },
      { pos: { x: -40, y: 0, z: 60 }, title: '植物配置', content: '适生植物种类介绍' },
      { pos: { x: 80, y: 0, z: 80 }, title: '水资源利用', content: '矿坑水资源化利用' }
    ]

    signs.forEach(signData => {
      const sign = new THREE.Group()

      // 牌子
      const boardGeometry = new THREE.BoxGeometry(4, 3, 0.2)
      const boardMaterial = new THREE.MeshStandardMaterial({
        color: 0xDEB887,
        roughness: 0.7
      })
      const board = new THREE.Mesh(boardGeometry, boardMaterial)
      board.position.y = 2.5
      board.castShadow = true
      sign.add(board)

      // 支架
      const postGeometry = new THREE.BoxGeometry(0.3, 3, 0.3)
      const postMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321,
        roughness: 0.9
      })

      const post1 = new THREE.Mesh(postGeometry, postMaterial)
      post1.position.set(-1.5, 1.5, 0)
      sign.add(post1)

      const post2 = new THREE.Mesh(postGeometry, postMaterial)
      post2.position.set(1.5, 1.5, 0)
      sign.add(post2)

      sign.position.set(signData.pos.x, signData.pos.y, signData.pos.z)
      this.sceneManager.scene.add(sign)
      this.sceneObjects.push(sign)
    })
  }

  /**
   * 创建观景台
   */
  createObservationDeck() {
    const deck = new THREE.Group()

    // 平台
    const platformGeometry = new THREE.BoxGeometry(25, 0.5, 15)
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 0.8
    })
    const platform = new THREE.Mesh(platformGeometry, platformMaterial)
    platform.position.y = 3
    deck.add(platform)

    // 支柱
    const pillarGeometry = new THREE.BoxGeometry(1, 3, 1)
    const pillarMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 0.8
    })

    const pillarPositions = [
      { x: -11, z: -6 },
      { x: 11, z: -6 },
      { x: -11, z: 6 },
      { x: 11, z: 6 }
    ]

    pillarPositions.forEach(pos => {
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial)
      pillar.position.set(pos.x, 1.5, pos.z)
      pillar.castShadow = true
      deck.add(pillar)
    })

    // 栏杆
    const railGeometry = new THREE.BoxGeometry(25, 1, 0.2)
    const railMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B7355,
      roughness: 0.8
    })

    const frontRail = new THREE.Mesh(railGeometry, railMaterial)
    frontRail.position.set(0, 3.5, 7.4)
    deck.add(frontRail)

    const backRail = new THREE.Mesh(railGeometry, railMaterial)
    backRail.position.set(0, 3.5, -7.4)
    deck.add(backRail)

    const sideRailGeometry = new THREE.BoxGeometry(0.2, 1, 15)
    const leftRail = new THREE.Mesh(sideRailGeometry, railMaterial)
    leftRail.position.set(-12.4, 3.5, 0)
    deck.add(leftRail)

    const rightRail = new THREE.Mesh(sideRailGeometry, railMaterial)
    rightRail.position.set(12.4, 3.5, 0)
    deck.add(rightRail)

    deck.position.set(-80, 0, -100)
    this.sceneManager.scene.add(deck)
    this.sceneObjects.push(deck)
  }

  /**
   * 添加热点
   */
  addHotspots() {
    // 生态修复热点
    const rehabilitationHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(0, 15, 80),
      {
        id: 'rehabilitation-ecological',
        title: '矿山生态修复',
        description: '通过工程措施和生物措施，使废弃矿山恢复生态功能',
        details: [
          '修复技术：地形整治、土壤重构、植被恢复',
          '修复目标：重建生态系统，恢复土地利用价值',
          '修复效果：植被覆盖率>80%，生物多样性显著提高',
          '监测评估：定期监测土壤、水质、植被状况'
        ],
        originalPosition: new THREE.Vector3(0, 0, 80)
      }
    )
    this.hotspots.push(rehabilitationHotspot)

    // 水资源利用热点
    const waterHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(0, 8, 0),
      {
        id: 'rehabilitation-water',
        title: '矿坑水资源利用',
        description: '将开采形成的矿坑改建为人工湖，实现水资源化利用',
        details: [
          '水源：矿坑涌水、雨水收集',
          '水质：经处理后达到景观用水标准',
          '功能：景观水面、浇灌用水、消防储备',
          '生态价值：水生生态系统、调节局部气候'
        ],
        originalPosition: new THREE.Vector3(0, 0, 0)
      }
    )
    this.hotspots.push(waterHotspot)

    // 植被恢复热点
    const vegetationHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(-80, 5, -60),
      {
        id: 'rehabilitation-vegetation',
        title: '植被恢复技术',
        description: '选择适生植物种类，重建植物群落',
        details: [
          '植物选择：乡土树种、耐贫瘠植物',
          '种植技术：客土法、营养钵育苗',
          '养护管理：灌溉、施肥、病虫害防治',
          '群落演替：草灌乔群落逐渐形成'
        ],
        originalPosition: new THREE.Vector3(-80, 0, -60)
      }
    )
    this.hotspots.push(vegetationHotspot)

    // 土地再利用热点
    const landuseHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(100, 5, 50),
      {
        id: 'rehabilitation-landuse',
        title: '土地再利用',
        description: '将修复后的土地用于公园、农业、林业等用途',
        details: [
          '公园绿地：休闲游憩、科普教育',
          '农业用地：有机农业、采摘园',
          '林业用地：经济林、生态林',
          '旅游开发：矿山公园、工业旅游'
        ],
        originalPosition: new THREE.Vector3(100, 0, 50)
      }
    )
    this.hotspots.push(landuseHotspot)

    // 监测评估热点
    const monitoringHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(-80, 5, -100),
      {
        id: 'rehabilitation-monitoring',
        title: '修复效果监测',
        description: '长期监测生态修复效果，评估修复成效',
        details: [
          '监测内容：土壤肥力、水质状况、植被覆盖',
          '监测方法：定期采样、遥感监测、实地调查',
          '评估指标：植被覆盖率、物种多样性、土壤质量',
          '数据应用：指导优化修复技术'
        ],
        originalPosition: new THREE.Vector3(-80, 0, -100)
      }
    )
    this.hotspots.push(monitoringHotspot)
  }

  /**
   * 创建复垦对比区域
   */
  createReclamationComparison() {
    // 创建复垦前对比区域（小面积，显示原始状态）
    const beforeArea = new THREE.Group()

    // 原始矿坑边缘（荒地）
    const wasteLandGeometry = new THREE.CircleGeometry(30, 32)
    const wasteLandMaterial = new THREE.MeshStandardMaterial({
      color: 0x5A5A5A,
      roughness: 0.9
    })
    const wasteLand = new THREE.Mesh(wasteLandGeometry, wasteLandMaterial)
    wasteLand.rotation.x = -Math.PI / 2
    wasteLand.position.set(-120, 0.1, 80)
    beforeArea.add(wasteLand)

    // 添加"复垦前"标识
    const beforeSign = this.createComparisonSign('复垦前', 0xFF6600)
    beforeSign.position.set(-120, 3, 80)
    beforeArea.add(beforeSign)

    this.sceneManager.scene.add(beforeArea)
    this.sceneObjects.push(beforeArea)

    // 创建复垦后区域（大面积，显示复垦效果）
    const afterArea = new THREE.Group()

    // 复垦后的绿地
    const greenLandGeometry = new THREE.CircleGeometry(40, 32)
    const greenLandMaterial = new THREE.MeshStandardMaterial({
      color: 0x4CAF50,
      roughness: 0.8
    })
    const greenLand = new THREE.Mesh(greenLandGeometry, greenLandMaterial)
    greenLand.rotation.x = -Math.PI / 2
    greenLand.position.set(-120, 0.2, 20)
    afterArea.add(greenLand)

    // 添加"复垦后"标识
    const afterSign = this.createComparisonSign('复垦后', 0x4CAF50)
    afterSign.position.set(-120, 3, 20)
    afterArea.add(afterSign)

    // 在复垦区域添加成功树木
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const radius = 20 + Math.random() * 15
      const x = -120 + Math.cos(angle) * radius
      const z = 20 + Math.sin(angle) * radius
      this.createTree(afterArea, x, 0, z)
    }

    this.sceneManager.scene.add(afterArea)
    this.sceneObjects.push(afterArea)

    // 添加进度指示器
    this.createProgressIndicator()
  }

  /**
   * 创建对比标识牌
   */
  createComparisonSign(text, color) {
    const signGroup = new THREE.Group()

    // 标识板
    const boardGeometry = new THREE.BoxGeometry(6, 3, 0.2)
    const boardMaterial = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.7,
      emissive: color,
      emissiveIntensity: 0.2
    })
    const board = new THREE.Mesh(boardGeometry, boardMaterial)
    board.position.y = 2
    signGroup.add(board)

    // 支撑杆
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 8)
    const poleMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8
    })

    const leftPole = new THREE.Mesh(poleGeometry, poleMaterial)
    leftPole.position.set(-2.5, 0.5, 0)
    signGroup.add(leftPole)

    const rightPole = new THREE.Mesh(poleGeometry, poleMaterial)
    rightPole.position.set(2.5, 0.5, 0)
    signGroup.add(rightPole)

    return signGroup
  }

  /**
   * 创建复垦进度指示器
   */
  createProgressIndicator() {
    const indicatorGroup = new THREE.Group()

    // 进度条背景
    const bgGeometry = new THREE.BoxGeometry(20, 1.5, 0.5)
    const bgMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8
    })
    const bg = new THREE.Mesh(bgGeometry, bgMaterial)
    bg.position.y = 0.75
    indicatorGroup.add(bg)

    // 进度条（95%完成）
    const progressGeometry = new THREE.BoxGeometry(19, 1, 0.6)
    const progressMaterial = new THREE.MeshStandardMaterial({
      color: 0x4CAF50,
      roughness: 0.6,
      emissive: 0x4CAF50,
      emissiveIntensity: 0.3
    })
    const progress = new THREE.Mesh(progressGeometry, progressMaterial)
    progress.position.set(-0.5, 0.75, 0.1)
    indicatorGroup.add(progress)

    // 百分比标识
    const percentGeometry = new THREE.BoxGeometry(3, 2, 0.3)
    const percentMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.5,
      emissive: 0xFFFFFF,
      emissiveIntensity: 0.2
    })
    const percent = new THREE.Mesh(percentGeometry, percentMaterial)
    percent.position.set(12, 2, 0)
    indicatorGroup.add(percent)

    indicatorGroup.position.set(0, 5, -120)
    this.sceneManager.scene.add(indicatorGroup)
    this.sceneObjects.push(indicatorGroup)
  }

  /**
   * 设置相机位置
   */
  setupCamera() {
    // 生态治理场景不需要直接设置相机，由SceneController的transitionCamera处理
    console.log('生态治理场景setupCamera被调用，跳过直接相机设置')
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

export default ReclamationStage