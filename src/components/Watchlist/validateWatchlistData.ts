// 验证并转换Watchlist数据的工具函数
import { StockItem } from './Watchlist';

// 用户接口数据类型
export interface ApiWatchlistData {
  watchlist_name: string;
  last_updated: string;
  stocks: ApiStockItem[];
}

export interface ApiStockItem {
  ticker: string;
  company_name: string;
  exchange: string;
  sector: string;
  industry: string;
  current_price: number;
  change: number;
  change_percent: number;
  open: number;
  high: number;
  low: number;
  previous_close: number;
  volume: number;
  volume_avg: number;
  market_cap: number;
  pe_ratio: number;
  eps: number;
  '52_week_high': number;
  '52_week_low': number;
  dividend_yield: number;
  beta: number;
}

/**
 * 将API数据转换为Watchlist组件所需的StockItem数组
 * @param apiData 用户提供的接口数据
 * @returns 转换后的StockItem数组
 */
export const transformWatchlistData = (apiData: ApiWatchlistData): StockItem[] => {
  if (!apiData || !apiData.stocks || !Array.isArray(apiData.stocks)) {
    return [];
  }

  return apiData.stocks.map(stock => ({
    symbol: stock.ticker || '',
    name: stock.company_name || '',
    price: stock.current_price || 0,
    change: stock.change || 0,
    changePercent: stock.change_percent || 0
  }));
};

/**
 * 验证API数据是否可以用于Watchlist组件
 * @param apiData 用户提供的接口数据
 * @returns 验证结果对象
 */
export const validateWatchlistData = (apiData: ApiWatchlistData): {
  isValid: boolean;
  missingFields: string[];
  conversionExample: StockItem[] | null;
} => {
  const missingFields: string[] = [];
  
  if (!apiData) {
    missingFields.push('完整数据对象');
    return { isValid: false, missingFields, conversionExample: null };
  }

  if (!apiData.watchlist_name) {
    missingFields.push('watchlist_name');
  }

  if (!apiData.last_updated) {
    missingFields.push('last_updated');
  }

  if (!apiData.stocks || !Array.isArray(apiData.stocks)) {
    missingFields.push('stocks数组');
    return { isValid: false, missingFields, conversionExample: null };
  }

  // 验证股票数据的必要字段
  const requiredStockFields = ['ticker', 'company_name', 'current_price', 'change', 'change_percent'];
  
  apiData.stocks.forEach((stock, index) => {
    if (!stock) {
      missingFields.push(`stocks[${index}] 为空对象`);
      return;
    }
    
    requiredStockFields.forEach(field => {
      if (!(field in stock) || stock[field as keyof ApiStockItem] === undefined) {
        missingFields.push(`stocks[${index}].${field}`);
      }
    });
  });

  // 转换示例
  const conversionExample = transformWatchlistData(apiData);
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
    conversionExample
  };
};

// 测试示例数据
const sampleApiData: ApiWatchlistData = {
  watchlist_name: "许国秀",
  last_updated: "2025-09-26",
  stocks: [
    {
      ticker: "quis consequat pariatur laboris",
      company_name: "栗丹",
      exchange: "commodo",
      sector: "deserunt Excepteur",
      industry: "eiusmod",
      current_price: 718.89,
      change: 24,
      change_percent: 15,
      open: 36,
      high: 89,
      low: 24,
      previous_close: 32,
      volume: 1,
      volume_avg: 70,
      market_cap: 14,
      pe_ratio: 19,
      eps: 61,
      '52_week_high': 68,
      '52_week_low': 13,
      dividend_yield: 77,
      beta: 74
    }
  ]
};

// 运行验证测试
const validationResult = validateWatchlistData(sampleApiData);
console.log('验证结果:', validationResult.isValid);
console.log('缺失字段:', validationResult.missingFields);
console.log('转换示例:', validationResult.conversionExample);

// 导出用于验证的函数，便于在其他地方使用
export default { transformWatchlistData, validateWatchlistData };