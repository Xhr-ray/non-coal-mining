/**
 * 地形生成器
 * 用于生成各种类型的地形地貌
 */
import * as THREE from 'three'

export class TerrainGenerator {
  constructor(sceneManager) {
    this.sceneManager = sceneManager
    this.scene = sceneManager.scene
    this.terrainMeshes = []
  }

  /**
   * 创建矿山地形
   * @param {Object} options - 地形配置选项
   */
  createMiningTerrain(options = {}) {
    // 在创建新地形前清除所有旧地形
    this.clearAll()
    const {
      width = 500,
      depth = 500,
      segments = 100,
      maxHeight = 50,
      minHeight = -30, // 允许形成矿坑
      noiseScale = 0.02,
      baseColor = 0x8B7355,
      rockColor = 0x696969
    } = options

    // 创建地形几何体
    const geometry = new THREE.PlaneGeometry(width, depth, segments, segments)

    // 生成高度图
    const vertices = geometry.attributes.position.array
    const colors = []

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]
      const y = vertices[i + 1]

      // 计算到中心的距离
      const distanceFromCenter = Math.sqrt(x * x + y * y)
      const normalizedDistance = distanceFromCenter / (width * 0.4)

      // 基础地形噪波
      let height = this.generateNoise(x, y, noiseScale) * maxHeight

      // 在中心区域形成矿坑
      if (normalizedDistance < 1) {
        const pitFactor = 1 - normalizedDistance
        const pitDepth = Math.pow(pitFactor, 2) * (maxHeight + Math.abs(minHeight))
        height -= pitDepth * 0.8

        // 添加台阶效果（露天矿特征）
        const stepCount = 8
        const stepHeight = 8
        const stepWidth = 30
        for (let s = 0; s < stepCount; s++) {
          const stepInnerRadius = s * stepWidth
          const stepOuterRadius = (s + 1) * stepWidth
          if (distanceFromCenter > stepInnerRadius && distanceFromCenter < stepOuterRadius) {
            height = -s * stepHeight + Math.random() * 2
            break
          }
        }
      }

      // 添加道路
      if (this.isRoadPosition(x, y)) {
        height = Math.max(height, 2) // 道路保持平坦
      }

      vertices[i + 2] = height

      // 计算顶点颜色
      const color = this.calculateTerrainColor(height, maxHeight, baseColor, rockColor)
      colors.push(color.r, color.g, color.b)
    }

    // 设置顶点颜色
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.computeVertexNormals()

    // 创建材质
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      metalness: 0.0,
      flatShading: false
    })

    const terrain = new THREE.Mesh(geometry, material)
    terrain.rotation.x = -Math.PI / 2
    terrain.receiveShadow = true
    terrain.castShadow = true

    this.scene.add(terrain)
    this.terrainMeshes.push(terrain)

    return terrain
  }

  /**
   * 生成地形噪波
   */
  generateNoise(x, y, scale) {
    // 简化的柏林噪声实现
    const value1 = Math.sin(x * scale) * Math.cos(y * scale)
    const value2 = Math.sin(x * scale * 2 + 1.5) * Math.cos(y * scale * 1.5 + 2.3)
    const value3 = Math.sin(x * scale * 4 + 3.7) * Math.cos(y * scale * 4 + 4.2)

    return (value1 + value2 * 0.5 + value3 * 0.25) / 1.75
  }

  /**
   * 判断是否为道路位置
   */
  isRoadPosition(x, y) {
    // 创建通往矿坑的螺旋道路
    const angle = Math.atan2(y, x)
    const distance = Math.sqrt(x * x + y * y)

    // 主干道
    if (Math.abs(angle - Math.PI / 4) < 0.1 && distance > 50 && distance < 200) {
      return true
    }

    // 环形道路
    for (let r = 60; r < 180; r += 30) {
      if (Math.abs(distance - r) < 8) {
        return true
      }
    }

    return false
  }

  /**
   * 根据高度计算地形颜色
   */
  calculateTerrainColor(height, maxHeight, baseColor, rockColor) {
    const base = new THREE.Color(baseColor)
    const rock = new THREE.Color(rockColor)

    // 归一化高度
    const normalizedHeight = (height + 50) / (maxHeight + 50)

    if (normalizedHeight < 0.3) {
      // 低洼地区 - 深色
      return base.clone().multiplyScalar(0.6)
    } else if (normalizedHeight < 0.6) {
      // 中等高度 - 基础颜色
      return base
    } else {
      // 高地 - 岩石颜色混合
      const mixFactor = (normalizedHeight - 0.6) / 0.4
      return base.clone().lerp(rock, mixFactor)
    }
  }

  /**
   * 创建勘探地形
   */
  createExplorationTerrain() {
    return this.createMiningTerrain({
      width: 400,
      depth: 400,
      segments: 80,
      maxHeight: 30,
      minHeight: -10,
      noiseScale: 0.015,
      baseColor: 0x8B7355,
      rockColor: 0x6B6B6B
    })
  }

  /**
   * 创建露天矿地形（真正的楼梯式台阶）
   */
  createOpenPitTerrain() {
    // 在创建新地形前清除所有旧地形
    this.clearAll()

    const width = 500
    const depth = 500
    const segments = 120
    const maxHeight = 80
    const baseColor = 0x8B7355
    const rockColor = 0x5A5A5A

    // 创建地形几何体
    const geometry = new THREE.PlaneGeometry(width, depth, segments, segments)

    // 生成高度图
    const vertices = geometry.attributes.position.array
    const colors = []

    // 楼梯式台阶参数
    const benchHeight = 20
    const benchDepth = 35
    const slopeDepth = 15
    const benchWidth = 120
    const numBenches = 6

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]
      const y = vertices[i + 1]

      // 基础地形噪波
      let height = this.generateNoise(x, y, 0.025) * maxHeight

      // 检查是否在楼梯式台阶区域内
      const isInBenchArea = Math.abs(x) <= benchWidth / 2 + 20 // 稍微扩大边界
      const isInPitDirection = y <= 20 && y >= -(numBenches * (benchDepth + slopeDepth) + 50)

      if (isInBenchArea && isInPitDirection) {
        // 计算当前点在哪一层台阶上
        let foundBench = false

        for (let b = 0; b < numBenches; b++) {
          const benchZStart = -b * (benchDepth + slopeDepth)
          const benchZEnd = benchZStart + benchDepth

          // 检查是否在当前台阶的平台上
          if (y >= benchZStart && y <= benchZEnd) {
            height = -b * (benchHeight + 2) // 台阶深度
            foundBench = true
            break
          }

          // 检查是否在连接坡道上
          const slopeZStart = benchZEnd
          const slopeZEnd = benchZStart - (b < numBenches - 1 ? slopeDepth : 0)
          if (b < numBenches - 1 && y >= slopeZEnd && y <= slopeZStart) {
            // 在坡道上，线性过渡高度
            const slopeProgress = (slopeZStart - y) / slopeDepth
            const currentBenchDepth = -b * (benchHeight + 2)
            const nextBenchDepth = -(b + 1) * (benchHeight + 2)
            height = currentBenchDepth + (nextBenchDepth - currentBenchDepth) * slopeProgress
            foundBench = true
            break
          }
        }

        // 如果不在任何台阶上，则在底部区域
        if (!foundBench && y < -(numBenches - 1) * (benchDepth + slopeDepth)) {
          height = -(numBenches - 1) * (benchHeight + 2) - 5 // 底部平台
        }
      }

      vertices[i + 2] = height

      // 计算顶点颜色
      const color = this.calculateTerrainColor(height, maxHeight, baseColor, rockColor)
      colors.push(color.r, color.g, color.b)
    }

    // 设置顶点颜色
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.computeVertexNormals()

    // 创建材质
    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      metalness: 0.0,
      flatShading: false
    })

    const terrain = new THREE.Mesh(geometry, material)
    terrain.rotation.x = -Math.PI / 2
    terrain.receiveShadow = true
    terrain.castShadow = true

    this.scene.add(terrain)
    this.terrainMeshes.push(terrain)

    return terrain
  }

  /**
   * 创建地下矿地形（入口和地表设施）
   */
  createUndergroundTerrain() {
    const terrain = this.createMiningTerrain({
      width: 450,
      depth: 450,
      segments: 100,
      maxHeight: 60,
      minHeight: -20,
      noiseScale: 0.02,
      baseColor: 0x7B7355,
      rockColor: 0x5A5A5A
    })

    // 添加竖井位置标记
    this.addShaftPosition(50, 50)

    return terrain
  }

  /**
   * 添加竖井位置
   */
  addShaftPosition(x, z) {
    const shaftGeometry = new THREE.CylinderGeometry(8, 8, 2, 16)
    const shaftMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.7
    })
    const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial)
    shaft.position.set(x, 1, z)
    shaft.receiveShadow = true
    this.scene.add(shaft)

    // 添加井架基础
    const baseGeometry = new THREE.BoxGeometry(12, 1, 12)
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.6
    })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    base.position.set(x, 0.5, z)
    base.receiveShadow = true
    this.scene.add(base)

    this.terrainMeshes.push(shaft, base)
  }

  /**
   * 创建生态修复地形
   */
  createRehabilitationTerrain() {
    const terrain = this.createMiningTerrain({
      width: 500,
      depth: 500,
      segments: 100,
      maxHeight: 40,
      minHeight: -30,
      noiseScale: 0.015,
      baseColor: 0x4A7C59, // 更绿的基底色
      rockColor: 0x5A5A5A
    })

    // 添加植被覆盖效果
    this.addVegetation()

    return terrain
  }

  /**
   * 添加植被
   */
  addVegetation() {
    const treePositions = []

    // 在地形高处生成树木
    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * 400
      const z = (Math.random() - 0.5) * 400
      const distance = Math.sqrt(x * x + z * z)

      if (distance > 80) { // 避开矿坑区域
        treePositions.push({ x, z })
      }
    }

    treePositions.forEach(pos => {
      this.createTree(pos.x, pos.z)
    })
  }

  /**
   * 创建单棵树
   */
  createTree(x, z) {
    const tree = new THREE.Group()

    // 树干
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.8, 4, 8)
    const trunkMaterial = new THREE.MeshStandardMaterial({
      color: 0x4A3728,
      roughness: 0.9
    })
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
    trunk.position.y = 2
    trunk.castShadow = true
    tree.add(trunk)

    // 树冠
    const foliageGeometry = new THREE.ConeGeometry(2, 6, 8)
    const foliageMaterial = new THREE.MeshStandardMaterial({
      color: 0x2E8B57,
      roughness: 0.8
    })
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial)
    foliage.position.y = 6
    foliage.castShadow = true
    tree.add(foliage)

    tree.position.set(x, 0, z)
    tree.scale.setScalar(0.8 + Math.random() * 0.4)

    this.scene.add(tree)
    this.terrainMeshes.push(tree)
  }

  /**
   * 清除所有地形
   */
  clearAll() {
    this.terrainMeshes.forEach(mesh => {
      this.scene.remove(mesh)
      mesh.traverse(child => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose()
          if (child.material) child.material.dispose()
        }
      })
    })
    this.terrainMeshes = []
  }
}

export default TerrainGenerator