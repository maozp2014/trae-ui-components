// TVWatchlist组件的类型定义

/**
 * 股票项数据类型
 */
export interface StockItem {
  symbol: string;         // 股票代码
  name: string;           // 股票名称
  price: number;          // 当前价格
  change: number;         // 价格变动绝对值
  changePercent: number;  // 价格变动百分比
  volume?: number;        // 交易量
  open?: number;          // 开盘价
  high?: number;          // 最高价
  low?: number;           // 最低价
  prevClose?: number;     // 昨收价
  marketCap?: number;     // 市值
  peRatio?: number;       // 市盈率
  sector?: string;        // 行业
  exchange?: string;      // 交易所
}

/**
 * 观察列表数据类型
 */
export interface WatchlistData {
  id: string;           // 观察列表ID
  name: string;         // 观察列表名称
  lastUpdated: string;  // 最后更新时间
  stocks: StockItem[];  // 股票数组
}

/**
 * TVWatchlist组件Props类型
 */
export interface TVWatchlistProps {
  watchlist: WatchlistData;                  // 观察列表数据
  onStockClick?: (stock: StockItem) => void; // 股票点击事件处理
  onRefresh?: () => void;                    // 刷新事件处理
  onRemoveStock?: (symbol: string) => void;  // 移除股票事件处理
  onAddStock?: () => void;                   // 添加股票事件处理
  onRenameWatchlist?: () => void;           // 重命名观察列表事件处理
  showActions?: boolean;                     // 是否显示操作按钮
  isLoading?: boolean;                       // 是否加载中
  error?: string | null;                     // 错误信息
  autoRefresh?: boolean;                     // 是否自动刷新
  refreshInterval?: number;                  // 自动刷新间隔(秒)
}

/**
 * 表格列配置类型
 */
export interface ColumnConfig {
  key: keyof StockItem;   // 列的key
  title: string;          // 列标题
  visible: boolean;       // 是否显示
  width?: string;         // 列宽度
  align?: 'left' | 'right' | 'center'; // 对齐方式
  format?: (value: any) => React.ReactNode; // 格式化函数
}

/**
 * 排序配置类型
 */
export interface SortConfig {
  column: keyof StockItem | null; // 排序列
  direction: 'asc' | 'desc' | null; // 排序方向
}