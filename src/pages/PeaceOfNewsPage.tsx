import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import dateCalc from '../functions/dateCalc';
import FeedItem from '../interfaces/FeedItem';

const Wrapper = styled.div`
  background-color: #e8f4ff;
  border-radius: 30px;
  padding: 20px;
  & .title {
    margin: 0;
    color: #576cd4;
    margin-bottom: 20px;
  }

  & a {
    color: #2590f5;
    text-decoration: none;
  }

  & .content {
    color: #3d3d3d;
    margin-bottom: 10px;
  }

  & .time {
    margin-top: 20px;
  }
`;

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
    dateStr = dateCalc(peaceOfNews?.time);
  }
  return (
    <Wrapper>
      <h1 className="title">{peaceOfNews?.title}</h1>
      <a href={peaceOfNews?.url}>{peaceOfNews?.url}</a>
      <div className="time content">{dateStr}</div>
      <div className="content">Автор: {peaceOfNews?.user}</div>
      <div className="content">{peaceOfNews?.comments_count} комментариев</div>
    </Wrapper>
  );
};
