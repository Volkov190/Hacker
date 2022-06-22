import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addNewsAction, deleteNewsAction, selectNews, selectNewsCount } from '../slices/newsSlice';
import { AppThunk } from '../app/store';
import { PeaceOfNews } from '../components/PeaceOfNews';
import styled from 'styled-components';
import { UpdateButton } from '../components/UpdateButton';

const Wrapper = styled.div`
  padding: 20px;

  @media (max-width: 425px) {
    padding: 0;
  }

  & .title {
    width: 70%;
    padding-left: 40px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    color: #576cd4;
  }

  & .peaceOfNews {
    margin-bottom: 40px;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 30px;

    @media (max-width: 850px) {
      width: 100%;
    }
  }

  & .peaceOfNews:last-of-type {
    margin-bottom: 0;
  }

  & .updateBtn {
    right: 50px;
    top: 35px;
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
      <div className="title">
        <h1>News</h1>
      </div>
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
      <UpdateButton
        className="updateBtn"
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

export { NewsPage };
