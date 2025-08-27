import React from 'react';
import styled from 'styled-components';

interface SectionHeaderProps {
  title: string;
  collapsible?: boolean;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);

  ${(props) => props.collapsible && `
    cursor: pointer;
    &:hover {
      background-color: var(--color-background-secondary);
      padding-left: var(--spacing-xs);
      padding-right: var(--spacing-xs);
      border-radius: var(--radius-sm);
      transition: all var(--transition-fast);
    }
  `}

  @media (max-width: 768px) {
    font-size: var(--font-size-h3);
  }
`;

const ChevronIcon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  transition: transform var(--transition-fast);
  ${(props) => props.isCollapsed && `
    transform: rotate(-90deg);
  `}
`;

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  collapsible = false,
  isCollapsed = false,
  onToggle,
}) => {
  const handleClick = () => {
    if (collapsible && onToggle) {
      onToggle();
    }
  };

  return (
    <HeaderContainer 
      collapsible={collapsible} 
      onClick={handleClick}
      style={{ cursor: collapsible ? 'pointer' : 'default' }}
    >
      <h2>{title}</h2>
      {collapsible && (
        <ChevronIcon isCollapsed={isCollapsed}>
          ▶
        </ChevronIcon>
      )}
    </HeaderContainer>
  );
};

export default SectionHeader;