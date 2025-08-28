import React, { useState, useEffect } from 'react';
import Watchlist from './Watchlist';
import { transformWatchlistData, ApiWatchlistData } from './validateWatchlistData';

// API接口地址
// 使用代理地址以避免CORS问题
const WATCHLIST_API_URL = '/api/342161507';

/**
 * 从API获取观察列表数据
 * @returns Promise<ApiWatchlistData>
 */
export const fetchWatchlistData = async (): Promise<ApiWatchlistData> => {
  try {
    const response = await fetch(WATCHLIST_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP错误! 状态码: ${response.status}`);
    }
    const data = await response.json();
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
};

// Watchlist组件包装器，用于从API获取数据并处理
const WatchlistWithApiData: React.FC = () => {
  const [watchlistData, setWatchlistData] = useState<ApiWatchlistData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 组件挂载时获取数据
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchWatchlistData();
        setWatchlistData(data);
      } catch (err) {
        setError('获取数据失败，请稍后重试');
        console.error('获取数据时发生错误:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 处理刷新数据
  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWatchlistData();
      setWatchlistData(data);
    } catch (err) {
      setError('刷新数据失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 转换数据
  const transformedStocks = watchlistData ? transformWatchlistData(watchlistData) : [];

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      {loading ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: '#666' }}>加载中...</div>
      ) : error ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: '#ff4d4f' }}>
          {error}
          <button 
            onClick={handleRefresh}
            style={{
              marginTop: '16px',
              padding: '6px 12px',
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            重试
          </button>
        </div>
      ) : watchlistData ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '18px' }}>{watchlistData.watchlist_name} 的观察列表</h2>
            <button 
              onClick={handleRefresh}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              刷新
            </button>
          </div>
          <p style={{ marginBottom: '20px', fontSize: '12px', color: '#666' }}>最近更新: {watchlistData.last_updated}</p>
          {transformedStocks.length > 0 ? (
            <Watchlist stocks={transformedStocks} />
          ) : (
            <div style={{ padding: '40px 0', textAlign: 'center', color: '#666' }}>观察列表为空</div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default WatchlistWithApiData;

// 如果你想在App中使用这个演示组件，可以这样导入:
// import WatchlistWithApiData from './components/Watchlist/demo';
// 然后在App中使用 <WatchlistWithApiData />