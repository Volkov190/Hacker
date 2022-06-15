import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SingleNews } from '../components/SingleNews';
import dateCalc from '../functions/dateCalc';
import Item from '../interfaces/Item';
import { Comment } from '../components/Comment';

export const PeaceOfNewsPage = () => {
  const navigate = useNavigate();
  const [peaceOfNews, setPeaceOfNews] = useState<Item>();
  const { newsId } = useParams();
  const goNotFound = () => navigate('/notfound');
  useEffect(() => {
    const id = parseInt(newsId!);
    if (isNaN(id)) {
      goNotFound();
    } else {
      axios(`https://api.hnpwa.com/v0/item/${id}.json`).then((resp) => {
        if (resp.data !== null) {
          // console.log(resp.data);
          setPeaceOfNews(resp.data);
        } else goNotFound();
      });
    }
  }, [newsId]);
  let dateStr = '';
  if (peaceOfNews) {
    dateStr = dateCalc(peaceOfNews?.time);
  }
  if (peaceOfNews) {
    return (
      <>
        <SingleNews
          title={peaceOfNews.title}
          url={peaceOfNews.url}
          dateStr={dateStr}
          comments_count={peaceOfNews.comments_count}
          author={peaceOfNews.user}
        />
        {peaceOfNews.comments.map((comment) => {
          return <Comment key={comment.id} id={comment.id} level={0} />;
        })}
      </>
    );
  } else {
    return <></>;
  }
};
