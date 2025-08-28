# Trae UI Components
本项目是用ai agent开发的实验性项目，仅供学习交流使用。

# React 金融组件库

基于React的金融领域通用UI组件库，提供简洁、美观、易用的界面组件。
本组件库由Trae Builder创建，主要用于测试多个不同的大模型和AI编程IDE的自动编程效果对比，同时提供完整的金融数据展示功能。

## 最近功能更新
- **新增TVWatchlist组件**：实现美股TradingView风格的股票观察列表，支持实时数据展示、列排序、自动刷新功能
- **新增Watchlist组件**：股票观察列表基础组件，支持股票列表展示、添加删除操作
- **新增StockItemCard组件**：单支股票信息卡片组件，展示股票基本信息和价格走势
- **新增MarketIndexTicker组件**：市场指数滚动展示组件，实时显示主要市场指数
- **新增StockDetailPanel组件**：股票详情面板，展示股票详细财务数据
- **新增Table组件**：实现了版本管理表格功能，支持状态显示、行操作和自定义主题
- **新增Menu组件**：实现多级子菜单嵌套功能，支持圆弧折角样式、不跳转展开/折叠交互、完整的选中状态显示

## 组件列表
- **Button** - 按钮组件
- **Card** - 卡片组件
- **Input** - 输入框组件
- **Menu** - 菜单组件（支持多级子菜单、圆弧折角样式、不跳转展开/折叠交互）
- **Table** - 表格组件（版本管理表格）
- **Watchlist** - 基础股票观察列表组件
- **TVWatchlist** - 美股TradingView风格观察列表组件（支持排序、自动刷新）
- **StockItemCard** - 股票信息卡片组件
- **MarketIndexTicker** - 市场指数滚动展示组件
- **StockDetailPanel** - 股票详情信息面板
- **SectionHeader** - 区块标题组件
- **TradeIdeaCard** - 交易建议卡片组件

## 核心功能特性

### TVWatchlist组件主要功能
- 完整的股票列表展示，包含股票代码、名称、价格、涨跌幅等关键信息
- 支持点击列标题进行排序功能
- 自动刷新机制，可自定义刷新间隔
- 响应式设计，适配不同屏幕尺寸
- 加载状态和错误处理
- 股票点击、添加、删除、重命名等交互操作
- 深色主题支持，符合金融终端使用习惯

### 组件演示
- 提供独立的组件演示页面：
  - TVWatchlist组件演示：`tvwatchlist-demo.html`
  - Watchlist组件演示：`watchlist-demo.html`
- 完整的Storybook文档支持，可查看每个组件的详细使用方法

## 使用方法

### 安装依赖
```bash
npm install --legacy-peer-deps
```

### 开发模式
```bash
npm run dev
```

### 构建项目
```bash
npm run build
```

### Storybook预览
```bash
npm run storybook
```

## 项目技术栈
- React 18+
- TypeScript
- Styled-components（样式管理）
- Storybook（组件文档）
- Vite（构建工具）
