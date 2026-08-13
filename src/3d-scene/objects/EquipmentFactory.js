/**
 * 设备工厂
 * 用于创建各种矿山设备和设施
 */
import * as THREE from 'three'

export class EquipmentFactory {
  constructor(sceneManager) {
    this.sceneManager = sceneManager
    this.scene = sceneManager.scene
    this.equipmentObjects = []
  }

  /**
   * 创建钻探设备
   */
  createDrillingRig(position = { x: 0, y: 0, z: 0 }) {
    const rig = new THREE.Group()

    // 钻塔
    const towerGeometry = new THREE.BoxGeometry(3, 25, 3)
    const towerMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF6B00,
      roughness: 0.6,
      metalness: 0.3
    })
    const tower = new THREE.Mesh(towerGeometry, towerMaterial)
    tower.position.y = 12.5
    tower.castShadow = true
    rig.add(tower)

    // 钻塔框架
    const frameGeometry = new THREE.EdgesGeometry(towerGeometry)
    const frameMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 })
    const frame = new THREE.LineSegments(frameGeometry, frameMaterial)
    frame.position.y = 12.5
    rig.add(frame)

    // 钻机底座
    const baseGeometry = new THREE.BoxGeometry(10, 2, 10)
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.7
    })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    base.position.y = 1
    base.castShadow = true
    base.receiveShadow = true
    rig.add(base)

    // 钻杆
    const pipeGeometry = new THREE.CylinderGeometry(0.4, 0.4, 30, 12)
    const pipeMaterial = new THREE.MeshStandardMaterial({
      color: 0xCCCCCC,
      roughness: 0.4,
      metalness: 0.8
    })
    const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial)
    pipe.position.set(0, 15, 0)
    rig.add(pipe)

    // 钻头
    const bitGeometry = new THREE.ConeGeometry(0.5, 2, 6)
    const bitMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.3,
      metalness: 0.9
    })
    const bit = new THREE.Mesh(bitGeometry, bitMaterial)
    bit.position.set(0, 0, 0)
    bit.rotation.x = Math.PI
    rig.add(bit)

    // 发动机
    const engineGeometry = new THREE.BoxGeometry(4, 3, 3)
    const engineMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.5,
      metalness: 0.7
    })
    const engine = new THREE.Mesh(engineGeometry, engineMaterial)
    engine.position.set(5, 3.5, 0)
    engine.castShadow = true
    rig.add(engine)

    // 控制室
    const cabinGeometry = new THREE.BoxGeometry(4, 4, 4)
    const cabinMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFF00,
      roughness: 0.4
    })
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial)
    cabin.position.set(-5, 4, 0)
    cabin.castShadow = true
    rig.add(cabin)

    rig.position.set(position.x, position.y, position.z)
    this.scene.add(rig)
    this.equipmentObjects.push(rig)

    return rig
  }

  /**
   * 创建挖掘机
   */
  createExcavator(position = { x: 0, y: 0, z: 0 }) {
    const excavator = new THREE.Group()

    // 履带底盘
    const trackGeometry = new THREE.BoxGeometry(4, 2, 6)
    const trackMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8,
      metalness: 0.2
    })
    const tracks = new THREE.Mesh(trackGeometry, trackMaterial)
    tracks.position.y = 1
    tracks.castShadow = true
    excavator.add(tracks)

    // 车身
    const bodyGeometry = new THREE.BoxGeometry(5, 3, 4)
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFCC00,
      roughness: 0.6,
      metalness: 0.3
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 3.5
    body.castShadow = true
    excavator.add(body)

    // 驾驶室
    const cabinGeometry = new THREE.BoxGeometry(2, 2.5, 2)
    const cabinMaterial = new THREE.MeshStandardMaterial({
      color: 0x87CEEB,
      roughness: 0.3,
      metalness: 0.5,
      transparent: true,
      opacity: 0.7
    })
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial)
    cabin.position.set(1, 5.5, 0)
    cabin.castShadow = true
    excavator.add(cabin)

    // 大臂
    const armGeometry = new THREE.BoxGeometry(2, 12, 1.5)
    const armMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFCC00,
      roughness: 0.6,
      metalness: 0.3
    })
    const arm = new THREE.Mesh(armGeometry, armMaterial)
    arm.position.set(3, 8, 0)
    arm.rotation.z = -Math.PI / 4
    arm.castShadow = true
    excavator.add(arm)

    // 小臂
    const forearmGeometry = new THREE.BoxGeometry(1.5, 8, 1.2)
    const forearm = new THREE.Mesh(forearmGeometry, armMaterial)
    forearm.position.set(8, 12, 0)
    forearm.rotation.z = Math.PI / 6
    forearm.castShadow = true
    excavator.add(forearm)

    // 铲斗
    const bucketGeometry = new THREE.BoxGeometry(3, 2, 2.5)
    const bucketMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.7,
      metalness: 0.6
    })
    const bucket = new THREE.Mesh(bucketGeometry, bucketMaterial)
    bucket.position.set(10, 10, 0)
    bucket.rotation.z = Math.PI / 3
    bucket.castShadow = true
    excavator.add(bucket)

    excavator.position.set(position.x, position.y, position.z)
    this.scene.add(excavator)
    this.equipmentObjects.push(excavator)

    return excavator
  }

  /**
   * 创建矿用卡车
   */
  createMiningTruck(position = { x: 0, y: 0, z: 0 }) {
    const truck = new THREE.Group()

    // 车厢
    const bedGeometry = new THREE.BoxGeometry(8, 6, 14)
    const bedMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF6600,
      roughness: 0.7,
      metalness: 0.2
    })
    const bed = new THREE.Mesh(bedGeometry, bedMaterial)
    bed.position.y = 7
    bed.castShadow = true
    truck.add(bed)

    // 底盘
    const chassisGeometry = new THREE.BoxGeometry(6, 3, 16)
    const chassisMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8,
      metalness: 0.3
    })
    const chassis = new THREE.Mesh(chassisGeometry, chassisMaterial)
    chassis.position.y = 1.5
    chassis.castShadow = true
    truck.add(chassis)

    // 驾驶室
    const cabinGeometry = new THREE.BoxGeometry(5, 5, 4)
    const cabinMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFF00,
      roughness: 0.5,
      metalness: 0.3
    })
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial)
    cabin.position.set(0, 5.5, 8)
    cabin.castShadow = true
    truck.add(cabin)

    // 车轮（6个）
    const wheelGeometry = new THREE.CylinderGeometry(2, 2, 1.5, 16)
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.9
    })

    const wheelPositions = [
      { x: -2, z: 5 },
      { x: 2, z: 5 },
      { x: -2, z: 0 },
      { x: 2, z: 0 },
      { x: -2, z: -5 },
      { x: 2, z: -5 }
    ]

    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
      wheel.position.set(pos.x, 2, pos.z)
      wheel.rotation.z = Math.PI / 2
      wheel.castShadow = true
      truck.add(wheel)
    })

    truck.position.set(position.x, position.y, position.z)
    this.scene.add(truck)
    this.equipmentObjects.push(truck)

    return truck
  }

  /**
   * 创建破碎机
   */
  createCrusher(position = { x: 0, y: 0, z: 0 }) {
    const crusher = new THREE.Group()

    // 主体结构
    const mainGeometry = new THREE.BoxGeometry(8, 15, 8)
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.6,
      metalness: 0.5
    })
    const main = new THREE.Mesh(mainGeometry, mainMaterial)
    main.position.y = 7.5
    main.castShadow = true
    crusher.add(main)

    // 进料斗
    const hopperGeometry = new THREE.ConeGeometry(4, 6, 4, 1, true)
    const hopperMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.7,
      metalness: 0.4,
      side: THREE.DoubleSide
    })
    const hopper = new THREE.Mesh(hopperGeometry, hopperMaterial)
    hopper.position.y = 20
    hopper.rotation.y = Math.PI / 4
    crusher.add(hopper)

    // 出料口
    const dischargeGeometry = new THREE.BoxGeometry(3, 2, 4)
    const discharge = new THREE.Mesh(dischargeGeometry, mainMaterial)
    discharge.position.set(5, 3, 0)
    discharge.castShadow = true
    crusher.add(discharge)

    // 传动装置
    const driveGeometry = new THREE.BoxGeometry(3, 4, 3)
    const driveMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.5,
      metalness: 0.7
    })
    const drive = new THREE.Mesh(driveGeometry, driveMaterial)
    drive.position.set(-5, 8, 0)
    drive.castShadow = true
    crusher.add(drive)

    // 电机
    const motorGeometry = new THREE.CylinderGeometry(2, 2, 4, 12)
    const motorMaterial = new THREE.MeshStandardMaterial({
      color: 0x334455,
      roughness: 0.4,
      metalness: 0.8
    })
    const motor = new THREE.Mesh(motorGeometry, motorMaterial)
    motor.position.set(-8, 8, 0)
    motor.rotation.z = Math.PI / 2
    motor.castShadow = true
    crusher.add(motor)

    crusher.position.set(position.x, position.y, position.z)
    this.scene.add(crusher)
    this.equipmentObjects.push(crusher)

    return crusher
  }

  /**
   * 创建选矿设备
   */
  createProcessingPlant(position = { x: 0, y: 0, z: 0 }) {
    const plant = new THREE.Group()

    // 厂房主体
    const buildingGeometry = new THREE.BoxGeometry(30, 20, 40)
    const buildingMaterial = new THREE.MeshStandardMaterial({
      color: 0xCCCCCC,
      roughness: 0.7,
      metalness: 0.3
    })
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial)
    building.position.y = 10
    building.castShadow = true
    building.receiveShadow = true
    plant.add(building)

    // 屋顶
    const roofGeometry = new THREE.BoxGeometry(32, 2, 42)
    const roofMaterial = new THREE.MeshStandardMaterial({
      color: 0x999999,
      roughness: 0.8
    })
    const roof = new THREE.Mesh(roofGeometry, roofMaterial)
    roof.position.y = 21
    roof.castShadow = true
    plant.add(roof)

    // 烟囱
    const chimneyGeometry = new THREE.CylinderGeometry(2, 2.5, 25, 12)
    const chimneyMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.6,
      metalness: 0.4
    })
    const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial)
    chimney.position.set(10, 22.5, 15)
    chimney.castShadow = true
    plant.add(chimney)

    // 储料仓
    const siloGeometry = new THREE.CylinderGeometry(4, 5, 18, 12)
    const siloMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.5,
      metalness: 0.6
    })
    const silo = new THREE.Mesh(siloGeometry, siloMaterial)
    silo.position.set(-12, 11, -10)
    silo.castShadow = true
    plant.add(silo)

    // 皮带输送机
    const conveyorGeometry = new THREE.BoxGeometry(25, 1, 3)
    const conveyorMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.9,
      metalness: 0.1
    })
    const conveyor = new THREE.Mesh(conveyorGeometry, conveyorMaterial)
    conveyor.position.set(0, 5, -15)
    conveyor.castShadow = true
    plant.add(conveyor)

    plant.position.set(position.x, position.y, position.z)
    this.scene.add(plant)
    this.equipmentObjects.push(plant)

    return plant
  }

  /**
   * 创建测量设备
   */
  createSurveyEquipment(position = { x: 0, y: 0, z: 0 }) {
    const equipment = new THREE.Group()

    // 三脚架
    const tripodGeometry = new THREE.ConeGeometry(2, 8, 3)
    const tripodMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFF00,
      roughness: 0.6,
      metalness: 0.3
    })
    const tripod = new THREE.Mesh(tripodGeometry, tripodMaterial)
    tripod.position.y = 4
    tripod.castShadow = true
    equipment.add(tripod)

    // 测量仪器
    const deviceGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
    const deviceMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.3,
      metalness: 0.8
    })
    const device = new THREE.Mesh(deviceGeometry, deviceMaterial)
    device.position.y = 8
    device.castShadow = true
    equipment.add(device)

    // 仪器镜头
    const lensGeometry = new THREE.CylinderGeometry(0.5, 0.3, 1, 12)
    const lensMaterial = new THREE.MeshStandardMaterial({
      color: 0x6666FF,
      roughness: 0.1,
      metalness: 0.9
    })
    const lens = new THREE.Mesh(lensGeometry, lensMaterial)
    lens.position.set(0, 8.5, 1)
    lens.rotation.x = Math.PI / 2
    equipment.add(lens)

    equipment.position.set(position.x, position.y, position.z)
    this.scene.add(equipment)
    this.equipmentObjects.push(equipment)

    return equipment
  }

  /**
   * 创建井架
   */
  createHeadframe(position = { x: 0, y: 0, z: 0 }) {
    const headframe = new THREE.Group()

    // 主框架（A型结构）
    const frameHeight = 30
    const frameWidth = 12

    // 左侧支柱
    const leftLegGeometry = new THREE.BoxGeometry(1.5, frameHeight, 1.5)
    const legMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF6600,
      roughness: 0.6,
      metalness: 0.4
    })

    const leftLeg1 = new THREE.Mesh(leftLegGeometry, legMaterial)
    leftLeg1.position.set(-frameWidth / 2, frameHeight / 2, -3)
    leftLeg1.rotation.z = 0.15
    leftLeg1.castShadow = true
    headframe.add(leftLeg1)

    const leftLeg2 = new THREE.Mesh(leftLegGeometry, legMaterial)
    leftLeg2.position.set(-frameWidth / 2, frameHeight / 2, 3)
    leftLeg2.rotation.z = 0.15
    leftLeg2.castShadow = true
    headframe.add(leftLeg2)

    // 右侧支柱
    const rightLeg1 = new THREE.Mesh(leftLegGeometry, legMaterial)
    rightLeg1.position.set(frameWidth / 2, frameHeight / 2, -3)
    rightLeg1.rotation.z = -0.15
    rightLeg1.castShadow = true
    headframe.add(rightLeg1)

    const rightLeg2 = new THREE.Mesh(leftLegGeometry, legMaterial)
    rightLeg2.position.set(frameWidth / 2, frameHeight / 2, 3)
    rightLeg2.rotation.z = -0.15
    rightLeg2.castShadow = true
    headframe.add(rightLeg2)

    // 顶部横梁
    const topBeamGeometry = new THREE.BoxGeometry(frameWidth + 4, 1.5, 1.5)
    const topBeam = new THREE.Mesh(topBeamGeometry, legMaterial)
    topBeam.position.y = frameHeight - 1
    topBeam.castShadow = true
    headframe.add(topBeam)

    // 天轮
    const wheelGeometry = new THREE.TorusGeometry(3, 0.5, 8, 16)
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.5,
      metalness: 0.7
    })
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
    wheel.position.y = frameHeight + 2
    wheel.rotation.x = Math.PI / 2
    wheel.castShadow = true
    headframe.add(wheel)

    // 提升机房
    const houseGeometry = new THREE.BoxGeometry(10, 8, 8)
    const houseMaterial = new THREE.MeshStandardMaterial({
      color: 0xDEB887,
      roughness: 0.7
    })
    const house = new THREE.Mesh(houseGeometry, houseMaterial)
    house.position.set(-15, 4, 0)
    house.castShadow = true
    headframe.add(house)

    headframe.position.set(position.x, position.y, position.z)
    this.scene.add(headframe)
    this.equipmentObjects.push(headframe)

    return headframe
  }

  /**
   * 创建办公楼
   */
  createOffice(position = { x: 0, y: 0, z: 0 }) {
    const office = new THREE.Group()

    // 主楼
    const mainGeometry = new THREE.BoxGeometry(15, 8, 10)
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0xDEB887,
      roughness: 0.8
    })
    const main = new THREE.Mesh(mainGeometry, mainMaterial)
    main.position.y = 4
    main.castShadow = true
    office.add(main)

    // 窗户
    const windowGeometry = new THREE.BoxGeometry(2, 2, 0.1)
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x87CEEB,
      roughness: 0.1,
      metalness: 0.5,
      transparent: true,
      opacity: 0.7
    })

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        const window = new THREE.Mesh(windowGeometry, windowMaterial)
        window.position.set(-5 + i * 5, 3 + j * 2.5, 5.1)
        office.add(window)
      }
    }

    // 门
    const doorGeometry = new THREE.BoxGeometry(3, 4, 0.2)
    const doorMaterial = new THREE.MeshStandardMaterial({
      color: 0x654321,
      roughness: 0.9
    })
    const door = new THREE.Mesh(doorGeometry, doorMaterial)
    door.position.set(0, 2, 5.1)
    office.add(door)

    office.position.set(position.x, position.y, position.z)
    this.scene.add(office)
    this.equipmentObjects.push(office)

    return office
  }

  /**
   * 创建帐篷
   */
  createTent(position = { x: 0, y: 0, z: 0 }) {
    const tent = new THREE.Group()

    // 帐篷主体
    const tentGeometry = new THREE.ConeGeometry(6, 8, 4)
    const tentMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      roughness: 0.9
    })
    const tentMesh = new THREE.Mesh(tentGeometry, tentMaterial)
    tentMesh.position.y = 4
    tentMesh.rotation.y = Math.PI / 4
    tentMesh.castShadow = true
    tent.add(tentMesh)

    // 入口
    const entranceGeometry = new THREE.BoxGeometry(3, 4, 0.1)
    const entranceMaterial = new THREE.MeshStandardMaterial({
      color: 0x654321,
      roughness: 0.9
    })
    const entrance = new THREE.Mesh(entranceGeometry, entranceMaterial)
    entrance.position.set(0, 2, 4)
    tent.add(entrance)

    tent.position.set(position.x, position.y, position.z)
    this.scene.add(tent)
    this.equipmentObjects.push(tent)

    return tent
  }

  /**
   * 清除所有设备
   */
  clearAll() {
    this.equipmentObjects.forEach(equipment => {
      this.scene.remove(equipment)
      equipment.traverse(child => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose()
          if (child.material) child.material.dispose()
        }
      })
    })
    this.equipmentObjects = []
  }
}

export default EquipmentFactory