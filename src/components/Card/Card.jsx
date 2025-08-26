import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div`
  background-color: #ffffff;
  border-radius: ${(props) => props.rounded ? '12px' : '8px'};
  box-shadow: ${(props) => props.elevated ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' };
  padding: ${(props) => props.padded ? '24px' : '16px'};
  transition: all 0.2s ease;
  border: ${(props) => props.outlined ? '1px solid #eaeaea' : 'none'};
  
  &:hover {
    ${(props) => props.hoverable && 'transform: translateY(-2px);'}
  }
`;

const CardHeader = styled.div`
  margin-bottom: ${(props) => props.noPadding ? '0' : '16px'};
  ${(props) => props.noPadding && 'padding-bottom: 16px; border-bottom: 1px solid #eaeaea;'}
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #1a1a1a;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const CardContent = styled.div`
  margin-bottom: ${(props) => props.noPadding ? '0' : '16px'};
  ${(props) => props.noPadding && 'padding: 16px 0;'}
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  ${(props) => props.noPadding && 'padding-top: 16px; border-top: 1px solid #eaeaea;'}
`;

/**
 * 卡片组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 卡片内容
 * @param {string} props.title - 卡片标题
 * @param {string} props.description - 卡片描述
 * @param {React.ReactNode} props.header - 自定义头部内容
 * @param {React.ReactNode} props.footer - 自定义底部内容
 * @param {boolean} props.elevated - 是否有更强的阴影效果
 * @param {boolean} props.rounded - 是否有更圆润的边角
 * @param {boolean} props.outlined - 是否有边框
 * @param {boolean} props.padded - 是否增加内边距
 * @param {boolean} props.hoverable - 鼠标悬停时是否有动效
 * @param {string} props.className - 额外的CSS类名
 */
const Card = ({ 
  children, 
  title, 
  description, 
  header, 
  footer, 
  elevated = false, 
  rounded = false, 
  outlined = false, 
  padded = false, 
  hoverable = false,
  className = ''
}) => {
  const hasHeaderContent = title || description || header;
  const hasFooterContent = footer;
  const noPadding = !padded && hasHeaderContent && hasFooterContent;

  return (
    <CardStyle
      elevated={elevated}
      rounded={rounded}
      outlined={outlined}
      padded={padded}
      hoverable={hoverable}
      className={className}
    >
      {hasHeaderContent && (
        <CardHeader noPadding={noPadding}>
          {header || (
            <>
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </>
          )}
        </CardHeader>
      )}
      
      <CardContent noPadding={noPadding}>
        {children}
      </CardContent>
      
      {hasFooterContent && (
        <CardFooter noPadding={noPadding}>
          {footer}
        </CardFooter>
      )}
    </CardStyle>
  );
};

export default Card;