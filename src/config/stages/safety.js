/**
 * 安全红线配置文件
 * 统一管理所有安全红线相关数据
 */

export const safetyData = {
  // 安全红线项目
  safetyItems: [
    {
      id: 'tailings-safety',
      title: '尾矿库安全红线',
      icon: '⚠️',
      type: 'safety',
      level: 'critical',
      category: 'tailings',
      description: '尾矿库是矿山重大危险源，必须确保安全运行。',
      longDescription: `**尾矿库安全红线：**

1. 严禁擅自改变尾矿库设计参数
2. 严禁超设计能力储存尾矿
3. 严禁排水井、斜槽堵塞
4. 严禁坝体出现裂缝时未处理
5. 严禁安全监测系统不正常运行

**安全监测要求：**
- 坝体位移监测：每日
- 库水位监测：实时
- 排渗设施监测：每周
- 坝坡稳定监测：每月
- 防洪能力评估：每年汛前

**应急管理：**
- 制定专项应急预案
- 储备应急物资设备
- 定期组织应急演练
- 建立24小时值班制度`,
      images: [
        {
          src: '/weikuang.png',
          alt: '尾矿库安全监测',
          caption: '尾矿库安全监测系统'
        },
        {
          src: '/weikuang2.png',
          alt: '尾矿库坝体',
          caption: '尾矿库坝体安全巡查'
        }
      ],
      features: [
        '三级坝体监测网',
        '自动化监测系统',
        '预警预报机制',
        '应急预案完备',
        '专业管理团队'
      ],
      stats: {
        '安全等级': '特别重要',
        '监测频次': '24小时',
        '预警阈值': '立即启动'
      }
    },
    {
      id: 'slope-safety',
      title: '边坡安全红线',
      icon: '⛰️',
      type: 'safety',
      level: 'critical',
      category: 'slope',
      description: '露天矿边坡失稳是重大安全隐患，必须严密监控。',
      longDescription: `**边坡安全红线：**

1. 严禁边坡角度超过设计值
2. 严禁在危险边坡下作业
3. 严禁边坡出现裂缝时继续作业
4. 严禁破坏边坡排水系统
5. 严禁在坡顶堆载重物

**监测手段：**
- 地表位移监测：GPS、全站仪
- 深部位移监测：测斜仪
- 地下水监测：水位观测孔
- 视频监控：重要边坡区域
- 人工巡查：每日定时

**预警标准：**
- 累计位移：超过允许值
- 位移速率：>2mm/天
- 裂缝开展：出现新裂缝
- 地下水变化：异常升高`,
      images: [
        {
          src: '/bianpo.png',
          alt: '边坡监测',
          caption: '露天矿边坡安全监测'
        },
        {
          src: '/bianpo2.png',
          alt: '边坡巡查',
          caption: '边坡稳定性分析评估'
        }
      ],
      features: [
        '自动化监测系统',
        '多参数预警模型',
        '边坡稳定性分析',
        '危险源识别技术',
        '应急撤离预案'
      ],
      stats: {
        '安全等级': '特别重要',
        '监测频次': '实时监测',
        '预警阈值': '立即撤离'
      }
    },
    {
      id: 'blasting-safety',
      title: '爆破作业安全红线',
      icon: '💥',
      type: 'safety',
      level: 'critical',
      category: 'blasting',
      description: '爆破作业是高风险工序，必须严格执行安全规程。',
      longDescription: `**爆破作业安全红线：**

1. 严禁无证人员从事爆破作业
2. 严禁违规储存运输爆炸物品
3. 严禁在安全距离内有人时起爆
4. 严禁未处理盲爆就恢复作业
5. 严禁违规销毁爆炸物品

**爆破安全措施：**
- 爆破设计：必须经过审批
- 爆破警戒：设立警戒线和警戒哨
- 安全距离：人员≥200米，设备≥100米
- 信号规定：预警信号、起爆信号、解除信号
- 爆后检查：专业人员检查确认安全

**爆炸物品管理：**
- 专人专管：爆破员、保管员、安全员
- 储存安全：专用库房，双人双锁
- 使用登记：领用、退库登记
- 定期检查：数量、质量、安全设施`,
      images: [
        {
          src: '/baopoanquan.png',
          alt: '爆破安全管理',
          caption: '爆破作业安全警戒'
        },
        {
          src: '/baopoanquan2.png',
          alt: '爆破安全培训',
          caption: '爆破安全操作规范'
        }
      ],
      features: [
        '爆破资质管理严格',
        '爆炸物品管理规范',
        '警戒体系完善',
        '盲爆处理程序明确',
        '人员培训全覆盖'
      ],
      stats: {
        '安全等级': '特别重要',
        '安全距离': '≥200米',
        '爆破资质': '必须持证',
        '应急响应': '即时启动'
      }
    },
    {
      id: 'underground-safety',
      title: '井下作业安全红线',
      icon: '🏔️',
      type: 'safety',
      level: 'critical',
      category: 'underground',
      description: '井下作业环境复杂，必须建立完善的安全保障体系。',
      longDescription: `**井下作业安全红线：**

1. 严禁瓦斯超限作业
2. 严禁通风系统不正常运行时作业
3. 严禁在有突水威胁区域探放水不达标作业
4. 严禁顶板不支护时作业
5. 严禁提升系统带病运行

**瓦斯防治：**
- 瓦斯监测：实时在线监测
- 通风保障：有效稀释瓦斯
- 火源管理：杜绝引爆火源
- 预防措施：抽放、注水等

**顶板管理：**
- 敲帮问顶：作业前检查
- 及时支护：紧跟工作面
- 监测预警：地压监测预报
- 危险区域：严禁人员进入

**水害防治：**
- 探放水：有掘必探
- 预警预报：水害监测预警
- 防水设施：防水闸门、水仓
- 应急撤离：明确的避灾路线`,
      images: [
        {
          src: '/jianceanquan.png',
          alt: '井下安全监测',
          caption: '井下安全监测系统'
        },
        {
          src: '/jianceanquan2.png',
          alt: '安全监控中心',
          caption: '安全监测监控指挥中心'
        }
      ],
      features: [
        '安全监测系统全覆盖',
        '预警机制完善',
        '应急撤离路线明确',
        '安全培训到位',
        '隐患排查闭环管理'
      ],
      stats: {
        '安全等级': '特别重要',
        '监测覆盖率': '100%',
        '预警响应': '每月一次'
      }
    },
    {
      id: 'hoisting-safety',
      title: '提升系统安全红线',
      icon: '🔼',
      type: 'safety',
      level: 'critical',
      category: 'hoisting',
      description: '提升系统是矿井的咽喉，必须确保安全可靠运行。',
      longDescription: `**提升系统安全红线：**

1. 严禁提升机超载运行
2. 严禁钢丝绳断丝超限使用
3. 严禁防坠器失效时运行
4. 严禁操作人员无证上岗
5. 严禁检修时未执行挂牌制度

**钢丝绳管理：**
- 每日检查：断丝、磨损、锈蚀
- 定期检验：拉力试验、疲劳试验
- 使用期限：不超过设计寿命
- 更换标准：达到报废条件立即更换

**防坠器管理：**
- 定期试验：每季度一次
- 动作试验：空载、重载试验
- 灵敏可靠：不卡阻、不失效
- 维护保养：定期检查调整

**操作管理：**
- 持证上岗：培训合格后上岗
- 操作规程：严格执行操作规程
- 信号联系：清晰准确的信号系统
- 检修制度：停电挂牌制度`,
      images: [
        {
          src: '/tishenganquan.png',
          alt: '提升系统安全',
          caption: '提升机安全保护装置'
        },
        {
          src: '/tishenganquan2.png',
          alt: '提升安全检查',
          caption: '提升系统安全检查维护'
        }
      ],
      features: [
        '钢丝绳每日检查',
        '防坠器定期试验',
        '提升系统实时监控',
        '操作人员持证上岗',
        '检修制度完善'
      ],
      stats: {
        '安全等级': '特别重要',
        '检查频次': '每日',
        '防坠器试验': '每季度',
        '操作要求': '持证上岗'
      }
    }
  ],

  // 安全统计数据
  safetyStats: {
    totalItems: 5,
    criticalLevel: 5,
    highLevel: 0,
    mediumLevel: 0,
    lowLevel: 0,
    categoryCounts: {
      tailings: 1,
      slope: 1,
      blasting: 1,
      underground: 1,
      hoisting: 1
    }
  },

  // 安全检查配置
  inspectionConfig: {
    daily: {
      items: ['slope', 'underground', 'hoisting'],
      frequency: '每日',
      responsible: '安全员、班组长'
    },
    weekly: {
      items: ['blasting', 'tailings'],
      frequency: '每周',
      responsible: '安全科、技术科'
    },
    monthly: {
      items: ['tailings', 'auxiliary'],
      frequency: '每月',
      responsible: '总工程师、安全总监'
    }
  },

  // 应急响应配置
  emergencyConfig: {
    responseLevels: [
      {
        level: 1,
        name: '特别重大',
        trigger: '系统失效、人员伤亡',
        responseTime: '立即',
        notification: ['矿山主要负责人', '应急管理部门', '政府部门']
      },
      {
        level: 2,
        name: '重大',
        trigger: '严重故障、重大隐患',
        responseTime: '5分钟内',
        notification: ['安全总监', '技术负责人', '应急队伍']
      },
      {
        level: 3,
        name: '较大',
        trigger: '一般故障、异常情况',
        responseTime: '15分钟内',
        notification: ['班组长', '安全员', '维修人员']
      },
      {
        level: 4,
        name: '一般',
        trigger: '轻微问题、参数超限',
        responseTime: '30分钟内',
        notification: ['操作人员', '班组长']
      }
    ]
  }
}

export default safetyData
