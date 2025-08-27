import React from 'react';
import styled from 'styled-components';

interface StockItemCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  onClick?: () => void;
}

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-background-primary);
  padding: var(--spacing-m);
  margin-bottom: var(--spacing-s);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--color-background-secondary);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: var(--spacing-sm);
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Symbol = styled.span`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
`;

const CompanyName = styled.span`
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
  margin-top: 2px;
`;

const Price = styled.span`
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
`;

const Change = styled.span`
  font-size: var(--font-size-caption);
  margin-top: 2px;
  
  &.is-positive {
    color: var(--color-positive);
  }
  
  &.is-negative {
    color: var(--color-negative);
  }
`;

const StockItemCard: React.FC<StockItemCardProps> = ({
  symbol,
  name,
  price,
  change,
  changePercent,
  onClick,
}) => {
  const isPositive = change >= 0;
  const formattedPrice = price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedChange = `${isPositive ? '+' : ''}${changePercent.toFixed(2)}%`;

  return (
    <CardContainer onClick={onClick}>
      <LeftSection>
        <Symbol>{symbol}</Symbol>
        <CompanyName>{name}</CompanyName>
      </LeftSection>
      <RightSection>
        <Price>${formattedPrice}</Price>
        <Change className={isPositive ? 'is-positive' : 'is-negative'}>{formattedChange}</Change>
      </RightSection>
    </CardContainer>
  );
};

export default StockItemCard;