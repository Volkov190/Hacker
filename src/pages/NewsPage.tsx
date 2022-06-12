import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addNewsAction, selectNews, selectNewsCount } from '../slices/newsSlice';
import { AppThunk } from '../app/store';
import { PeaceOfNews } from '../components/PeaceOfNews';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
  & .title {
    margin-left: 30px;
    margin-top: 0;
    color: #576cd4;
  }

  & .peaceOfNews {
    margin-bottom: 40px;
  }

  & .peaceOfNews:last-of-type {
    margin-bottom: 0;
  }
`;

function getNewsPart(pageNum: number): AppThunk {
  return (dispatch) => {
    axios.get('https://api.hnpwa.com/v0/newest/' + pageNum + '.json').then((resp) => {
      dispatch(addNewsAction(resp.data));
    });
  };
}

function NewsPage() {
  const dispatch = useAppDispatch();
  const newsCount = useAppSelector(selectNewsCount);
  const news = useAppSelector(selectNews);
  const [pageNum, setPageNum] = useState(1);
  useEffect(() => {
    if (newsCount < 100) dispatch(getNewsPart(pageNum));
    setPageNum(pageNum + 1);
  }, [newsCount]);

  return (
    <Wrapper>
      <h1 className="title">News</h1>
      {news.map((aPeaceOfNews) => (
        <PeaceOfNews
          className={'peaceOfNews'}
          key={aPeaceOfNews.id}
          id={aPeaceOfNews.id}
          title={aPeaceOfNews.title}
          rating={aPeaceOfNews.points}
          nickname={aPeaceOfNews.user}
          date={aPeaceOfNews.time}
        />
      ))}
    </Wrapper>
  );
}

export { NewsPage };
