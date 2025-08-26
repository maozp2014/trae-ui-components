import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  padding: ${(props) => props.size === 'small' ? '8px 16px' : props.size === 'large' ? '16px 32px' : '12px 24px'};
  border: none;
  border-radius: 4px;
  font-size: ${(props) => props.size === 'small' ? '14px' : props.size === 'large' ? '18px' : '16px'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  
  /* 变体样式 */
  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return `
          background-color: #0070f3;
          color: white;
          &:hover {
            background-color: #0051cc;
          }
          &:disabled {
            background-color: #eaeaea;
            color: #999;
            cursor: not-allowed;
          }
        `;
      case 'secondary':
        return `
          background-color: #f6f8fa;
          color: #333;
          border: 1px solid #eaeaea;
          &:hover {
            background-color: #ebebeb;
          }
          &:disabled {
            background-color: #f9f9f9;
            color: #ccc;
            cursor: not-allowed;
          }
        `;
      case 'danger':
        return `
          background-color: #ff4d4f;
          color: white;
          &:hover {
            background-color: #ff7875;
          }
          &:disabled {
            background-color: #ffebe6;
            color: #ffbbb3;
            cursor: not-allowed;
          }
        `;
      default:
        return `
          background-color: #0070f3;
          color: white;
          &:hover {
            background-color: #0051cc;
          }
        `;
    }
  }}
  
  /* 加载状态 */
  ${(props) => props.loading && `
    opacity: 0.7;
    cursor: wait;
  `}
`;

/**
 * 按钮组件
 * @param {Object} props - 组件属性
 * @param {string} props.children - 按钮内容
 * @param {string} props.variant - 按钮变体：primary, secondary, danger
 * @param {string} props.size - 按钮大小：small, medium, large
 * @param {boolean} props.disabled - 是否禁用
 * @param {boolean} props.loading - 是否加载中
 * @param {function} props.onClick - 点击事件处理函数
 * @param {string} props.type - 按钮类型：button, submit, reset
 * @param {string} props.className - 额外的CSS类名
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false, 
  onClick, 
  type = 'button',
  className = ''
}) => {
  return (
    <ButtonStyle
      variant={variant}
      size={size}
      disabled={disabled || loading}
      loading={loading}
      onClick={onClick}
      type={type}
      className={className}
    >
      {loading ? 'Loading...' : children}
    </ButtonStyle>
  );
};

export default Button;