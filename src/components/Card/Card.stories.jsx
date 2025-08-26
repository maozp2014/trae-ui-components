import React from 'react';
import Card from './Card';
import Button from '../Button/Button';

// 配置元数据
export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    elevated: {
      control: 'boolean',
    },
    rounded: {
      control: 'boolean',
    },
    outlined: {
      control: 'boolean',
    },
    padded: {
      control: 'boolean',
    },
    hoverable: {
      control: 'boolean',
    },
  },
};

// 定义模板
const Template = (args) => (
  <Card {...args}>
    <p>Card content goes here. This is some sample text to demonstrate the card component.</p>
  </Card>
);

// 创建基础卡片故事
export const Default = Template.bind({});
Default.args = {
  title: 'Card Title',
  description: 'This is a description for the card.',
};

// 创建带按钮的卡片故事
export const WithActions = (args) => (
  <Card {...args} footer={
    <>
      <Button variant="secondary">Cancel</Button>
      <Button>Submit</Button>
    </>
  }>
    <p>Card content with action buttons in the footer.</p>
  </Card>
);

WithActions.args = {
  title: 'Card with Actions',
};

// 创建增强样式的卡片故事
export const Enhanced = Template.bind({});
Enhanced.args = {
  title: 'Enhanced Card',
  description: 'This card has enhanced styling with elevation and rounded corners.',
  elevated: true,
  rounded: true,
};

// 创建轮廓样式的卡片故事
export const Outlined = Template.bind({});
Outlined.args = {
  title: 'Outlined Card',
  description: 'This card has an outline style instead of a shadow.',
  outlined: true,
};

// 创建带有额外内边距的卡片故事
export const Padded = Template.bind({});
Padded.args = {
  title: 'Padded Card',
  description: 'This card has extra padding for more content.',
  padded: true,
};

// 创建悬停效果的卡片故事
export const Hoverable = Template.bind({});
Hoverable.args = {
  title: 'Hoverable Card',
  description: 'This card has a hover effect.',
  hoverable: true,
};

// 创建自定义头部的卡片故事
export const CustomHeader = (args) => (
  <Card
    {...args}
    header={
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0 }}>Custom Header Card</h3>
          <p style={{ margin: 0, color: '#666' }}>This header has custom styling</p>
        </div>
        <Button size="small" variant="secondary">
          Options
        </Button>
      </div>
    }
  >
    <p>Card with a completely custom header section.</p>
  </Card>
);

// 创建卡片组合展示
export const AllVariants = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
    <Card title="Default Card" description="Standard card with title and description">
      <p>Default content</p>
    </Card>
    <Card title="Elevated Card" elevated>
      <p>Elevated style</p>
    </Card>
    <Card title="Rounded Card" rounded>
      <p>Rounded corners</p>
    </Card>
    <Card title="Outlined Card" outlined>
      <p>Outline border</p>
    </Card>
    <Card title="Padded Card" padded>
      <p>Extra padding</p>
    </Card>
    <Card title="Hoverable Card" hoverable>
      <p>Hover effect</p>
    </Card>
    <Card title="Combined Styles" elevated rounded hoverable>
      <p>Multiple styles together</p>
    </Card>
  </div>
);

AllVariants.parameters = {
  controls: {
    disable: true,
  },
};