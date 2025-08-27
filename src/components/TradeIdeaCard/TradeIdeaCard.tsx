import React from 'react';
import styled from 'styled-components';

interface TradeIdeaCardProps {
  title: string;
  summary: string;
  author: string;
  publishedAt: string;
  thumbnailUrl?: string;
  onClick?: () => void;
}

const CardContainer = styled.div`
  background-color: var(--color-background-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-l);
  margin-bottom: var(--spacing-s);
  box-shadow: var(--shadow-card);
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 350px;

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    padding: var(--spacing-m);
  }
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  height: 150px;
  margin-bottom: var(--spacing-m);
  overflow: hidden;
  border-radius: var(--radius-sm);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }

  ${CardContainer}:hover & img {
    transform: scale(1.05);
  }
`;

const Title = styled.h3`
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-s);
  line-height: 1.3;
`;

const Summary = styled.p`
  font-size: var(--font-size-body);
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: var(--spacing-m);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-caption);
  color: var(--color-text-secondary);
  margin-top: auto;
`;

const Author = styled.span`
  font-weight: 500;
`;

const TimeAgo = styled.span`
  opacity: 0.8;
`;

// Helper function to format date to relative time
const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}秒前`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}小时前`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}天前`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}周前`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}个月前`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}年前`;
};

const TradeIdeaCard: React.FC<TradeIdeaCardProps> = ({
  title,
  summary,
  author,
  publishedAt,
  thumbnailUrl,
  onClick,
}) => {
  const timeAgo = formatRelativeTime(publishedAt);

  return (
    <CardContainer onClick={onClick}>
      {thumbnailUrl && (
        <ThumbnailContainer>
          <img src={thumbnailUrl} alt={title} />
        </ThumbnailContainer>
      )}
      <Title>{title}</Title>
      <Summary>{summary}</Summary>
      <MetaInfo>
        <Author>by {author}</Author>
        <TimeAgo>{timeAgo}</TimeAgo>
      </MetaInfo>
    </CardContainer>
  );
};

export default TradeIdeaCard;