import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TVWatchlist from './TVWatchlist';
import { WatchlistData, StockItem } from './types';

// 模拟API获取观察列表数据
const fetchWatchlistData = async (): Promise<WatchlistData> => {
  // 在实际应用中，这里应该是一个真实的API调用
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 模拟数据
  return {
    id: 'demo-watchlist',
    name: '热门美股',
    lastUpdated: new Date().toISOString(),
    stocks: [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 189.45,
        change: 2.34,
        changePercent: 1.25,
        volume: 56789000,
        marketCap: 2987000000000,
        peRatio: 32.5,
        sector: 'Technology'
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 401.23,
        change: -5.67,
        changePercent: -1.39,
        volume: 24560000,
        marketCap: 3210000000000,
        peRatio: 34.2,
        sector: 'Technology'
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 137.45,
        change: 1.12,
        changePercent: 0.82,
        volume: 18900000,
        marketCap: 1890000000000,
        peRatio: 28.3,
        sector: 'Technology'
      },
      {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        price: 178.65,
        change: 3.45,
        changePercent: 1.97,
        volume: 32100000,
        marketCap: 1820000000000,
        peRatio: 43.7,
        sector: 'Consumer Cyclical'
      },
      {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        price: 175.89,
        change: -8.76,
        changePercent: -4.76,
        volume: 123450000,
        marketCap: 552000000000,
        peRatio: 68.4,
        sector: 'Automotive'
      },
    ]
  };
};

// 示例页面容器
const DemoContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  min-height: 100vh;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
  color: var(--color-text-primary);
`;

const ComponentControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  border: 1px solid var(--color-border);
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ControlLabel = styled.label`
  font-size: 14px;
  color: var(--color-text-secondary);
  white-space: nowrap;
`;

const ControlSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-gray-400);
    transition: .4s;
    border-radius: 22px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: var(--color-primary);
  }

  input:checked + span:before {
    transform: translateX(22px);
  }
`;

const RefreshIntervalSelect = styled.select`
  padding: 4px 8px;
  background-color: var(--color-background-tertiary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 14px;
`;

const MessageLog = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  max-height: 200px;
  overflow-y: auto;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-secondary);
`;

/**
 * TVWatchlist组件的演示示例
 * 展示如何在实际应用中使用该组件
 */
const TVWatchlistDemo: React.FC = () => {
  const [watchlist, setWatchlist] = useState<WatchlistData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showActions, setShowActions] = useState<boolean>(true);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [refreshInterval, setRefreshInterval] = useState<number>(30);
  const [messageLog, setMessageLog] = useState<string[]>([]);

  // 添加日志消息
  const addLogMessage = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setMessageLog(prev => [
      `${timestamp}: ${message}`,
      ...prev.slice(0, 49) // 只保留最近50条消息
    ]);
  };

  // 加载数据
  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    addLogMessage('开始加载观察列表数据...');
    
    try {
      const data = await fetchWatchlistData();
      setWatchlist(data);
      addLogMessage(`成功加载观察列表: ${data.name} (${data.stocks.length} 只股票)`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知错误';
      setError(`获取数据失败: ${errorMessage}`);
      addLogMessage(`加载失败: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 组件挂载时加载数据
  useEffect(() => {
    loadData();
  }, []);

  // 股票点击处理
  const handleStockClick = (stock: StockItem) => {
    addLogMessage(`点击股票: ${stock.symbol} - ${stock.name}`);
    // 在实际应用中，这里可以导航到股票详情页或显示股票详情弹窗
  };

  // 刷新数据处理
  const handleRefresh = () => {
    loadData();
  };

  // 移除股票处理
  const handleRemoveStock = (symbol: string) => {
    if (!watchlist) return;
    
    const updatedStocks = watchlist.stocks.filter(stock => stock.symbol !== symbol);
    setWatchlist(prev => prev ? {
      ...prev,
      stocks: updatedStocks
    } : null);
    
    addLogMessage(`移除股票: ${symbol}`);
  };

  // 添加股票处理
  const handleAddStock = () => {
    if (!watchlist) return;
    
    // 模拟新股票数据
    const newStock: StockItem = {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      price: 476.32,
      change: 12.45,
      changePercent: 2.69,
      volume: 14320000,
      marketCap: 987000000000,
      peRatio: 38.2,
      sector: 'Technology'
    };
    
    setWatchlist(prev => prev ? {
      ...prev,
      stocks: [...prev.stocks, newStock]
    } : null);
    
    addLogMessage(`添加股票: ${newStock.symbol} - ${newStock.name}`);
  };

  // 重命名观察列表处理
  const handleRenameWatchlist = () => {
    if (!watchlist) return;
    
    const newName = prompt('请输入新的观察列表名称:', watchlist.name);
    if (newName && newName.trim()) {
      setWatchlist(prev => prev ? {
        ...prev,
        name: newName.trim()
      } : null);
      
      addLogMessage(`重命名观察列表: ${watchlist.name} -> ${newName.trim()}`);
    }
  };

  // 初始加载状态显示
  if (!watchlist && isLoading) {
    return (
      <DemoContainer>
        <PageTitle>TVWatchlist 组件演示</PageTitle>
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
          加载中...
        </div>
      </DemoContainer>
    );
  }

  // 错误状态显示
  if (error) {
    return (
      <DemoContainer>
        <PageTitle>TVWatchlist 组件演示</PageTitle>
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--color-danger)' }}>
          {error}
          <button 
            onClick={handleRefresh}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            重试
          </button>
        </div>
      </DemoContainer>
    );
  }

  return (
    <DemoContainer>
      <PageTitle>TVWatchlist 组件演示</PageTitle>
      
      <ComponentControls>
        <ControlGroup>
          <ControlLabel>显示操作按钮:</ControlLabel>
          <ControlSwitch>
            <input 
              type="checkbox" 
              checked={showActions} 
              onChange={(e) => setShowActions(e.target.checked)}
            />
            <span></span>
          </ControlSwitch>
        </ControlGroup>
        
        <ControlGroup>
          <ControlLabel>自动刷新:</ControlLabel>
          <ControlSwitch>
            <input 
              type="checkbox" 
              checked={autoRefresh} 
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            <span></span>
          </ControlSwitch>
        </ControlGroup>
        
        {autoRefresh && (
          <ControlGroup>
            <ControlLabel>刷新间隔(秒):</ControlLabel>
            <RefreshIntervalSelect 
              value={refreshInterval} 
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="60">60</option>
            </RefreshIntervalSelect>
          </ControlGroup>
        )}
        
        <ControlGroup style={{ marginLeft: 'auto' }}>
          <button 
            onClick={handleRefresh}
            style={{
              padding: '6px 12px',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            立即刷新
          </button>
        </ControlGroup>
      </ComponentControls>

      {watchlist && (
        <TVWatchlist
          watchlist={watchlist}
          onStockClick={handleStockClick}
          onRefresh={handleRefresh}
          onRemoveStock={handleRemoveStock}
          onAddStock={handleAddStock}
          onRenameWatchlist={handleRenameWatchlist}
          showActions={showActions}
          isLoading={isLoading}
          error={error}
          autoRefresh={autoRefresh}
          refreshInterval={refreshInterval}
        />
      )}

      <MessageLog>
        {messageLog.map((message, index) => (
          <div key={index} style={{ marginBottom: '4px' }}>{message}</div>
        ))}
      </MessageLog>
    </DemoContainer>
  );
};

export default TVWatchlistDemo;

// 使用示例:
// import TVWatchlistDemo from './components/TVWatchlist/demo';
// 在App中使用 <TVWatchlistDemo />