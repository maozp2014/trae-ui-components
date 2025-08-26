import React, { useState } from 'react';
import styled from 'styled-components';

// 菜单容器样式
const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
`;

// 菜单项样式
const MenuItemStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border-left: 3px solid transparent;
  min-height: 44px;
  border-radius: 8px;

  /* 选中状态 */
  ${(props) => props.$isSelected && `
    background-color: #e6f7ff;
    border-left-color: #1890ff;
    font-weight: 500;
  `}

  /* 悬停状态 */
  &:hover {
    background-color: #f5f5f5;
  }
`;

// 带有子菜单的菜单项容器样式
const ParentMenuItemContainer = styled.div`
  position: relative;
  
  /* 有选中子项的状态 - 包含父菜单和所有子菜单的外框 */
  ${(props) => props.$hasSelectedChild && `
    border: 1px solid #1890ff;
    border-left-width: 3px;
    box-shadow: 0 0 0 1px rgba(24, 144, 255, 0.2);
    border-radius: 8px;
    margin: 2px 0;
  `}
`;

// 子菜单容器样式
const SubMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-left: 1px solid #e8e8e8;
  margin-left: 16px;
  padding-left: 8px;
  border-radius: 0 8px 8px 0;
`;

// 菜单项文本样式
const MenuItemText = styled.span`
  flex: 1;
`;

// 子菜单标记样式
const SubMenuTag = styled.span`
  color: #999;
  font-size: 12px;
  margin-left: 8px;
  padding: 0 4px;
  border-radius: 2px;
`;

// 右侧箭头样式
const ArrowIcon = styled.span`
  font-size: 12px;
  color: #999;
  margin-left: 8px;
  transition: transform 0.2s ease;
  ${(props) => props.$isOpen && `
    transform: rotate(90deg);
  `}
`;

// 菜单图标容器
const MenuIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  font-size: 16px;
  color: #666;
`;

/**
 * MenuItem 组件 - 菜单项组件
 * @param {Object} props - 组件属性
 * @param {string} props.label - 菜单项标签
 * @param {boolean} props.isSelected - 是否选中
 * @param {boolean} props.hasSelectedChild - 是否有选中的子项
 * @param {Array} props.children - 子菜单数据
 * @param {function} props.onClick - 点击事件处理函数
 * @param {string} props.icon - 图标
 * @param {boolean} props.isParentClickable - 父菜单是否可点击跳转
 */
const MenuItem = ({ 
  label, 
  isSelected = false, 
  hasSelectedChild = false, 
  children = [], 
  onClick, 
  icon,
  isParentClickable = true
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    // 如果有子菜单，切换展开状态
    if (children && children.length > 0) {
      setIsOpen(!isOpen);
    }
    // 只有当没有子菜单或父菜单可点击时才调用点击回调
    if (onClick && (!children || children.length === 0 || isParentClickable)) {
      onClick(label);
    }
  };

  // 如果有子菜单，使用ParentMenuItemContainer包装
  if (children && children.length > 0) {
    return (
      <ParentMenuItemContainer $hasSelectedChild={hasSelectedChild}>
        <MenuItemStyle
          $isSelected={isSelected}
          onClick={handleClick}
        >
          {icon && <MenuIcon>{icon}</MenuIcon>}
          <MenuItemText>
            {label}
          </MenuItemText>
          <ArrowIcon $isOpen={isOpen}>▶</ArrowIcon>
        </MenuItemStyle>
        
        {isOpen && (
          <SubMenuContainer>
            {children.map((child, index) => (
              <MenuItem
                key={index}
                label={child.label}
                isSelected={child.isSelected}
                hasSelectedChild={child.hasSelectedChild}
                children={child.children}
                onClick={onClick}
                icon={child.icon}
                isParentClickable={false} // 设置包含子菜单的菜单不响应跳转
              />
            ))}
          </SubMenuContainer>
        )}
      </ParentMenuItemContainer>
    );
  }

  // 普通菜单项
  return (
    <MenuItemStyle
      $isSelected={isSelected}
      onClick={handleClick}
    >
      {icon && <MenuIcon>{icon}</MenuIcon>}
      <MenuItemText>
        {label}
      </MenuItemText>
    </MenuItemStyle>
  );
};

/**
 * Menu 组件 - 列排菜单组件
 * @param {Object} props - 组件属性
 * @param {Array} props.items - 菜单项数据
 * @param {function} props.onSelect - 菜单项选择事件处理函数
 * @param {string} props.className - 额外的CSS类名
 */
const Menu = ({ items = [], onSelect, className = '' }) => {
  // 用于跟踪当前选中的菜单项
  const [selectedItem, setSelectedItem] = useState('');

  // 递归查找和更新选中状态的辅助函数
  const updateSelectedState = (items, selectedLabel) => {
    return items.map(item => {
      // 创建新对象，避免直接修改原数据
      const newItem = { ...item };
      // 检查当前项是否匹配选中的标签
      newItem.isSelected = item.label === selectedLabel;
      
      // 初始化hasSelectedChild为false
      newItem.hasSelectedChild = false;
      
      // 如果有子菜单，递归更新
      if (item.children && item.children.length > 0) {
        newItem.children = updateSelectedState(item.children, selectedLabel);
        // 检查子菜单中是否有选中的项
        newItem.hasSelectedChild = newItem.children.some(child => 
          child.isSelected || (child.hasSelectedChild && child.hasSelectedChild)
        );
      }
      return newItem;
    });
  };

  const handleMenuItemClick = (label) => {
    // 更新选中状态
    setSelectedItem(label);
    
    // 打开新页面
    window.open('https://www.google.com/', '_blank');
    
    // 调用外部传入的回调函数
    if (onSelect) {
      onSelect(label);
    }
  };

  // 获取带有正确选中状态的菜单项数据
  const itemsWithSelection = updateSelectedState(items, selectedItem);

  return (
    <MenuContainer className={className}>
      {itemsWithSelection.map((item, index) => (
        <MenuItem
          key={index}
          label={item.label}
          isSelected={item.isSelected}
          hasSelectedChild={item.hasSelectedChild}
          children={item.children}
          onClick={handleMenuItemClick}
          icon={item.icon}
          isParentClickable={false} // 设置包含子菜单的父菜单不响应跳转
        />
      ))}
    </MenuContainer>
  );
};

export default Menu;