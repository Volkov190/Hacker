import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addNewsAction, selectNews, selectNewsCount } from '../slices/newsSlice';
import { AppThunk } from '../app/store';
import { PeaceOfNews } from '../components/PeaceOfNews';

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
    <>
      <h1>News</h1>
      {news.map((aPeaceOfNews) => (
        // <h2 key={aPeaceOfNews.id}>{aPeaceOfNews.title}</h2>
        <PeaceOfNews
          key={aPeaceOfNews.id}
          title={aPeaceOfNews.title}
          rating={aPeaceOfNews.points}
          nickname={aPeaceOfNews.user}
        />
      ))}
    </>
  );
}

export { NewsPage };
