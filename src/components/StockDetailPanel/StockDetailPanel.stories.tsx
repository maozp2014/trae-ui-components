import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import StockDetailPanel from './StockDetailPanel';

const meta: Meta<typeof StockDetailPanel> = {
  title: 'Components/StockDetailPanel',
  component: StockDetailPanel,
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
    marketCap: { control: 'number' },
    volume: { control: 'number' },
    avgVolume: { control: 'number' },
    peRatio: { control: 'number' },
    beta: { control: 'number' },
    dayRange: { control: 'text' },
    yearRange: { control: 'text' },
    dividendYield: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof StockDetailPanel>;

// Default Stock Detail Panel

export const Default: Story = {
  args: {
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
  },
};

// Stock Detail Panel with Negative Change

export const NegativeChange: Story = {
  args: {
    symbol: 'GOOGL',
    name: 'Alphabet Inc. Class A',
    price: 207.95,
    change: -0.63,
    changePercent: -0.30,
    marketCap: 1876000000000,
    volume: 18200000,
    avgVolume: 24500000,
    peRatio: 24.3,
    beta: 1.05,
    dayRange: '$207.32 - $209.18',
    yearRange: '$121.10 - $214.21',
    dividendYield: 0,
  },
};

// Stock Detail Panel with Zero Change

export const ZeroChange: Story = {
  args: {
    symbol: 'KO',
    name: 'The Coca-Cola Company',
    price: 60.50,
    change: 0,
    changePercent: 0,
    marketCap: 243000000000,
    volume: 12300000,
    avgVolume: 18700000,
    peRatio: 23.2,
    beta: 0.52,
    dayRange: '$60.45 - $60.62',
    yearRange: '$52.21 - $64.23',
    dividendYield: 3.25,
  },
};

// Stock Detail Panel with Minimal Data

export const MinimalData: Story = {
  args: {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 248.45,
    change: -5.23,
    changePercent: -2.07,
  },
};

// Stock Detail Panel with Mobile View

export const MobileView: Story = {
  args: {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 125.75,
    change: 3.25,
    changePercent: 2.65,
    marketCap: 1892000000000,
    volume: 78900000,
    avgVolume: 65400000,
    peRatio: 58.7,
    beta: 1.45,
    dayRange: '$122.50 - $125.85',
    yearRange: '$81.43 - $134.42',
    dividendYield: 0,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

// Stock Detail Panel with Very Large Market Cap

export const LargeMarketCap: Story = {
  args: {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 415.28,
    change: 8.75,
    changePercent: 2.15,
    marketCap: 3125000000000,
    volume: 23400000,
    avgVolume: 28900000,
    peRatio: 38.4,
    beta: 1.02,
    dayRange: '$406.53 - $415.50',
    yearRange: '$282.15 - $423.42',
    dividendYield: 0.87,
  },
};

// Stock Detail Panel with High Beta

export const HighBeta: Story = {
  args: {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 945.78,
    change: 32.45,
    changePercent: 3.55,
    marketCap: 2875000000000,
    volume: 45600000,
    avgVolume: 52300000,
    peRatio: 78.9,
    beta: 1.95,
    dayRange: '$913.33 - $946.22',
    yearRange: '$381.82 - $951.48',
    dividendYield: 0.04,
  },
};