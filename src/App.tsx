import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SectionHeader, StockItemCard, MarketIndexTicker, TradeIdeaCard, StockDetailPanel, Watchlist, TVWatchlist } from './components';

// 主容器样式
const AppContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

// 顶部导航栏
const Navbar = styled.nav`
  background-color: var(--color-background-secondary);
  border-bottom: 1px solid var(--color-border);
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease, border-color 0.3s ease;
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
  background-color: var(--color-background-tertiary);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 6px 12px 6px 30px;
  color: var(--color-text-primary);
  font-size: 14px;
  width: 200px;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  font-size: 14px;
`;

// 主题切换按钮
const ThemeToggle = styled.button`
  background-color: var(--color-background-tertiary);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 6px 12px;
  color: var(--color-text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--color-background-secondary);
    border-color: var(--color-border-hover);
  }
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
  color: var(--color-text-primary);
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

// 股票详情容器
const StockDetailContainer = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  padding: 16px;
  transition: background-color 0.3s ease;
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
  color: var(--color-text-muted);
  margin-top: 2px;
`;

const StockDetailPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const StockDetailChange = styled.div`
  font-size: 14px;
  color: var(--color-positive);
  margin-top: 2px;
`;

// 深色主题变量
const darkTheme = {
  '--color-primary': '#2962FF',
  '--color-primary-hover': '#1E88E5',
  '--color-primary-active': '#1976D2',
  '--color-secondary': '#757575',
  '--color-secondary-hover': '#9E9E9E',
  '--color-success': '#4CAF50',
  '--color-danger': '#F44336',
  '--color-warning': '#FFC107',
  '--color-info': '#2196F3',
  '--color-positive': '#4CAF50',
  '--color-negative': '#F44336',
  '--color-background-primary': '#0F0F0F',
  '--color-background-secondary': '#141414',
  '--color-background-tertiary': '#1E1E1E',
  '--color-shadow': 'rgba(0, 0, 0, 0.3)',
  '--color-gray-50': '#121212',
  '--color-gray-100': '#1A1A1A',
  '--color-gray-200': '#2D2D2D',
  '--color-gray-300': '#3D3D3D',
  '--color-gray-400': '#525252',
  '--color-gray-500': '#737373',
  '--color-gray-600': '#A0A0A0',
  '--color-gray-700': '#C7C7C7',
  '--color-gray-800': '#E0E0E0',
  '--color-gray-900': '#F5F5F5',
  '--color-background': '#0F0F0F',
  '--color-text-primary': '#E6E6E6',
  '--color-text-secondary': '#B0B0B0',
  '--color-text-muted': '#8E8E8E',
  '--color-border': '#333333',
  '--color-border-hover': '#444444',
  '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
  '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12)',
  '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
};

// 浅色主题变量
const lightTheme = {
  '--color-primary': '#2962FF',
  '--color-primary-hover': '#1E88E5',
  '--color-primary-active': '#1976D2',
  '--color-secondary': '#6c757d',
  '--color-secondary-hover': '#5a6268',
  '--color-success': '#4CAF50',
  '--color-danger': '#F44336',
  '--color-warning': '#FFC107',
  '--color-info': '#2196F3',
  '--color-positive': '#4CAF50',
  '--color-negative': '#F44336',
  '--color-background-primary': '#FFFFFF',
  '--color-background-secondary': '#F8F9FA',
  '--color-background-tertiary': '#E9ECEF',
  '--color-shadow': 'rgba(0, 0, 0, 0.1)',
  '--color-gray-50': '#f8f9fa',
  '--color-gray-100': '#f1f3f5',
  '--color-gray-200': '#e9ecef',
  '--color-gray-300': '#dee2e6',
  '--color-gray-400': '#ced4da',
  '--color-gray-500': '#adb5bd',
  '--color-gray-600': '#6c757d',
  '--color-gray-700': '#495057',
  '--color-gray-800': '#343a40',
  '--color-gray-900': '#212529',
  '--color-background': '#ffffff',
  '--color-text-primary': '#1a1a1a',
  '--color-text-secondary': '#666666',
  '--color-text-muted': '#999999',
  '--color-border': '#eaeaea',
  '--color-border-hover': '#d4d4d4',
  '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' 
};

function App() {
  // 主题状态管理
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  // 应用主题
  useEffect(() => {
    const root = document.documentElement;
    const theme = isDarkTheme ? darkTheme : lightTheme;
    
    // 应用所有CSS变量
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [isDarkTheme]);

  // 切换主题
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // TVWatchlist组件的模拟数据
  const mockWatchlistData = {
    id: 'main-watchlist',
    name: '我的美股观察列表',
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
        
        <ThemeToggle onClick={toggleTheme}>
          {isDarkTheme ? '🌞' : '🌙'} {isDarkTheme ? '浅色主题' : '深色主题'}
        </ThemeToggle>
        
        <div style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>💰 You have a Discount</div>
      </Navbar>

      <MainContent>
        <LeftSidebar>
          <MarketIndexTicker indices={indices} />
        </LeftSidebar>

        <CenterContent>
          <div>
            <SectionTitle>
              US stocks <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>→</span>
            </SectionTitle>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', fontSize: '14px' }}>
              <span style={{ color: 'var(--color-text-primary)' }}>Market summary</span>
              <span style={{ color: 'var(--color-text-muted)' }}>Stocks</span>
              <span style={{ color: 'var(--color-text-muted)' }}>Crypto</span>
              <span style={{ color: 'var(--color-text-muted)' }}>Futures</span>
              <span style={{ color: 'var(--color-text-muted)' }}>Forex</span>
              <span style={{ color: 'var(--color-text-muted)' }}>Economy</span>
              <span style={{ color: 'var(--color-text-muted)' }}>Brokers</span>
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
          <Watchlist stocks={watchlistStocks} />
          <TVWatchlist watchlist={mockWatchlistData} />

          <StockDetailContainer>
            <StockDetailHeader>
              <StockInfo>
                <StockSymbolName>AAPL</StockSymbolName>
                <StockFullName>Apple Inc. | NASDAQ</StockFullName>
              </StockInfo>
              <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                <span>📊</span>
                <span>📃</span>
                <span>⚙️</span>
              </div>
            </StockDetailHeader>
            <StockDetailPrice>{appleStockDetails.price.toFixed(2)}</StockDetailPrice>
            <StockDetailChange style={{ color: appleStockDetails.changePercent >= 0 ? 'var(--color-positive)' : 'var(--color-negative)' }}>
              {appleStockDetails.changePercent >= 0 ? '+' : ''}{appleStockDetails.change.toFixed(2)} ({appleStockDetails.changePercent.toFixed(2)}%)
            </StockDetailChange>
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
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