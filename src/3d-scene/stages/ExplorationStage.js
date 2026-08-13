/**
 * 勘探阶段场景构建器
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

    // 创建地形
    this.createTerrain()

    // 创建勘探设备
    this.createEquipment()

    // 创建基础设施
    this.createInfrastructure()

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
   * 创建勘探设备
   */
  createEquipment() {
    // 钻探设备（多台）
    const drillPositions = [
      { x: 60, y: 0, z: 40 },
      { x: 80, y: 0, z: 60 },
      { x: 50, y: 0, z: 80 }
    ]

    drillPositions.forEach(pos => {
      const rig = this.equipmentFactory.createDrillingRig(pos)
      this.sceneObjects.push(rig)
    })

    // 测量设备
    const surveyPositions = [
      { x: -40, y: 0, z: 30 },
      { x: -30, y: 0, z: 50 },
      { x: -50, y: 0, z: 60 }
    ]

    surveyPositions.forEach(pos => {
      const survey = this.equipmentFactory.createSurveyEquipment(pos)
      this.sceneObjects.push(survey)
    })

    // 地质剖面点
    this.createGeologicalMarkers()
  }

  /**
   * 创建地质标记点
   */
  createGeologicalMarkers() {
    const positions = [
      { x: 20, y: 0, z: -30 },
      { x: 40, y: 0, z: -50 },
      { x: 60, y: 0, z: -40 }
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
   * 创建基础设施
   */
  createInfrastructure() {
    // 办公帐篷
    const tentPositions = [
      { x: -60, y: 0, z: -40 },
      { x: -70, y: 0, z: -30 }
    ]

    tentPositions.forEach(pos => {
      const tent = this.equipmentFactory.createTent(pos)
      this.sceneObjects.push(tent)
    })

    // 临时办公室
    const office = this.equipmentFactory.createOffice({
      x: -50,
      y: 0,
      z: -20
    })
    this.sceneObjects.push(office)

    // 样品堆放区
    this.createSampleArea()
  }

  /**
   * 创建样品堆放区
   */
  createSampleArea() {
    const area = new THREE.Group()

    // 围栏
    const fenceGeometry = new THREE.BoxGeometry(20, 1.5, 0.2)
    const fenceMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      roughness: 0.9
    })

    for (let i = 0; i < 4; i++) {
      const fence = new THREE.Mesh(fenceGeometry, fenceMaterial)
      if (i < 2) {
        fence.position.set(0, 0.75, i === 0 ? -9 : 9)
      } else {
        fence.position.set(i === 2 ? -9 : 9, 0.75, 0)
        fence.rotation.y = Math.PI / 2
      }
      area.add(fence)
    }

    // 样品箱
    const boxGeometry = new THREE.BoxGeometry(1.5, 1, 1)
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xDEB887,
      roughness: 0.8
    })

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        const box = new THREE.Mesh(boxGeometry, boxMaterial)
        box.position.set(-5 + i * 2, 0.5, -3 + j * 2)
        box.castShadow = true
        area.add(box)
      }
    }

    area.position.set(30, 0, -70)
    this.sceneManager.scene.add(area)
    this.sceneObjects.push(area)
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

    // 物探工作热点
    const geophysicalHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(-50, 10, 60),
      {
        id: 'exploration-geophysical',
        title: '地球物理勘探',
        description: '利用物理方法探测地下矿体异常',
        details: [
          '磁法勘探：探测磁性矿物',
          '电法勘探：测定矿体导电性',
          '重力勘探：密度差异探测',
          '地震勘探：构造界面探测'
        ],
        originalPosition: new THREE.Vector3(-50, 0, 60)
      }
    )
    this.hotspots.push(geophysicalHotspot)

    // 样品分析热点
    const sampleHotspot = this.sceneManager.addHotspot(
      new THREE.Vector3(30, 8, -70),
      {
        id: 'exploration-sampling',
        title: '样品分析',
        description: '岩心样品的实验室分析和测试',
        details: [
          '化学分析：主要元素、微量元素',
          '矿物鉴定：显微镜、X射线衍射',
          '物理性质：密度、硬度、磁性',
          '选矿试验：可选性评估'
        ],
        originalPosition: new THREE.Vector3(30, 0, -70)
      }
    )
    this.hotspots.push(sampleHotspot)
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