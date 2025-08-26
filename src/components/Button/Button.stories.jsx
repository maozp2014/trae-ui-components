import React from 'react';
import Button from './Button';

// 配置元数据
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'danger'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    onClick: {
      action: 'clicked',
    },
  },
};

// 定义模板
const Template = (args) => <Button {...args} />;

// 创建基础故事
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button',
};

// 创建次要按钮故事
export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary Button',
};

// 创建危险按钮故事
export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  children: 'Danger Button',
};

// 创建小尺寸按钮故事
export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'Small Button',
};

// 创建大尺寸按钮故事
export const Large = Template.bind({});
Large.args = {
  size: 'large',
  children: 'Large Button',
};

// 创建禁用状态按钮故事
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  children: 'Disabled Button',
};

// 创建加载状态按钮故事
export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  children: 'Loading Button',
};

// 创建组合使用的故事
export const AllVariants = () => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    <Button>Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="danger">Danger</Button>
    <Button size="small">Small</Button>
    <Button size="large">Large</Button>
    <Button disabled>Disabled</Button>
    <Button loading>Loading</Button>
  </div>
);

AllVariants.parameters = {
  controls: {
    disable: true,
  },
};