import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import StockItemCard from './StockItemCard';

const meta: Meta<typeof StockItemCard> = {
  title: 'Components/StockItemCard',
  component: StockItemCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    symbol: { control: 'text' },
    name: { control: 'text' },
    price: { control: 'number' },
    change: { control: 'number' },
    changePercent: { control: 'number' },
    onClick: { action: 'onClick' },
  },
};

export default meta;

type Story = StoryObj<typeof StockItemCard>;

// Default Stock Item Card

export const Default: Story = {
  args: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 229.31,
    change: 2.15,
    changePercent: 0.95,
  },
};

// Stock Item Card with Negative Change

export const NegativeChange: Story = {
  args: {
    symbol: 'GOOGL',
    name: 'Alphabet Inc. Class A',
    price: 207.95,
    change: -0.63,
    changePercent: -0.30,
  },
};

// Stock Item Card with Zero Change

export const ZeroChange: Story = {
  args: {
    symbol: 'KO',
    name: 'Coca-Cola Company',
    price: 60.50,
    change: 0,
    changePercent: 0,
  },
};

// Stock Item Card with Large Values

export const LargeValues: Story = {
  args: {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 125.75,
    change: 3.25,
    changePercent: 2.65,
  },
};

// Stock Item Card with Mobile View

export const MobileView: Story = {
  args: {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.45,
    change: -5.23,
    changePercent: -2.07,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

// Multiple Stock Item Cards in a List

export const MultipleCards: Story = {
  args: {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 415.28,
    change: 8.75,
    changePercent: 2.15,
  },
  render: (args) => {
    const stocks = [
      { ...args },
      {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 945.78,
        change: 32.45,
        changePercent: 3.55,
      },
      {
        symbol: 'META',
        name: 'Meta Platforms Inc.',
        price: 423.45,
        change: -12.36,
        changePercent: -2.84,
      },
      {
        symbol: 'BRK.B',
        name: 'Berkshire Hathaway Inc. Class B',
        price: 418.72,
        change: 2.35,
        changePercent: 0.56,
      },
    ];
    
    return (
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {stocks.map((stock) => (
          <StockItemCard 
            key={stock.symbol} 
            {...stock} 
            onClick={() => console.log(`Clicked on ${stock.symbol}`)}
          />
        ))}
      </div>
    );
  },
};