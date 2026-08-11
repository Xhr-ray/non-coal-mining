/**
 * 矿山全生命周期展示平台配置文件
 * 统一导出所有配置数据
 */

import { stageData } from './stages'
import { safetyData } from './stages/safety'

// 导出所有配置
export {
  stageData,
  safetyData
}

// 默认导出
export default {
  stages: stageData,
  safety: safetyData
}