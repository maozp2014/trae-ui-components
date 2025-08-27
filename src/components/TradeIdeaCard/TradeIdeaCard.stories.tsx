import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TradeIdeaCard from './TradeIdeaCard';

const meta: Meta<typeof TradeIdeaCard> = {
  title: 'Components/TradeIdeaCard',
  component: TradeIdeaCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    summary: { control: 'text' },
    author: { control: 'text' },
    publishedAt: { control: 'text' },
    thumbnailUrl: { control: 'text' },
    onClick: { action: 'onClick' },
  },
};

export default meta;

type Story = StoryObj<typeof TradeIdeaCard>;

// Default Trade Idea Card

export const Default: Story = {
  args: {
    title: 'TSLA: Catalysts Ranking, September 2023 update and Path Forward',
    summary: 'Here\'s an updated outlook for Tesla including all primary catalysts/risk rankings and analyst ratings. This report analyzes key factors that could impact Tesla\'s stock price in the coming months.',
    author: 'ProjectSyndicate',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    thumbnailUrl: 'https://via.placeholder.com/350x150?text=TSLA+Analysis',
  },
};

// Trade Idea Card without Thumbnail

export const WithoutThumbnail: Story = {
  args: {
    title: 'BNC - The Trio Interaction Ahead!',
    summary: 'The chart is lining up something interesting: a trio intersection of cycle timing, trendline support, and horizontal demand/supply. This is often where momentum breakouts occur.',
    author: 'TradingGuru',
    publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(), // 16 hours ago
  },
};

// Trade Idea Card with Short Summary

export const ShortSummary: Story = {
  args: {
    title: 'Adobe - This triangle breaks now!',
    summary: 'Adobe just repeats patterns. Technical analysis breakdown: Back in 2017 we witnessed a major triangle formation...',
    author: 'SwingTraderPro',
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
    thumbnailUrl: 'https://via.placeholder.com/350x150?text=Adobe+Chart',
  },
};

// Trade Idea Card with Long Title

export const LongTitle: Story = {
  args: {
    title: 'Market Outlook: How Interest Rates, Earnings Reports, and Global Events Will Shape Q4 2023',
    summary: 'This comprehensive analysis covers multiple factors that could drive market movements in the final quarter of 2023. We examine the impact of Federal Reserve policy, upcoming earnings seasons, geopolitical tensions, and more.',
    author: 'MarketStrategist',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    thumbnailUrl: 'https://via.placeholder.com/350x150?text=Market+Outlook+Q4',
  },
};

// Multiple Trade Idea Cards in a Grid

export const MultipleCards: Story = {
  args: {
    title: 'Stock Selection Strategy for Volatile Markets',
    summary: 'Discover how to build a resilient portfolio that can weather market volatility. This strategy focuses on identifying companies with strong fundamentals and sustainable competitive advantages.',
    author: 'PortfolioManager',
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    thumbnailUrl: 'https://via.placeholder.com/350x150?text=Stock+Selection',
  },
  render: (args) => {
    const ideas = [
      { ...args },
      {
        title: 'Technology Sector Analysis: Opportunities in AI and Cloud Computing',
        summary: 'The technology sector continues to evolve rapidly. This analysis highlights emerging trends in artificial intelligence and cloud computing that investors should watch closely.',
        author: 'TechAnalyst',
        publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
        thumbnailUrl: 'https://via.placeholder.com/350x150?text=AI+Tech',
      },
      {
        title: 'Energy Transition: Investing in the Future of Renewable Energy',
        summary: 'As the world shifts towards cleaner energy sources, this report identifies key investment opportunities in renewable energy companies and related technologies.',
        author: 'SustainabilityExpert',
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        thumbnailUrl: 'https://via.placeholder.com/350x150?text=Renewable+Energy',
      },
    ];
    
    return (
      <div style={{
        display: 'grid',
        grid-template-columns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '16px',
        width: '100%',
        maxWidth: '1200px',
      }}>
        {ideas.map((idea, index) => (
          <TradeIdeaCard 
            key={index} 
            {...idea} 
            onClick={() => console.log(`Clicked on idea: ${idea.title}`)}
          />
        ))}
      </div>
    );
  },
};

// Trade Idea Card with Mobile View

export const MobileView: Story = {
  args: {
    title: 'Consumer Staples: Defensive Plays for Uncertain Times',
    summary: 'Consumer staple stocks offer stability during market downturns. This analysis highlights top picks in the sector with strong dividend yields and consistent performance.',
    author: 'ValueInvestor',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    thumbnailUrl: 'https://via.placeholder.com/350x150?text=Consumer+Staples',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};