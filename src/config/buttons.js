// 按钮配置文件
export const buttonConfig = {
  // 蓝色系按钮 - 25个
  blueButtons: [
    // 前期阶段
    { id: 1, text: '地质勘探', category: 'exploration' },
    { id: 2, text: '基建/开采计划', category: 'planning' },

    // 露天生产阶段
    { id: 3, text: '穿孔作业', category: 'piercing' },
    { id: 4, text: '爆破作业', category: 'blasting' },
    { id: 5, text: '铲装作业', category: 'dumping' },
    { id: 6, text: '运输作业', category: 'transportation' },
    { id: 7, text: '破碎作业', category: 'crushing' },
    { id: 8, text: '筛分/选矿', category: 'beneficiation' },
    { id: 9, text: '尾矿处置', category: 'tailings' },

    // 地下生产阶段
    { id: 10, text: '井筒/斜坡道开拓', category: 'exploit' },
    { id: 11, text: '掘进作业', category: 'tunnelling' },
    { id: 12, text: '支护作业', category: 'supporting' },
    { id: 13, text: '采矿作业', category: 'mining' },
    { id: 14, text: '装载作业', category: 'loading' },
    { id: 15, text: '运输作业', category: 'Transportation' },
    { id: 16, text: '井下破碎/转运', category: 'Crushing' },
    { id: 17, text: '提升作业', category: 'lift' },
    { id: 18, text: '充填作业', category: 'packing' },

    // 辅助生产系统
    { id: 19, text: '通风系统', category: 'ventilating' },
    { id: 20, text: '排水系统', category: 'drainage' },
    { id: 21, text: '供配电系统', category: 'power' },
    { id: 22, text: '调度与通信系统', category: 'communication' },
    { id: 23, text: '自动化控制系统', category: 'automation' },
    { id: 24, text: '安全监测系统', category: 'safety ' },
    { id: 25, text: '综合管控平台', category: 'platform' }
  ],

  // 红色系按钮 - 5个
  // 安全红线按钮
  redButtons: [
    { id: 101, text: '尾矿库安全红线', category: 'TailingsSafety' },
    { id: 102, text: '边坡安全红线', category: 'SlopeSafety' },
    { id: 103, text: '爆破境界红线', category: 'BlastingSafety' },
    { id: 104, text: '井下安全监测红线', category: 'MonitoringSafety' },
    { id: 105, text: '提升运输安全红线', category: 'TransportationSafety' }
  ]
}

// 按钮描述模板
export const buttonDescriptions = {
  exploration: '地质勘探阶段',
  planning: '规划设计阶段',
  piercing: '穿孔作业',
  
  construction: '建设施工阶段',
  production: '生产运营阶段',
  maintenance: '运维管理阶段',
  restoration: '生态恢复阶段',
  closure: '闭坑管理阶段',
  safety: '安全管理核心环节',
  emergency: '应急响应重要组成',
  risk: '风险控制关键措施',
  accident: '事故处理必要流程',
  environmental: '环境保护监督环节',
  default: '矿山管理重要环节'
}

// 按钮统计数据
export const buttonStats = {
  exploration: {
    '勘探面积': '50平方公里',
    '钻孔数量': '200个',
    '投资金额': '2亿元',
    '工作时间': '18个月'
  },
  planning: {
    '规划周期': '12个月',
    '审批通过率': '95%',
    '方案优化': '15次',
    '专家评估': '8次'
  },
  construction: {
    '建设周期': '24个月',
    '投资规模': '8亿元',
    '施工人员': '500人',
    '安全记录': '1000天无事故'
  },
  production: {
    '年产量': '500万吨',
    '设备利用率': '85%',
    '人员效率': '120吨/人/年',
    '质量合格率': '99.5%'
  },
  maintenance: {
    '设备完好率': '92%',
    '预防维护': '85%',
    '故障响应': '15分钟',
    '停机时间': '2小时/月'
  },
  restoration: {
    '修复面积': '2000亩',
    '植被成活率': '85%',
    '投资金额': '1.5亿元',
    '项目周期': '36个月'
  },
  closure: {
    '闭坑周期': '12个月',
    '土地复垦率': '95%',
    '后期监管': '10年',
    '安全评估': '5次/年'
  },
  safety: {
    '安全培训': '100%覆盖',
    '隐患排查': '月度检查',
    '安全投入': '500万元/年',
    '事故率': '0.1%'
  },
  emergency: {
    '响应时间': '3分钟',
    '演练频次': '季度演练',
    '预案完善': '98%',
    '人员配置': '24小时值班'
  },
  risk: {
    '风险评估': '月度评估',
    '隐患整改': '100%完成',
    '监控覆盖': '95%区域',
    '预警准确': '92%'
  },
  accident: {
    '处置时间': '30分钟内',
    '应急预案': '5套预案',
    '人员培训': '全员覆盖',
    '设备配置': '专业装备'
  },
  environmental: {
    '环保投入': '800万元/年',
    '监测频次': '日监测',
    '排放达标': '99.8%',
    '整改完成': '100%'
  }
}

// 按钮位置配置
// 默认按钮位置（基于背景图片精确固定）
export const defaultButtonPositions = {
  1: { left: '10.360178116982697%', top: '14.43975036113562%' },
  2: { left: '20.25146788228665%', top: '14.740078817889305%' },
  3: { left: '29.29734826594069%', top: '14.740078817889305%' },
  4: { left: '37.97743404039144%', top: '14.68880298880614%' },
  5: { left: '47.54733407022691%', top: '14.68880298880614%' },
  6: { left: '56.09682566424286%', top: '14.740078817889305%' },
  7: { left: '64.93135370248442%', top: '14.815160932077726%' },
  8: { left: '76.21756894751073%', top: '14.890243046266145%' },
  9: { left: '89.20587915017954%', top: '15.001767179003098%' },
  10: { left: '10.825153276890148%', top: '48.752276545243895%' },
  11: { left: '20.505090696781625%', top: '49.05260500199758%' },
  12: { left: '29.08599592052822%', top: '49.202769230374415%' },
  13: { left: '38.00506489693477%', top: '49.27785134456284%' },
  14: { left: '46.797322466093846%', top: '49.5030976871281%' },
  15: { left: '55.7586619115829%', top: '49.428015572939685%' },
  16: { left: '64.84681276431942%', top: '49.428015572939685%' },
  17: { left: '74.35766830788091%', top: '49.65326191550494%' },
  18: { left: '81.92408227364763%', top: '49.72834402969336%' },
  19: { left: '15.559445814129646%', top: '73.07888154229221%' },
  20: { left: '25.57754698668109%', top: '73.15396365648063%' },
  21: { left: '35.76473003556251%', top: '73.30412788485748%' },
  22: { left: '46.76470420335822%', top: '73.38278967338982%' },
  23: { left: '59.77435647441997%', top: '73.45429211323432%' },
  24: { left: '70.59559655953882%', top: '73.60445634161115%' },
  25: { left: '81.58591852098766%', top: '74.05494902674168%' },
  101: { left: '88.68735732684691%', top: '3.02726900449567%' },
  102: { left: '20.7164430421941%', top: '2.5016942051767246%' },
  103: { left: '39.569072252987105%', top: '2.3515299767998834%' },
  104: { left: '31.24178984373549%', top: '40.793572441271294%' },
  105: { left: '61.2960933613898%', top: '40.86865455545971%' },
}

export const buttonPositions = {
  // 蓝色按钮位置 - 5x5网格
  blue: {
    layout: 'grid',
    cols: 5,
    rows: 5,
    spacingX: 15, // 横向间距（百分比）
    spacingY: 12, // 纵向间距（百分比）
    startX: 15,    // 起始X位置（百分比）
    startY: 20     // 起始Y位置（百分比）
  },

  // 红色按钮位置 - 右侧边缘
  red: {
    layout: 'vertical',
    spacingY: 18,     // 纵向间距（百分比）
    startX: 90,        // X位置（百分比）
    startY: 10         // 起始Y位置（百分比）
  }
}

// 统一的特征描述
export const buttonFeatures = [
  '专业的技术团队和设备',
  '严格的质量控制标准',
  '实时的监控系统',
  '完善的应急预案',
  '持续的技术改进和优化',
]
