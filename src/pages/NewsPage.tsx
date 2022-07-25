import React from 'react';
import { StyledPieceOfNews } from '../components/PieceOfNews';
import styled from 'styled-components';
import { StyledUpdateButton } from '../components/UpdateButton';
import { useGetNewestQuery } from '../services/news';

const Wrapper = styled.div`
  padding: 20px;

  @media (max-width: 425px) {
    padding: 0;
  }

  ${StyledPieceOfNews} {
    margin-bottom: 40px;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 30px;

    @media (max-width: 850px) {
      width: 100%;
    }
  }

  ${StyledPieceOfNews}:last-of-type {
    margin-bottom: 0;
  }

  ${StyledUpdateButton} {
    right: 50px;
    top: 35px;
  }
`;

const Title = styled.div`
  width: 70%;
  padding-left: 40px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  color: #576cd4;
`;

export function NewsPage() {
  const { data: news, refetch } = useGetNewestQuery(100, { pollingInterval: 60000 });

  if (typeof news === 'undefined') return null;

  return (
    <Wrapper>
      <Title>
        <h1>News</h1>
      </Title>
      {news.map((aPieceOfNews) => (
        <StyledPieceOfNews
          key={aPieceOfNews.id}
          id={aPieceOfNews.id}
          title={aPieceOfNews.title}
          rating={aPieceOfNews.points}
          nickname={aPieceOfNews.user}
          date={aPieceOfNews.time}
        />
      ))}
      <StyledUpdateButton
        onClick={() => {
          refetch();
        }}
      />
    </Wrapper>
  );
}
