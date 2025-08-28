import React, { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { TVWatchlistProps, StockItem, ColumnConfig, SortConfig } from './types';

// 默认列配置
const defaultColumns: ColumnConfig[] = [
  { key: 'symbol', title: '代码', visible: true, width: '80px' },
  { key: 'name', title: '名称', visible: true, width: '140px' },
  { key: 'price', title: '价格', visible: true, width: '80px', align: 'right' },
  { key: 'changePercent', title: '涨跌幅', visible: true, width: '80px', align: 'right' },
  { key: 'volume', title: '成交量', visible: true, width: '100px', align: 'right' },
  { key: 'marketCap', title: '市值', visible: false, width: '120px', align: 'right' },
  { key: 'peRatio', title: '市盈率', visible: false, width: '80px', align: 'right' },
  { key: 'sector', title: '行业', visible: false, width: '100px' },
];

// 格式化数字的工具函数
const formatNumber = (value: number | undefined, decimals = 2): string => {
  if (value === undefined) return '-';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

// 格式化大数字（如市值、成交量）
const formatLargeNumber = (value: number | undefined): string => {
  if (value === undefined) return '-';
  if (value >= 1000000000000) {
    return (value / 1000000000000).toFixed(2) + 'T';
  } else if (value >= 1000000000) {
    return (value / 1000000000).toFixed(2) + 'B';
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(2) + 'M';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(2) + 'K';
  }
  return value.toString();
};

// 格式化百分比
const formatPercent = (value: number | undefined): string => {
  if (value === undefined) return '-';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

const WatchlistContainer = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const WatchlistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--color-background-tertiary);
  border-bottom: 1px solid var(--color-border);
`;

const WatchlistTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WatchlistActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-background);
    color: var(--color-text-primary);
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`;

const TableHeader = styled.th<{ align?: 'left' | 'right' | 'center'; width?: string }>`
  padding: 10px 12px;
  text-align: ${(props) => props.align || 'left'};
  background-color: var(--color-background-tertiary);
  border-bottom: 1px solid var(--color-border);
  font-weight: 500;
  color: var(--color-text-secondary);
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  width: ${(props) => props.width || 'auto'};
  white-space: nowrap;

  &:hover {
    background-color: var(--color-background);
  }

  ${(props) => props.align === 'right' && css`
    text-align: right;
  `}
`;

const TableRow = styled.tr<{ isHoverable?: boolean }>`
  background-color: var(--color-background-secondary);
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.2s ease;

  ${({ isHoverable }) => isHoverable && css`
    &:hover {
      background-color: var(--color-background);
    }
  `}
`;

const TableCell = styled.td<{ align?: 'left' | 'right' | 'center'; width?: string }>`
  padding: 10px 12px;
  text-align: ${(props) => props.align || 'left'};
  color: var(--color-text-primary);
  width: ${(props) => props.width || 'auto'};
  white-space: nowrap;

  ${(props) => props.align === 'right' && css`
    text-align: right;
  `}
`;

const PriceChangeCell = styled.td<{ isPositive?: boolean; align?: 'left' | 'right' | 'center' }>`
  padding: 10px 12px;
  text-align: ${({ align }) => align || 'left'};
  color: ${({ isPositive }) => isPositive ? 'var(--color-positive)' : 'var(--color-negative)' };
  white-space: nowrap;

  ${({ align }) => align === 'right' && css`
    text-align: right;
  `}
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: var(--color-text-secondary);
  font-size: 14px;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: var(--color-danger);
  font-size: 14px;
  text-align: center;
  gap: 12px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  color: var(--color-text-secondary);
  font-size: 14px;
  text-align: center;
  gap: 12px;
`;

const SortIcon = styled.span<{ direction: 'asc' | 'desc' | null }>`
  display: inline-block;
  margin-left: 4px;
  font-size: 10px;

  ${({ direction }) => {
    if (direction === 'asc') {
      return css`
        transform: rotate(180deg);
      `;
    } else if (direction === 'desc') {
      return css`
        transform: rotate(0deg);
      `;
    }
    return css`
      opacity: 0;
    `;
  }}
`;

/**
 * TVWatchlist组件
 * 参照TradingView风格实现的股票观察列表组件
 */
const TVWatchlist: React.FC<TVWatchlistProps> = ({
  watchlist,
  onStockClick,
  onRefresh,
  onRemoveStock,
  onAddStock,
  onRenameWatchlist,
  showActions = true,
  isLoading = false,
  error = null,
  autoRefresh = false,
  refreshInterval = 30,
}) => {
  const [columns, setColumns] = useState<ColumnConfig[]>(defaultColumns);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ column: null, direction: null });
  const [visibleColumns, setVisibleColumns] = useState<ColumnConfig[]>(
    columns.filter(col => col.visible)
  );

  // 格式化列数据
  const formatColumnValue = useCallback((columnKey: keyof StockItem, value: any) => {
    switch (columnKey) {
      case 'price':
        return formatNumber(value, 2);
      case 'changePercent':
        return formatPercent(value);
      case 'volume':
      case 'marketCap':
        return formatLargeNumber(value);
      case 'peRatio':
        return formatNumber(value, 1);
      default:
        return value || '-';
    }
  }, []);

  // 排序函数
  const sortedStocks = useCallback((stocks: StockItem[]) => {
    if (!sortConfig.column) return stocks;
    
    return [...stocks].sort((a, b) => {
      const aValue = a[sortConfig.column!];
      const bValue = b[sortConfig.column!];
      
      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [sortConfig]);

  // 处理排序
  const handleSort = useCallback((column: keyof StockItem) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.column === column) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    setSortConfig({ column, direction });
  }, [sortConfig]);

  // 自动刷新逻辑
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (autoRefresh && refreshInterval > 0 && onRefresh) {
      intervalId = setInterval(() => {
        onRefresh();
      }, refreshInterval * 1000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoRefresh, refreshInterval, onRefresh]);

  // 更新可见列
  useEffect(() => {
    setVisibleColumns(columns.filter(col => col.visible));
  }, [columns]);

  // 渲染表头
  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          {visibleColumns.map((column) => (
            <TableHeader
              key={column.key}
              align={column.align}
              width={column.width}
              onClick={() => handleSort(column.key)}
            >
              {column.title}
              <SortIcon direction={sortConfig.column === column.key ? sortConfig.direction : null}>
                ▲
              </SortIcon>
            </TableHeader>
          ))}
          {showActions && (
            <TableHeader width="60px" align="center">
              操作
            </TableHeader>
          )}
        </tr>
      </thead>
    );
  };

  // 渲染表格内容
  const renderTableBody = () => {
    const stocks = sortedStocks(watchlist.stocks);
    
    if (stocks.length === 0) {
      return (
        <tbody>
          <tr>
            <TableCell colSpan={visibleColumns.length + (showActions ? 1 : 0)}>
              <EmptyState>
                <div>观察列表为空</div>
                {onAddStock && (
                  <ActionButton onClick={onAddStock}>
                    添加股票
                  </ActionButton>
                )}
              </EmptyState>
            </TableCell>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {stocks.map((stock) => (
          <TableRow key={stock.symbol} isHoverable={!!onStockClick}>
            {visibleColumns.map((column) => {
              const value = stock[column.key];
              const formattedValue = column.format ? column.format(value) : formatColumnValue(column.key, value);
              
              if (column.key === 'changePercent') {
                return (
                  <PriceChangeCell 
                    key={column.key} 
                    align={column.align} 
                    isPositive={typeof value === 'number' && value >= 0}
                  >
                    {formattedValue}
                  </PriceChangeCell>
                );
              }
              
              return (
                <TableCell key={column.key} align={column.align} width={column.width}>
                  {formattedValue}
                </TableCell>
              );
            })}
            {showActions && (
              <TableCell align="center">
                {onRemoveStock && (
                  <ActionButton onClick={() => onRemoveStock(stock.symbol)}>
                    删除
                  </ActionButton>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </tbody>
    );
  };

  // 渲染加载状态
  if (isLoading) {
    return (
      <WatchlistContainer>
        <WatchlistHeader>
          <WatchlistTitle>{watchlist.name}</WatchlistTitle>
        </WatchlistHeader>
        <LoadingIndicator>加载中...</LoadingIndicator>
      </WatchlistContainer>
    );
  }

  // 渲染错误状态
  if (error) {
    return (
      <WatchlistContainer>
        <WatchlistHeader>
          <WatchlistTitle>{watchlist.name}</WatchlistTitle>
        </WatchlistHeader>
        <ErrorContainer>
          <div>{error}</div>
          {onRefresh && (
            <ActionButton onClick={onRefresh}>
              重试
            </ActionButton>
          )}
        </ErrorContainer>
      </WatchlistContainer>
    );
  }

  // 渲染主内容
  return (
    <WatchlistContainer>
      <WatchlistHeader>
        <WatchlistTitle>
          {watchlist.name}
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            ({watchlist.stocks.length} 只股票)
          </span>
        </WatchlistTitle>
        {showActions && (
          <WatchlistActions>
            {onRenameWatchlist && (
              <ActionButton onClick={onRenameWatchlist}>
                重命名
              </ActionButton>
            )}
            {onAddStock && (
              <ActionButton onClick={onAddStock}>
                添加
              </ActionButton>
            )}
            {onRefresh && (
              <ActionButton onClick={onRefresh}>
                刷新
              </ActionButton>
            )}
          </WatchlistActions>
        )}
      </WatchlistHeader>
      <TableContainer>
        <Table onClick={(e) => {
          if ((e.target as HTMLElement).tagName.toLowerCase() !== 'button' && onStockClick) {
            const row = (e.target as HTMLElement).closest('tr');
            if (row && row.dataset.symbol) {
              const stock = watchlist.stocks.find(s => s.symbol === row.dataset.symbol);
              if (stock) {
                onStockClick(stock);
              }
            }
          }
        }}>
          {renderTableHeader()}
          {renderTableBody()}
        </Table>
      </TableContainer>
    </WatchlistContainer>
  );
};

export default TVWatchlist;