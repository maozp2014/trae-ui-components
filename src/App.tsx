import React, { useState } from 'react';
import styled from 'styled-components';
import { SectionHeader, StockItemCard, MarketIndexTicker, TradeIdeaCard, StockDetailPanel } from './components';

// 主容器样式
const AppContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #0F0F0F;
  color: #E6E6E6;
  min-height: 100vh;
`;

// 顶部导航栏
const Navbar = styled.nav`
  background-color: #141414;
  border-bottom: 1px solid #333;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #2962FF;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SearchBar = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: 16px;
`;

const SearchInput = styled.input`
  background-color: #1E1E1E;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 6px 12px 6px 30px;
  color: #E6E6E6;
  font-size: 14px;
  width: 200px;

  &:focus {
    outline: none;
    border-color: #2962FF;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 14px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
`;

const NavLink = styled.a`
  color: #999;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #E6E6E6;
  }

  &.active {
    color: #2962FF;
  }
`;

// 主内容区域
const MainContent = styled.main`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: 16px;
  padding: 16px;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 2fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// 左侧边栏
const LeftSidebar = styled.div`
  @media (max-width: 1200px) {
    display: none;
  }
`;

// 中间内容区
const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// 右侧边栏
const RightSidebar = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

// 板块标题
const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #E6E6E6;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TitleLink = styled.span`
  color: #2962FF;
  font-size: 14px;
  font-weight: normal;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// 股票卡片网格
const StockTrendsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
`;

// 交易观点网格
const TradeIdeasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`;

// 观察列表
const WatchlistContainer = styled.div`
  background-color: #141414;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const WatchlistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: bold;
`;

const WatchlistItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const WatchlistItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 13px;
  border-bottom: 1px solid #222;

  &:last-child {
    border-bottom: none;
  }
`;

const StockSymbol = styled.div`
  font-weight: 500;
`;

const StockName = styled.div`
  font-size: 11px;
  color: #999;
  margin-top: 2px;
`;

const StockPrice = styled.div`
  font-weight: 500;
  text-align: right;
`;

const StockChange = styled.div`
  font-size: 11px;
  text-align: right;
  margin-top: 2px;
`;

// 股票详情容器
const StockDetailContainer = styled.div`
  background-color: #141414;
  border-radius: 8px;
  padding: 16px;
`;

const StockDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const StockInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StockSymbolName = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const StockFullName = styled.div`
  font-size: 11px;
  color: #999;
  margin-top: 2px;
`;

const StockDetailPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const StockDetailChange = styled.div`
  font-size: 14px;
  color: #4CAF50;
  margin-top: 2px;
`;

function App() {
  // Mock data for market indices from the screenshot
  const indices = [
    {
      symbol: 'SPX',
      name: 'S&P 500',
      value: 4645.95,
      change: 26.64,
      changePercent: 0.58,
    },
    {
      symbol: 'NDX',
      name: 'NASDAQ 100',
      value: 16232.37,
      change: 99.60,
      changePercent: 0.62,
    },
    {
      symbol: 'DJI',
      name: 'Dow Jones',
      value: 36970.42,
      change: 141.43,
      changePercent: 0.38,
    },
    {
      symbol: 'RUT',
      name: 'Russell 2000',
      value: 2060.01,
      change: -13.88,
      changePercent: -0.67,
    },
  ];

  // Mock data for community trends stocks from the screenshot
  const communityTrendsStocks = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 229.31,
      change: 2.15,
      changePercent: 0.95,
    },
    {
      symbol: 'AMD',
      name: 'Advanced Micro Devices',
      price: 166.42,
      change: 3.24,
      changePercent: 2.00,
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com',
      price: 128.71,
      change: 0.38,
      changePercent: 0.30,
    },
    {
      symbol: 'COIN',
      name: 'Coinbase Global',
      price: 308.40,
      change: -2.51,
      changePercent: -0.81,
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 207.95,
      change: -0.63,
      changePercent: -0.30,
    },
  ];

  // Mock data for trade ideas from the screenshot
  const tradeIdeas = [
    {
      title: 'TSLA: Catalysts Ranking, September 2023 update',
      summary: 'Here\'s an updated outlook for Tesla including all primary catalysts/risk rankings and analyst ratings...',
      author: 'ProjectSyndicate',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      thumbnailUrl: 'https://via.placeholder.com/350x150?text=TSLA+Analysis',
    },
    {
      title: 'BNC - The Trio Interaction Ahead!',
      summary: 'The chart is lining up something interesting: a trio intersection of cycle timing, trendline support...',
      author: 'TradingGuru',
      publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
      thumbnailUrl: 'https://via.placeholder.com/350x150?text=Chart+Pattern',
    },
    {
      title: 'Adobe - This triangle breaks now!',
      summary: 'Adobe just repeats patterns. Technical analysis breakdown: Back in 2017 we witnessed a major triangle formation...',
      author: 'SwingTraderPro',
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      thumbnailUrl: 'https://via.placeholder.com/350x150?text=Adobe+Chart',
    },
  ];

  // Mock data for watchlist from the screenshot
  const watchlistStocks = [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 229.31, change: 2.15, changePercent: 0.95 },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: 231.57, change: 5.05, changePercent: 2.23 },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: 412.13, change: -1.09, changePercent: -0.26 },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 1298.01, change: -17.87, changePercent: -1.36 },
      { symbol: 'META', name: 'Meta Platforms', price: 348.84, change: 2.88, changePercent: 0.83 },
      { symbol: 'AMZN', name: 'Amazon.com', price: 128.71, change: 0.38, changePercent: 0.30 },
    ];

  // Mock data for stock detail from the screenshot
  const appleStockDetails = {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 229.31,
    change: 2.15,
    changePercent: 0.95,
    marketCap: 3482000000000,
    volume: 34500000,
    avgVolume: 45600000,
    peRatio: 28.5,
    beta: 1.2,
    dayRange: '$227.16 - $229.45',
    yearRange: '$142.12 - $233.47',
    dividendYield: 0.55,
  };

  return (
    <AppContainer>
      <Navbar>
        <Logo>
          <span>T</span> TradingView
        </Logo>
        
        <NavLinks>
          <NavLink className="active">Products</NavLink>
          <NavLink>Community</NavLink>
          <NavLink>Markets</NavLink>
          <NavLink>Brokers</NavLink>
          <NavLink>More</NavLink>
        </NavLinks>
        
        <SearchBar>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput placeholder="Search (Ctrl+K)" />
        </SearchBar>
        
        <div style={{ color: '#999', fontSize: '14px' }}>💰 You have a Discount</div>
      </Navbar>

      <MainContent>
        <LeftSidebar>
          <MarketIndexTicker indices={indices} />
        </LeftSidebar>

        <CenterContent>
          <div>
            <SectionTitle>
              US stocks <span style={{ fontSize: '12px', color: '#999', fontWeight: 'normal' }}>→</span>
            </SectionTitle>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', fontSize: '14px', color: '#999' }}>
              <span style={{ color: '#E6E6E6' }}>Market summary</span>
              <span>Stocks</span>
              <span>Crypto</span>
              <span>Futures</span>
              <span>Forex</span>
              <span>Economy</span>
              <span>Brokers</span>
            </div>
          </div>

          <div>
            <SectionTitle>
              Community trends <TitleLink>→</TitleLink>
            </SectionTitle>
            <StockTrendsGrid>
              {communityTrendsStocks.map((stock) => (
                <StockItemCard key={stock.symbol} {...stock} />
              ))}
            </StockTrendsGrid>
          </div>

          <div>
            <SectionTitle>
              Trade ideas <TitleLink>→</TitleLink>
            </SectionTitle>
            <TradeIdeasGrid>
              {tradeIdeas.map((idea, index) => (
                <TradeIdeaCard key={index} {...idea} />
              ))}
            </TradeIdeasGrid>
          </div>
        </CenterContent>

        <RightSidebar>
          <WatchlistContainer>
            <WatchlistHeader>
              <div>Watchlist</div>
              <div style={{ color: '#999', fontSize: '12px' }}>...</div>
            </WatchlistHeader>
            <WatchlistItems>
              {watchlistStocks.map((stock) => (
                <WatchlistItem key={stock.symbol}>
                  <div>
                    <StockSymbol>{stock.symbol}</StockSymbol>
                    <StockName>{stock.name}</StockName>
                  </div>
                  <div>
                    <StockPrice>{stock.price.toFixed(2)}</StockPrice>
                    <StockChange style={{ color: stock.changePercent >= 0 ? '#F44336' : '#4CAF50' }}>
                        +{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                      </StockChange>
                    </div>
                  </WatchlistItem>
              ))}
            </WatchlistItems>
          </WatchlistContainer>

          <StockDetailContainer>
            <StockDetailHeader>
              <StockInfo>
                <StockSymbolName>AAPL</StockSymbolName>
                <StockFullName>Apple Inc. | NASDAQ</StockFullName>
              </StockInfo>
              <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#999' }}>
                <span>📊</span>
                <span>📃</span>
                <span>⚙️</span>
              </div>
            </StockDetailHeader>
            <StockDetailPrice>{appleStockDetails.price.toFixed(2)}</StockDetailPrice>
            <StockDetailChange>
              +{appleStockDetails.change.toFixed(2)} ({appleStockDetails.changePercent.toFixed(2)}%)
            </StockDetailChange>
            <div style={{ marginTop: '12px', fontSize: '12px', color: '#999' }}>
              Last update: 12:57:00
            </div>
            <StockDetailPanel {...appleStockDetails} />
          </StockDetailContainer>
        </RightSidebar>
      </MainContent>
    </AppContainer>
  );
}

export default App;