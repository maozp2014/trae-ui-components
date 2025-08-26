import React, { useState } from 'react';
import styled, { css } from 'styled-components';

/**
 * 表格单元格组件
 */
const TableCell = styled.td.attrs(props => ({
  align: props.align || 'left',
}))`
  padding: 12px 16px;
  border-bottom: 1px solid ${props => props.theme.borderColor || '#e1e4e8'};
  font-size: 14px;
  color: ${props => props.theme.textColor || '#24292e'};
  text-align: ${props => props.align};
  ${props => props.highlight && css`
    color: ${props.theme.primaryColor || '#0366d6'};
    font-weight: 500;
  `}
`;

/**
 * 表格行组件
 */
const TableRow = styled.tr`
  background-color: ${props => props.theme.backgroundColor || '#ffffff'};
  &:hover {
    background-color: ${props => props.theme.hoverBackgroundColor || '#f6f8fa'};
  }
  ${props => props.disabled && `
    opacity: 0.6;
  `}
`;

/**
 * 表格头部单元格组件
 */
const TableHeaderCell = styled.th`
  padding: 12px 16px;
  border-bottom: 2px solid ${props => props.theme.borderColor || '#e1e4e8'};
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.textColor || '#24292e'};
  text-align: left;
  background-color: ${props => props.theme.headerBackgroundColor || '#f6f8fa'};
`;

/**
 * 表格容器组件
 */
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${props => props.theme.borderColor || '#e1e4e8'};
  border-radius: ${props => props.theme.borderRadius || '6px'};
  background-color: ${props => props.theme.backgroundColor || '#ffffff'};
`;

/**
 * 表格组件
 */
const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${props => props.theme.fontFamily || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'};
`;

/**
 * 版本状态标签组件
 */
const StatusBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  ${props => props.status === '有效' ? `
    background-color: #dcffe4;
    color: #1a7f37;
  ` : `
    background-color: #f6f8fa;
    color: #586069;
  `}
`;

/**
 * 操作按钮组件
 */
const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.primaryColor || '#0366d6'};
  cursor: pointer;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

/**
 * 表格组件 - 用于展示版本管理数据
 * @param {Object} props - 组件属性
 * @param {Array} props.data - 表格数据数组
 * @param {Array} props.columns - 表格列配置
 * @param {Function} props.onRowClick - 行点击事件处理函数
 * @param {Object} props.theme - 主题配置
 */
const Table = ({ data = [], columns = [], onRowClick, theme = {} }) => {
  // 定义默认主题
  const defaultTheme = {
    primaryColor: '#0366d6',
    backgroundColor: '#ffffff',
    hoverBackgroundColor: '#f6f8fa',
    headerBackgroundColor: '#f6f8fa',
    textColor: '#24292e',
    borderColor: '#e1e4e8',
    borderRadius: '6px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  };

  // 合并主题
  const mergedTheme = { ...defaultTheme, ...theme };

  // 如果没有数据，显示空状态
  if (!data || data.length === 0) {
    return (
      <TableContainer theme={mergedTheme}>
        <div style={{ padding: '24px', textAlign: 'center', color: '#586069' }}>
          暂无数据
        </div>
      </TableContainer>
    );
  }

  return (
    <TableContainer theme={mergedTheme}>
      <TableElement theme={mergedTheme}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <TableHeaderCell key={index} theme={mergedTheme}>
                {column.title}
              </TableHeaderCell>
            ))}
            <TableHeaderCell key="action-header" theme={mergedTheme} align="right">
              操作
            </TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            // 阻止无效行的点击事件冒泡
            const handleRowClick = row.status === '无效' ? (e) => e.stopPropagation() : () => onRowClick && onRowClick(row);
            
            return (
              <TableRow
                key={rowIndex}
                onClick={handleRowClick}
                theme={mergedTheme}
                style={{ cursor: row.status === '无效' ? 'default' : 'pointer' }}
              >
                {columns.map((column, colIndex) => {
                  const value = row[column.dataIndex];
                  
                  // 自定义渲染单元格
                  if (column.render) {
                    return (
                      <TableCell key={colIndex} theme={mergedTheme}>
                        {column.render(value, row, rowIndex)}
                      </TableCell>
                    );
                  }

                  // 特殊处理状态列
                  if (column.dataIndex === 'status') {
                    return (
                      <TableCell key={colIndex} theme={mergedTheme}>
                        <StatusBadge status={value}>{value}</StatusBadge>
                      </TableCell>
                    );
                  }

                  // 特殊处理版本号列
                  if (column.dataIndex === 'version') {
                    return (
                      <TableCell key={colIndex} theme={mergedTheme} highlight>
                        {value}
                      </TableCell>
                    );
                  }

                  // 默认渲染
                  return (
                    <TableCell key={colIndex} theme={mergedTheme}>
                      {value}
                    </TableCell>
                  );
                })}
                <TableCell key="action" theme={mergedTheme} align="right">
                  {row.status !== '无效' && (
                    <ActionButton theme={mergedTheme}>
                      &gt;
                    </ActionButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </TableElement>
    </TableContainer>
  );
};

export default Table;