# 按钮配置说明

## 📁 文件位置
所有按钮配置都在 `src/config/buttons.js` 文件中。

## 🔧 配置结构

### 1. 按钮定义 (`buttonConfig`)
```javascript
export const buttonConfig = {
  // 蓝色系按钮 - 25个
  blueButtons: [
    { id: 1, text: '地质勘探', category: 'exploration' },
    { id: 2, text: '矿山测量', category: 'exploration' },
    // ... 更多按钮
  ],

  // 红色系按钮 - 5个
  redButtons: [
    { id: 101, text: '安全监管', category: 'safety' },
    { id: 102, text: '应急指挥', category: 'emergency' },
    // ... 更多按钮
  ]
}
```

#### 按钮属性说明：
- `id`: 唯一标识符（数字）
- `text`: 按钮显示的文字
- `category`: 分类（用于描述和统计数据）

### 2. 按钮描述 (`buttonDescriptions`)
```javascript
export const buttonDescriptions = {
  exploration: '地质勘探阶段',
  planning: '规划设计阶段',
  // ... 更多分类描述
}
```

### 3. 按钮统计数据 (`buttonStats`)
```javascript
export const buttonStats = {
  exploration: {
    '勘探面积': '50平方公里',
    '钻孔数量': '200个',
    // ... 更多统计数据
  },
  // ... 更多分类统计
}
```

### 4. 按钮位置配置 (`buttonPositions`)
```javascript
export const buttonPositions = {
  // 蓝色按钮位置 - 5x5网格
  blue: {
    layout: 'grid',           // 网格布局
    cols: 5,                 // 列数
    rows: 5,                 // 行数
    spacingX: 15,            // 横向间距（百分比）
    spacingY: 12,            // 纵向间距（百分比）
    startX: 15,              // 起始X位置（百分比）
    startY: 20               // 起始Y位置（百分比）
  },

  // 红色按钮位置 - 右侧边缘
  red: {
    layout: 'vertical',      // 垂直布局
    spacingY: 18,            // 纵向间距（百分比）
    startX: 90,              // X位置（百分比）
    startY: 10               // 起始Y位置（百分比）
  }
}
```

### 5. 统一特征描述 (`buttonFeatures`)
```javascript
export const buttonFeatures = [
  '专业的技术团队和设备',
  '严格的质量控制标准',
  '实时的监控系统',
  '完善的应急预案',
  '持续的技术改进和优化'
]
```

## 💾 按钮位置持久化功能

### 📍 功能说明
现在按钮位置支持持久化保存，修改后的位置会自动保存到浏览器本地存储中，即使刷新页面也会保持固定位置。

### 🎯 使用方法

1. **调整按钮位置**
   - 点击右上角 "🎯 调整按钮位置" 进入编辑模式
   - 拖拽按钮到想要的位置
   - 点击 "💾 保存" 保存位置到本地存储

2. **重置按钮位置**
   - 在编辑模式下，点击 "🔄 重置" 按钮
   - 确认重置操作
   - 所有按钮将恢复到默认位置

3. **取消修改**
   - 点击 "❌ 取消" 按钮
   - 按钮将恢复到编辑前的位置

### 🔧 技术实现
- 使用 `localStorage` 存储按钮位置
- 页面加载时自动读取保存的位置
- 支持跨浏览器、跨会话保持位置

## 🔄 如何修改按钮

### 添加新按钮
1. 在对应的按钮数组中添加新配置：
```javascript
// 添加蓝色按钮
blueButtons: [
  // ... 现有按钮
  { id: 26, text: '新按钮名称', category: 'new_category' }
]

// 添加红色按钮
redButtons: [
  // ... 现有按钮
  { id: 106, text: '新红色按钮', category: 'safety' }
]
```

### 修改按钮文字
```javascript
{ id: 1, text: '修改后的文字', category: 'exploration' }
```

### 删除按钮
直接从对应数组中移除该按钮配置。

### 修改按钮位置
```javascript
blue: {
  spacingX: 18,    // 增加横向间距
  spacingY: 15,    // 增加纵向间距
  startX: 10,      // 调整起始位置
  startY: 15       // 调整起始位置
}
```

### 修改描述和统计数据
```javascript
// 添加新分类描述
buttonDescriptions: {
  // ... 现有描述
  new_category: '新分类的描述'
}

// 添加新分类统计
buttonStats: {
  // ... 现有统计
  new_category: {
    '统计项1': '数值1',
    '统计项2': '数值2'
  }
}
```

## 💡 使用技巧

### 1. 按钮ID规则
- 蓝色按钮：1-99
- 红色按钮：100-199

### 2. 分类命名
- 使用小写英文和下划线
- 与功能相关的描述性名称
- 例如：`exploration`, `safety`, `emergency`

### 3. 位置调整
- `spacingX/Y`：控制按钮之间的间距
- `startX/Y`：控制按钮组的起始位置
- 数值越大，间距/位置越远

### 4. 布局模式
- `grid`：网格布局，适用于多行多列
- `vertical`：垂直布局，适用于单列排列

## 🎨 颜色配置

按钮颜色在 `App.vue` 的CSS中定义：
- `.blue-button`：蓝色按钮样式
- `.red-button`：红色按钮样式

## 📝 注意事项

1. **修改后保存文件**：保存 `buttons.js` 文件后，页面会自动重新加载
2. **ID唯一性**：确保每个按钮的ID是唯一的
3. **分类匹配**：按钮的 `category` 必须在 `buttonDescriptions` 和 `buttonStats` 中有对应定义
4. **位置合理**：调整位置时注意不要让按钮重叠或超出屏幕范围

## 🚀 快速开始

1. 打开 `src/config/buttons.js`
2. 找到对应的配置部分
3. 修改所需的配置
4. 保存文件
5. 查看页面效果

现在您可以轻松地修改按钮配置，无需深入理解复杂的代码逻辑！