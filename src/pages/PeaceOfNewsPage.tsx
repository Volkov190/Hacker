import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FeedItem from '../interfaces/FeedItem';

export const PeaceOfNewsPage = () => {
  const navigate = useNavigate();
  const [peaceOfNews, setPeaceOfNews] = useState<FeedItem>();
  const { newsId } = useParams();
  const goNotFound = () => navigate('/notfound');
  const id = parseInt(newsId!);
  useEffect(() => {
    axios(`https://api.hnpwa.com/v0/item/${id}.json`).then((resp) => {
      if (resp.data !== null) {
        setPeaceOfNews(resp.data);
      } else goNotFound();
    });
  }, [id]);
  let dateStr = '';
  if (peaceOfNews) {
    const date = new Date(peaceOfNews?.time * 1000);
    dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
  return (
    <>
      <h1>{peaceOfNews?.title}</h1>
      <a href={peaceOfNews?.url}>{peaceOfNews?.url}</a>
      <div>{dateStr}</div>
      <div>Автор: {peaceOfNews?.user}</div>
      <div>{peaceOfNews?.comments_count} комментариев</div>
    </>
  );
};
