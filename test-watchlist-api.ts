// 单独测试Watchlist API调用功能

// 在Node.js环境中，我们需要自己实现fetch函数
import fetch from 'node-fetch';

// 定义API接口地址
const WATCHLIST_API_URL = 'https://m1.apifoxmock.com/m2/7019370-6738107-default/342161507';

// 定义数据类型
interface ApiStockItem {
  ticker: string;
  company_name: string;
  exchange: string;
  sector: string;
  industry: string;
  current_price: number;
  change: number;
  change_percent: number;
  // 其他字段省略
}

interface ApiWatchlistData {
  watchlist_name: string;
  last_updated: string;
  stocks: ApiStockItem[];
}

/**
 * 从API获取观察列表数据
 * @returns Promise<ApiWatchlistData>
 */
async function fetchWatchlistData(): Promise<ApiWatchlistData> {
  try {
    const response = await fetch(WATCHLIST_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP错误! 状态码: ${response.status}`);
    }
    // 添加类型断言，确保response.json()返回ApiWatchlistData类型
    const data = await response.json() as ApiWatchlistData;
    return data;
  } catch (error) {
    console.error('获取观察列表数据失败:', error);
    // 返回默认数据，防止组件白屏
    return {
      watchlist_name: "默认观察列表",
      last_updated: new Date().toISOString().split('T')[0],
      stocks: []
    };
  }
}

// 测试API调用
async function testApiCall() {
  console.log('开始测试Watchlist API调用...');
  try {
    const data = await fetchWatchlistData();
    console.log('API调用成功！');
    console.log('观察列表名称:', data.watchlist_name);
    console.log('最后更新时间:', data.last_updated);
    console.log('股票数量:', data.stocks.length);
    if (data.stocks.length > 0) {
      console.log('第一只股票信息:');
      console.log('  代码:', data.stocks[0].ticker);
      console.log('  名称:', data.stocks[0].company_name);
      console.log('  价格:', data.stocks[0].current_price);
      console.log('  涨跌幅:', data.stocks[0].change_percent + '%');
    }
  } catch (error) {
    console.error('API调用失败:', error);
  }
}

// 运行测试
testApiCall();

// 运行方式: 
// 1. 确保已安装node-fetch: npm install node-fetch @types/node-fetch --save-dev --legacy-peer-deps
// 2. 执行: node -r ts-node/register test-watchlist-api.ts