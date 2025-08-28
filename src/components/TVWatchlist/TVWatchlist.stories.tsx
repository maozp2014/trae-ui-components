import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import TVWatchlist from './TVWatchlist';
import { WatchlistData, StockItem } from './types';

// 模拟数据
const mockStockData: StockItem[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 189.45,
    change: 2.34,
    changePercent: 1.25,
    volume: 56789000,
    open: 187.11,
    high: 189.90,
    low: 186.75,
    prevClose: 187.11,
    marketCap: 2987000000000,
    peRatio: 32.5,
    sector: 'Technology',
    exchange: 'NASDAQ'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 401.23,
    change: -5.67,
    changePercent: -1.39,
    volume: 24560000,
    open: 406.90,
    high: 407.25,
    low: 399.80,
    prevClose: 406.90,
    marketCap: 3210000000000,
    peRatio: 34.2,
    sector: 'Technology',
    exchange: 'NASDAQ'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 137.45,
    change: 1.12,
    changePercent: 0.82,
    volume: 18900000,
    open: 136.33,
    high: 137.70,
    low: 136.10,
    prevClose: 136.33,
    marketCap: 1890000000000,
    peRatio: 28.3,
    sector: 'Technology',
    exchange: 'NASDAQ'
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 178.65,
    change: 3.45,
    changePercent: 1.97,
    volume: 32100000,
    open: 175.20,
    high: 179.10,
    low: 174.95,
    prevClose: 175.20,
    marketCap: 1820000000000,
    peRatio: 43.7,
    sector: 'Consumer Cyclical',
    exchange: 'NASDAQ'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 175.89,
    change: -8.76,
    changePercent: -4.76,
    volume: 123450000,
    open: 184.65,
    high: 185.20,
    low: 175.30,
    prevClose: 184.65,
    marketCap: 552000000000,
    peRatio: 68.4,
    sector: 'Automotive',
    exchange: 'NASDAQ'
  },
];

const defaultWatchlistData: WatchlistData = {
  id: 'wl-001',
  name: '美股科技股',
  lastUpdated: new Date().toISOString(),
  stocks: mockStockData
};

const Template = (args: any) => {
  const [watchlist, setWatchlist] = useState<WatchlistData>({
    ...defaultWatchlistData,
    stocks: [...defaultWatchlistData.stocks]
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStockClick = (stock: StockItem) => {
    console.log('Stock clicked:', stock);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // 模拟网络请求
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveStock = (symbol: string) => {
    setWatchlist(prev => ({
      ...prev,
      stocks: prev.stocks.filter(stock => stock.symbol !== symbol)
    }));
  };

  const handleAddStock = () => {
    const newStock: StockItem = {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      price: 476.32,
      change: 12.45,
      changePercent: 2.69,
      volume: 14320000,
      marketCap: 987000000000,
      sector: 'Technology'
    };
    
    setWatchlist(prev => ({
      ...prev,
      stocks: [...prev.stocks, newStock]
    }));
  };

  const handleRenameWatchlist = () => {
    const newName = prompt('请输入新的观察列表名称:', watchlist.name);
    if (newName) {
      setWatchlist(prev => ({
        ...prev,
        name: newName
      }));
    }
  };

  const handleSetError = () => {
    setError('获取数据失败，请稍后重试');
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'var(--color-background-primary)' }}>
      <TVWatchlist 
        watchlist={watchlist}
        onStockClick={handleStockClick}
        onRefresh={handleRefresh}
        onRemoveStock={handleRemoveStock}
        onAddStock={handleAddStock}
        onRenameWatchlist={handleRenameWatchlist}
        showActions={args.showActions}
        isLoading={isLoading}
        error={error}
        autoRefresh={args.autoRefresh}
        refreshInterval={args.refreshInterval}
      />
      
      {/* 控制按钮 */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
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
          刷新数据
        </button>
        <button 
          onClick={handleSetError}
          style={{
            padding: '6px 12px',
            backgroundColor: 'var(--color-danger)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          模拟错误
        </button>
        {watchlist.stocks.length > 0 && (
          <button 
            onClick={() => handleRemoveStock(watchlist.stocks[0].symbol)}
            style={{
              padding: '6px 12px',
              backgroundColor: 'var(--color-secondary)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            删除第一支股票
          </button>
        )}
      </div>
    </div>
  );
};

// 配置元数据
const meta: Meta<typeof TVWatchlist> = {
  title: 'Financial/TVWatchlist',
  component: TVWatchlist,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'var(--color-background-primary)',
        },
      ],
    },
  },
  argTypes: {
    showActions: {
      control: 'boolean',
      description: '是否显示操作按钮',
    },
    autoRefresh: {
      control: 'boolean',
      description: '是否启用自动刷新',
    },
    refreshInterval: {
      control: 'number',
      description: '自动刷新间隔（秒）',
      min: 5,
      max: 60,
      step: 5,
    },
  },
};

export default meta;

export const Default: StoryObj<typeof TVWatchlist> = {
  args: {
    showActions: true,
    autoRefresh: false,
    refreshInterval: 30,
  },
};

export const WithoutActions: StoryObj<typeof TVWatchlist> = {
  args: {
    showActions: false,
    autoRefresh: false,
  },
};

export const WithAutoRefresh: StoryObj<typeof TVWatchlist> = {
  args: {
    showActions: true,
    autoRefresh: true,
    refreshInterval: 15,
  },
};

export const LoadingState: StoryObj<typeof TVWatchlist> = {
  args: {
    showActions: true,
    isLoading: true,
  },
  render: (args) => (
    <div style={{ padding: '20px', backgroundColor: 'var(--color-background-primary)' }}>
      <TVWatchlist 
        watchlist={defaultWatchlistData}
        {...args}
      />
    </div>
  ),
};

export const EmptyWatchlist: StoryObj<typeof TVWatchlist> = {
  args: {
    showActions: true,
  },
  render: (args) => {
    const emptyWatchlist: WatchlistData = {
      id: 'wl-empty',
      name: '空观察列表',
      lastUpdated: new Date().toISOString(),
      stocks: []
    };
    
    return (
      <div style={{ padding: '20px', backgroundColor: 'var(--color-background-primary)' }}>
        <TVWatchlist 
          watchlist={emptyWatchlist}
          onAddStock={() => console.log('Add stock clicked')}
          {...args}
        />
      </div>
    );
  },
};