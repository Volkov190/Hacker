import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addNewsAction, deleteNewsAction, selectNews, selectNewsCount } from '../slices/newsSlice';
import { AppThunk } from '../app/store';
import { StyledPieceOfNews } from '../components/PieceOfNews';
import styled from 'styled-components';
import { StyledUpdateButton } from '../components/UpdateButton';

const Wrapper = styled.div`
  padding: 20px;

  @media (max-width: 425px) {
    padding: 0;
  }

  & ${StyledPieceOfNews} {
    margin-bottom: 40px;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 30px;

    @media (max-width: 850px) {
      width: 100%;
    }
  }

  & ${StyledPieceOfNews}:last-of-type {
    margin-bottom: 0;
  }

  & ${StyledUpdateButton} {
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

function getNewsPart(pageNum: number): AppThunk {
  return (dispatch) => {
    axios.get('https://api.hnpwa.com/v0/newest/' + pageNum + '.json').then((resp) => {
      dispatch(addNewsAction(resp.data));
    });
  };
}

export function NewsPage() {
  const dispatch = useAppDispatch();
  const newsCount = useAppSelector(selectNewsCount);
  const news = useAppSelector(selectNews);
  const [pageNum, setPageNum] = useState(1);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (newsCount < 100) {
      dispatch(getNewsPart(pageNum));
      setPageNum(pageNum + 1);
    } else {
      setPageNum(1);
      timeout = setTimeout(() => {
        dispatch(deleteNewsAction());
      }, 60000);
    }

    return () => clearInterval(timeout);
  }, [newsCount]);

  return (
    <Wrapper>
      <Title>
        <h1>News</h1>
      </Title>
      {newsCount === 100
        ? news.map((aPieceOfNews) => (
            <StyledPieceOfNews
              key={aPieceOfNews.id}
              id={aPieceOfNews.id}
              title={aPieceOfNews.title}
              rating={aPieceOfNews.points}
              nickname={aPieceOfNews.user}
              date={aPieceOfNews.time}
            />
          ))
        : 'Loading...'}
      <StyledUpdateButton
        onClick={() => {
          if (newsCount > 0) {
            dispatch(deleteNewsAction());
            setPageNum(1);
          }
        }}
      />
    </Wrapper>
  );
}
