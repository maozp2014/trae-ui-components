import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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

// 演示页面容器
const DemoContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 页面标题
const PageTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
  color: var(--color-text-primary);
  text-align: center;
`;

// 组件展示容器
const ComponentShowcase = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  width: 100%;
`;

// 演示说明
const DemoDescription = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  color: #666;
`;

/**
 * WatchlistDemo组件
 * 专门用于独立展示Watchlist组件的演示页面
 */
const WatchlistDemo: React.FC = () => {
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
    <DemoContainer>
      <PageTitle>Watchlist 组件演示</PageTitle>
      <ComponentShowcase>
        <DemoDescription>
          这是一个独立的Watchlist组件演示页面，展示了如何从API获取股票观察列表数据并进行显示。
          组件会自动处理数据加载、错误状态和空数据情况。
        </DemoDescription>
        
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
              <h2 style={{ margin: 0, fontSize: '18px' }}>{watchlistData.watchlist_name}</h2>
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
                刷新数据
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
      </ComponentShowcase>
    </DemoContainer>
  );
};

export default WatchlistDemo;