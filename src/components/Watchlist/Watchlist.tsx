import React from 'react';
import styled from 'styled-components';

// 股票项数据类型
export interface StockItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

// Watchlist组件Props类型
export interface WatchlistProps {
  stocks: StockItem[];
}

// 观察列表容器
const WatchlistContainer = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
`;

// 观察列表标题
const WatchlistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: bold;
`;

// 观察列表项目容器
const WatchlistItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// 单个观察列表项目
const WatchlistItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 13px;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
`;

// 股票代码
const StockSymbol = styled.div`
  font-weight: 500;
`;

// 股票名称
const StockName = styled.div`
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 2px;
`;

// 股票价格
const StockPrice = styled.div`
  font-weight: 500;
  text-align: right;
`;

// 股票涨跌幅
const StockChange = styled.div`
  font-size: 11px;
  text-align: right;
  margin-top: 2px;
`;

/**
 * Watchlist 组件
 * 显示股票观察列表
 */
const Watchlist: React.FC<WatchlistProps> = ({ stocks }) => {
  return (
    <WatchlistContainer>
      <WatchlistHeader>
        <div>Watchlist</div>
        <div style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>...</div>
      </WatchlistHeader>
      <WatchlistItems>
        {stocks.map((stock) => (
          <WatchlistItem key={stock.symbol}>
            <div>
              <StockSymbol>{stock.symbol}</StockSymbol>
              <StockName>{stock.name}</StockName>
            </div>
            <div>
              <StockPrice>{stock.price.toFixed(2)}</StockPrice>
              <StockChange style={{ color: stock.changePercent >= 0 ? 'var(--color-positive)' : 'var(--color-negative)' }}>
                {stock.changePercent >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </StockChange>
            </div>
          </WatchlistItem>
        ))}
      </WatchlistItems>
    </WatchlistContainer>
  );
};

export default Watchlist;