import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputStyle = styled.input`
  width: 100%;
  padding: ${(props) => props.size === 'small' ? '8px 12px' : props.size === 'large' ? '12px 16px' : '10px 14px'};
  font-size: ${(props) => props.size === 'small' ? '14px' : props.size === 'large' ? '18px' : '16px'};
  border: 1px solid ${(props) => {
    if (props.error) return '#ff4d4f';
    if (props.focused) return '#0070f3';
    return '#d9d9d9';
  }};
  border-radius: 4px;
  background-color: ${(props) => props.disabled ? '#f5f5f5' : '#ffffff'};
  color: ${(props) => props.disabled ? '#bfbfbf' : '#333333'};
  transition: all 0.2s ease;
  outline: none;
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'text'};
  
  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.1);
  }
  
  &::placeholder {
    color: #bfbfbf;
  }
  
  ${(props) => props.error && `
    box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.1);
  `}
  
  ${(props) => props.fullWidth && 'width: 100%;'}
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
  ${(props) => props.required && '::after { content: " *"; color: #ff4d4f; }'}
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: #ff4d4f;
  margin-top: 4px;
`;

/**
 * 输入框组件
 * @param {Object} props - 组件属性
 * @param {string} props.type - 输入类型：text, password, email, number等
 * @param {string} props.value - 输入值
 * @param {function} props.onChange - 输入变化处理函数
 * @param {string} props.placeholder - 占位文本
 * @param {string} props.label - 输入框标签
 * @param {boolean} props.disabled - 是否禁用
 * @param {boolean} props.readOnly - 是否只读
 * @param {boolean} props.required - 是否必填
 * @param {string} props.size - 输入框大小：small, medium, large
 * @param {string} props.error - 错误信息
 * @param {boolean} props.fullWidth - 是否占满父容器宽度
 * @param {string} props.className - 额外的CSS类名
 * @param {Object} props.inputProps - 传递给原生input的额外属性
 */
const Input = ({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '', 
  label = '', 
  disabled = false, 
  readOnly = false, 
  required = false, 
  size = 'medium', 
  error = '', 
  fullWidth = true,
  className = '',
  inputProps = {}
}) => {
  const [focused, setFocused] = React.useState(false);

  const handleFocus = (e) => {
    setFocused(true);
    if (inputProps.onFocus) {
      inputProps.onFocus(e);
    }
  };

  const handleBlur = (e) => {
    setFocused(false);
    if (inputProps.onBlur) {
      inputProps.onBlur(e);
    }
  };

  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <InputContainer className={className}>
      {label && (
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>
      )}
      
      <InputStyle
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        size={size}
        focused={focused}
        error={!!error}
        fullWidth={fullWidth}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...inputProps}
      />
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;