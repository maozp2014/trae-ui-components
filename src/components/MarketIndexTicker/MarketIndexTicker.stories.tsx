import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import MarketIndexTicker from './MarketIndexTicker';

const meta: Meta<typeof MarketIndexTicker> = {
  title: 'Components/MarketIndexTicker',
  component: MarketIndexTicker,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    indices: {\ control: 'object' },
    onIndexClick: { action: 'onIndexClick' },
    updateInterval: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof MarketIndexTicker>;

// Default Market Index Ticker

export const Default: Story = {
  args: {
    indices: [
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
    ],
    updateInterval: 10000, // 10 seconds for demo purposes
  },
};

// Market Index Ticker with Some Negative Changes

export const MixedChanges: Story = {
  args: {
    indices: [
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
        symbol: 'VIX',
        name: 'CBOE Volatility',
        value: 14.82,
        change: -0.55,
        changePercent: -3.58,
      },
      {
        symbol: 'USD',
        name: 'US Dollar Index',
        value: 103.25,
        change: -0.12,
        changePercent: -0.12,
      },
    ],
    updateInterval: 15000,
  },
};

// Market Index Ticker with Only Positive Changes

export const AllPositive: Story = {
  args: {
    indices: [
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
        symbol: 'SOX',
        name: 'PHLX Semiconductor',
        value: 4725.34,
        change: 89.21,
        changePercent: 1.93,
      },
    ],
    updateInterval: 20000,
  },
};

// Market Index Ticker with Custom Update Interval

export const FastUpdates: Story = {
  args: {
    indices: [
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
    ],
    updateInterval: 5000, // Fast updates for demo
  },
};

// Market Index Ticker with Mobile View

export const MobileView: Story = {
  args: {
    indices: [
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
    ],
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

// Market Index Ticker with Tablet View

export const TabletView: Story = {
  args: {
    indices: [
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
    ],
  },
  parameters: {
    viewport: { defaultViewport: 'tablet' },
  },
};