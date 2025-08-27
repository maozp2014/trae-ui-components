import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SectionHeader from './SectionHeader';

const meta: Meta<typeof SectionHeader> = {
  title: 'Components/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {\ control: 'text' },
    collapsible: { control: 'boolean' },
    isCollapsed: { control: 'boolean' },
    onToggle: { action: 'onToggle' },
  },
};

export default meta;

type Story = StoryObj<typeof SectionHeader>;

// Default Section Header

export const Default: Story = {
  args: {
    title: 'Section Title',
  },
};

// Collapsible Section Header

export const Collapsible: Story = {
  args: {
    title: 'Collapsible Section',
    collapsible: true,
  },
  render: (args) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const handleToggle = () => {
      setIsCollapsed(!isCollapsed);
      args.onToggle?.();
    };
    
    return (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <SectionHeader 
          {...args} 
          isCollapsed={isCollapsed}
          onToggle={handleToggle}
        />
        {!isCollapsed && (
          <div style={{
            padding: '16px',
            backgroundColor: 'var(--color-background-secondary)',
            borderRadius: 'var(--radius-md)',
            marginTop: '8px'
          }}>
            Section content would appear here.
          </div>
        )}
      </div>
    );
  },
};

// Financial Specific Section Header

export const FinancialSection: Story = {
  args: {
    title: 'Community Trends',
  },
};

// Large Text Section Header

export const LargeText: Story = {
  args: {
    title: 'Market Summary & Trade Ideas',
  },
};

// Mobile View Section Header

export const MobileView: Story = {
  args: {
    title: 'Mobile Section Title',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};