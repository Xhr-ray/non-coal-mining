/**
 * 阶段配置 - 统一导出所有阶段数据
 * 矿山开采逻辑顺序：
 * 1. 前期准备（地质勘探、基建/开采计划、开拓建设）
 * 2. 开采阶段（露天开采和地下开采并列）
 * 3. 生态治理闭坑复垦
 */

import { explorationData } from './stages/exploration'
import { openPitData } from './stages/openPit'
import { undergroundData } from './stages/underground'
import { reclamationData } from './stages/reclamation'

/**
 * 时间线上的主要阶段数据（按矿山开采逻辑顺序）
 */
export const stageData = {
  stages: [
    explorationData,      // 1. 前期准备阶段
    openPitData,          // 2. 露天开采阶段
    undergroundData,      // 2. 地下开采阶段（与露天并列）
    reclamationData       // 3. 生态治理闭坑复垦
  ]
}

export default stageData