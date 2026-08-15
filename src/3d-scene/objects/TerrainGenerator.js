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
   * 创建地下矿地形（入口和地表设施）
   * 地下开采地表应为自然平整地貌，不应出现露天矿坑
   */
  createUndergroundTerrain() {
    // 在创建新地形前清除所有旧地形
    this.clearAll()

    const width = 500
    const depth = 500
    const segments = 120
    const maxHeight = 20
    const flatRadius = 200 // 中心平整区，覆盖井口及地表设施

    const geometry = new THREE.PlaneGeometry(width, depth, segments, segments)
    const vertices = geometry.attributes.position.array
    const colors = []

    const grassColor = new THREE.Color(0x7BA05B) // 草地绿
    const rockColor = new THREE.Color(0x6B6B6B)  // 岩石灰

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]
      const y = vertices[i + 1]
      const distance = Math.sqrt(x * x + y * y)

      let height
      if (distance < flatRadius) {
        // 中心平整区：井口、井架及地表设施所在区域
        height = 0
      } else {
        // 外围自然丘陵地貌
        const hillFactor = Math.min((distance - flatRadius) / 150, 1)
        height = this.generateNoise(x, y, 0.015) * maxHeight * hillFactor
      }

      vertices[i + 2] = height

      // 低洼处偏草地绿，高处偏岩石色
      const t = Math.min(Math.max(height / maxHeight, 0), 1)
      const color = grassColor.clone().lerp(rockColor, t * 0.7)
      colors.push(color.r, color.g, color.b)
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.computeVertexNormals()

    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      metalness: 0.0
    })

    const terrain = new THREE.Mesh(geometry, material)
    terrain.rotation.x = -Math.PI / 2
    terrain.receiveShadow = true
    terrain.castShadow = true

    this.scene.add(terrain)
    this.terrainMeshes.push(terrain)

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
   * 创建生态修复地形（复垦后的平滑盆地，无环形台阶）
   * 中心为平滑的复垦盆地（可蓄水成湖），外围为平整复垦地面
   */
  createRehabilitationTerrain() {
    // 在创建新地形前清除所有旧地形
    this.clearAll()

    const width = 500
    const depth = 500
    const segments = 120
    const basinRadius = 80     // 盆地边缘半径
    const flatRadius = 45      // 盆地平底半径（湖面区域）
    const basinDepth = 8       // 盆地深度（复垦后已回填整形，较浅）

    const geometry = new THREE.PlaneGeometry(width, depth, segments, segments)
    const vertices = geometry.attributes.position.array
    const colors = []

    const deepGrassColor = new THREE.Color(0x3E7A46) // 盆地低处深绿
    const grassColor = new THREE.Color(0x6B9E5A)     // 草地绿

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]
      const y = vertices[i + 1]
      const distance = Math.sqrt(x * x + y * y)

      let height
      if (distance < flatRadius) {
        // 盆地平底（原矿坑底部，已回填平整）
        height = -basinDepth
      } else if (distance < basinRadius) {
        // 盆地缓坡：从平底平滑过渡到地表
        const t = (distance - flatRadius) / (basinRadius - flatRadius)
        const smooth = (1 - Math.cos(t * Math.PI)) / 2
        height = -basinDepth * (1 - smooth)
      } else {
        // 外围为平整复垦地面，保证树木、石头、设施不悬空
        height = 0
      }

      vertices[i + 2] = height

      // 低处偏深绿（盆地），高处偏草地绿
      const colorT = Math.min(Math.max((height + basinDepth) / basinDepth, 0), 1)
      const color = deepGrassColor.clone().lerp(grassColor, colorT)
      colors.push(color.r, color.g, color.b)
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.computeVertexNormals()

    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      metalness: 0.0
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
