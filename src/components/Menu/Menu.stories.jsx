import React, { useState } from 'react';
import Menu from './Menu';
import { action } from '@storybook/addon-actions';

// 模拟菜单项数据
const mockMenuItems = [
  {
    label: '信息中心',
    isRedText: true,
    isSelected: false
  },
  {
    label: '统计信息',
    isSelected: false
  },
  {
    label: '发布概览',
    isSelected: false
  },
  {
    label: '测试和发布',
    isSelected: true,
    hasRedBorder: true,
    children: [
      {
        label: '最新版本和app bundle',
        isRedText: true,
        hasRedBorder: true
      },
      {
        label: '正式版',
        isRedText: true,
        hasRedBorder: true
      },
      {
        label: '测试',
        isSelected: true,
        isRedText: false,
        hasRedBorder: false
      },
      {
        label: '预注册',
        isSelected: false
      },
      {
        label: '应用完整性',
        isSelected: false
      },
      {
        label: '高级设置',
        isSelected: false
      }
    ]
  },
  {
    label: '监控和改进',
    isSelected: false
  },
  {
    label: '扩大用户群',
    isSelected: false
  },
  {
    label: '借助 Play 变现',
    isSelected: false
  }
];

export default {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const Template = (args) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (label) => {
    setSelectedItem(label);
    args.onSelect(label);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Menu 
        items={args.items} 
        onSelect={handleSelect} 
        className={args.className}
      />
      {selectedItem && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          选中的菜单项: {selectedItem}
        </div>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  items: mockMenuItems,
  onSelect: action('菜单项被选择'),
  className: '',
};

export const SimpleMenu = Template.bind({});
SimpleMenu.args = {
  items: [
    { label: '首页', isSelected: true },
    { label: '产品', isSelected: false },
    { label: '服务', isSelected: false },
    { label: '关于我们', isSelected: false },
  ],
  onSelect: action('菜单项被选择'),
};

export const MenuWithIcons = Template.bind({});
MenuWithIcons.args = {
  items: [
    { label: '首页', icon: '🏠', isSelected: true },
    { label: '产品', icon: '📦', isSelected: false },
    { 
      label: '服务', 
      icon: '🔧', 
      isSelected: false,
      children: [
        { label: '技术支持', icon: '👨‍💻' },
        { label: '客户服务', icon: '👩‍💼' },
        { label: '售后服务', icon: '🔄' },
      ]
    },
    { label: '关于我们', icon: 'ℹ️', isSelected: false },
  ],
  onSelect: action('菜单项被选择'),
};

export const MenuWithSubMenu = Template.bind({});
MenuWithSubMenu.args = {
  items: [
    { 
      label: '设置', 
      isSelected: false,
      children: [
        { 
          label: '用户设置', 
          children: [
            { label: '个人信息' },
            { label: '账号安全' },
            { label: '隐私设置' },
          ]
        },
        { 
          label: '系统设置', 
          children: [
            { label: '通知设置' },
            { label: '显示设置' },
            { label: '语言设置' },
          ]
        },
        { label: '帮助与反馈' },
      ]
    },
    { label: '数据分析', isSelected: false },
    { label: '报表中心', isSelected: false },
  ],
  onSelect: action('菜单项被选择'),
};