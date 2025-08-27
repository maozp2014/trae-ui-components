import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface IndexData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

interface MarketIndexTickerProps {
  indices: IndexData[];
  onIndexClick?: (symbol: string) => void;
  updateInterval?: number;
}

const TickerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-m);
  margin-bottom: var(--spacing-lg);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const IndexItem = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-m);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--color-gray-100);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  &.is-updating {
    opacity: 0.7;
  }
`;

const IndexName = styled.span`
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
  display: block;
`;

const IndexValue = styled.span`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  display: block;
  margin: var(--spacing-xs) 0;
`;

const ChangeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ChangeValue = styled.span`
  font-size: var(--font-size-caption);
  
  &.is-positive {
    color: var(--color-positive);
  }
  
  &.is-negative {
    color: var(--color-negative);
  }
`;

const MarketIndexTicker: React.FC<MarketIndexTickerProps> = ({
  indices,
  onIndexClick,
  updateInterval = 15000, // Default to 15 seconds
}) => {
  const [updatingIndex, setUpdatingIndex] = useState<string | null>(null);
  const [localIndices, setLocalIndices] = useState<IndexData[]>(indices);

  // Simulate data updates at the specified interval
  useEffect(() => {
    const timer = setInterval(() => {
      if (localIndices.length > 0) {
        // Pick a random index to update
        const randomIndex = Math.floor(Math.random() * localIndices.length);
        setUpdatingIndex(localIndices[randomIndex].symbol);

        // Update the value with a small random change
        const updatedIndices = [...localIndices];
        const currentValue = updatedIndices[randomIndex].value;
        const randomChange = (Math.random() - 0.5) * 2 * 0.5;
        const newValue = currentValue + randomChange;
        const change = newValue - currentValue;
        const changePercent = (change / currentValue) * 100;

        updatedIndices[randomIndex] = {
          ...updatedIndices[randomIndex],
          value: parseFloat(newValue.toFixed(2)),
          change: parseFloat(change.toFixed(2)),
          changePercent: parseFloat(changePercent.toFixed(2)),
        };

        setLocalIndices(updatedIndices);

        // Reset updating state after a short delay
        setTimeout(() => {
          setUpdatingIndex(null);
        }, 300);
      }
    }, updateInterval);

    return () => clearInterval(timer);
  }, [localIndices, updateInterval]);

  const handleIndexClick = (symbol: string) => {
    if (onIndexClick) {
      onIndexClick(symbol);
    }
  };

  const formatValue = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0;
    return `${isPositive ? '+' : ''}${change.toFixed(2)} (${isPositive ? '+' : ''}${changePercent.toFixed(2)}%)`;
  };

  return (
    <TickerContainer>
      {localIndices.map((index) => {
        const isPositive = index.change >= 0;
        return (
          <IndexItem
            key={index.symbol}
            className={updatingIndex === index.symbol ? 'is-updating' : ''}
            onClick={() => handleIndexClick(index.symbol)}
          >
            <IndexName>{index.name}</IndexName>
            <IndexValue>{formatValue(index.value)}</IndexValue>
            <ChangeContainer>
              <ChangeValue className={isPositive ? 'is-positive' : 'is-negative'}>
                {formatChange(index.change, index.changePercent)}
              </ChangeValue>
            </ChangeContainer>
          </IndexItem>
        );
      })}
    </TickerContainer>
  );
};

export default MarketIndexTicker;