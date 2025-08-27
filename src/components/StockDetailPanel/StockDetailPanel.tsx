import React from 'react';
import styled from 'styled-components';

interface StockDetailPanelProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap?: number;
  volume?: number;
  avgVolume?: number;
  peRatio?: number;
  beta?: number;
  dayRange?: string;
  yearRange?: string;
  dividendYield?: number;
}

const PanelContainer = styled.div`
  background-color: var(--color-background-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-l);
  box-shadow: var(--shadow-card);
  margin-bottom: var(--spacing-lg);
  max-width: 100%;

  @media (max-width: 768px) {
    padding: var(--spacing-m);
  }
`;

const HeaderSection = styled.div`
  margin-bottom: var(--spacing-lg);
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: baseline;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
`;

const Symbol = styled.span`
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
`;

const CompanyName = styled.span`
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
`;

const PriceSection = styled.div`
  display: flex;
  align-items: baseline;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
`;

const Price = styled.span`
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
`;

const Change = styled.span`
  font-size: var(--font-size-body);
  font-weight: 500;
  
  &.is-positive {
    color: var(--color-positive);
  }
  
  &.is-negative {
    color: var(--color-negative);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-md);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  background-color: var(--color-background-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
`;

const StatLabel = styled.span`
  display: block;
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
`;

const StatValue = styled.span`
  display: block;
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
`;

const StockDetailPanel: React.FC<StockDetailPanelProps> = ({
  symbol,
  name,
  price,
  change,
  changePercent,
  marketCap,
  volume,
  avgVolume,
  peRatio,
  beta,
  dayRange,
  yearRange,
  dividendYield,
}) => {
  const isPositive = change >= 0;
  const formattedPrice = price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedChange = `${isPositive ? '+' : ''}${change.toFixed(2)} (${isPositive ? '+' : ''}${changePercent.toFixed(2)}%)`;

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}T`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}B`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(2)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  const formatVolume = (num?: number): string => {
    if (!num) return '-';
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toLocaleString();
  };

  return (
    <PanelContainer>
      <HeaderSection>
        <CompanyInfo>
          <Symbol>{symbol}</Symbol>
          <CompanyName>{name}</CompanyName>
        </CompanyInfo>
        <PriceSection>
          <Price>${formattedPrice}</Price>
          <Change className={isPositive ? 'is-positive' : 'is-negative'}>{formattedChange}</Change>
        </PriceSection>
      </HeaderSection>

      <StatsGrid>
        {marketCap !== undefined && (
          <StatItem>
            <StatLabel>市值 (Market Cap)</StatLabel>
            <StatValue>{formatNumber(marketCap)}</StatValue>
          </StatItem>
        )}
        {volume !== undefined && (
          <StatItem>
            <StatLabel>交易量 (Volume)</StatLabel>
            <StatValue>{formatVolume(volume)}</StatValue>
          </StatItem>
        )}
        {avgVolume !== undefined && (
          <StatItem>
            <StatLabel>平均交易量 (Avg. Volume)</StatLabel>
            <StatValue>{formatVolume(avgVolume)}</StatValue>
          </StatItem>
        )}
        {peRatio !== undefined && (
          <StatItem>
            <StatLabel>市盈率 (P/E Ratio)</StatLabel>
            <StatValue>{peRatio.toFixed(2)}</StatValue>
          </StatItem>
        )}
        {beta !== undefined && (
          <StatItem>
            <StatLabel>贝塔系数 (Beta)</StatLabel>
            <StatValue>{beta.toFixed(2)}</StatValue>
          </StatItem>
        )}
        {dayRange && (
          <StatItem>
            <StatLabel>当日区间 (Day Range)</StatLabel>
            <StatValue>{dayRange}</StatValue>
          </StatItem>
        )}
        {yearRange && (
          <StatItem>
            <StatLabel>52周区间 (52 Week Range)</StatLabel>
            <StatValue>{yearRange}</StatValue>
          </StatItem>
        )}
        {dividendYield !== undefined && (
          <StatItem>
            <StatLabel>股息收益率 (Dividend Yield)</StatLabel>
            <StatValue>{dividendYield.toFixed(2)}%</StatValue>
          </StatItem>
        )}
      </StatsGrid>
    </PanelContainer>
  );
};

export default StockDetailPanel;