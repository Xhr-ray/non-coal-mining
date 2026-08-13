/**
 * 3D场景模块统一导出
 */

// 核心管理器
export { SceneManager } from './core/SceneManager.js'
export { SceneController } from './SceneController.js'

// 对象生成器
export { TerrainGenerator } from './objects/TerrainGenerator.js'
export { EquipmentFactory } from './objects/EquipmentFactory.js'

// 阶段场景
export { ExplorationStage } from './stages/ExplorationStage.js'
export { OpenPitStage } from './stages/OpenPitStage.js'
export { UndergroundStage } from './stages/UndergroundStage.js'
export { ReclamationStage } from './stages/ReclamationStage.js'
export { AuxiliaryStage } from './stages/AuxiliaryStage.js'

// 默认导出主控制器
export { default } from './SceneController.js'