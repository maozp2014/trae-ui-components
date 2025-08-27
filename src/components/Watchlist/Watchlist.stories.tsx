import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Watchlist from './Watchlist';

// Mock数据用于Storybook预览
const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 229.31, change: 2.15, changePercent: 0.95 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 231.57, change: 5.05, changePercent: 2.23 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 412.13, change: -1.09, changePercent: -0.26 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 1298.01, change: -17.87, changePercent: -1.36 },
  { symbol: 'META', name: 'Meta Platforms', price: 348.84, change: 2.88, changePercent: 0.83 },
];

// 另一个用于测试的Mock数据，包含更多正增长的股票
const positiveStocks = [
  { symbol: 'AMZN', name: 'Amazon.com', price: 128.71, change: 0.38, changePercent: 0.30 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 207.95, change: 1.63, changePercent: 0.79 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 420.45, change: 8.23, changePercent: 2.00 },
];

// Storybook配置
const meta: Meta<typeof Watchlist> = {
  title: 'Components/Watchlist',
  component: Watchlist,
  parameters: {
    // 可选的参数配置
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // 可以在这里配置组件的props类型
    stocks: {
      description: '股票列表数据',
      control: {
        type: 'object',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Watchlist>;

// 默认故事 - 显示标准的股票观察列表
export const Default: Story = {
  args: {
    stocks: mockStocks,
  },
  parameters: {
    docs: {
      description: {
        story: '默认的观察列表，显示包含涨跌幅的股票列表',
      },
    },
  },
};

// 空列表故事 - 用于测试空状态
export const Empty: Story = {
  args: {
    stocks: [],
  },
  parameters: {
    docs: {
      description: {
        story: '显示空的观察列表状态',
      },
    },
  },
};

// 正增长故事 - 显示大多数股票为正增长的观察列表
export const MostlyPositive: Story = {
  args: {
    stocks: positiveStocks,
  },
  parameters: {
    docs: {
      description: {
        story: '显示大多数股票为正增长的观察列表',
      },
    },
  },
};

// 短列表故事 - 显示较短的股票列表
export const ShortList: Story = {
  args: {
    stocks: mockStocks.slice(0, 3),
  },
  parameters: {
    docs: {
      description: {
        story: '显示较短的股票观察列表',
      },
    },
  },
};