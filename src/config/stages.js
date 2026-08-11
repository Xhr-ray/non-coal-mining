/**
 * 阶段配置 - 统一导出所有阶段数据
 */

import { explorationData } from './stages/exploration'
import { openPitData } from './stages/openPit'
import { undergroundData } from './stages/underground'
import { auxiliaryData } from './stages/auxiliary'

/**
 * 所有阶段数据
 */
export const stageData = {
  stages: [
    explorationData,
    openPitData,
    undergroundData,
    auxiliaryData
  ]
}

export default stageData