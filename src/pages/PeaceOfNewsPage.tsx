import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SingleNews } from '../components/SingleNews';
import dateCalc from '../functions/dateCalc';
import Item from '../interfaces/Item';
import { Comment } from '../components/Comment';
import styled from 'styled-components';
import { UpdateButton } from '../components/UpdateButton';
import { GoNewsButton } from '../components/GoNewsButton';

const Wrapper = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;

  & .title {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 0;
    color: #576cd4;
  }

  & .updateBtn {
    top: 35px;
    right: 50px;

    @media (max-width: 426px) {
      right: 10px;
    }
  }

  & .goNewsBtn {
    top: 35px;
    right: 125px;

    @media (max-width: 426px) {
      left: 10px;
    }
  }
`;

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
          setPeaceOfNews(resp.data);
        } else goNotFound();
      });
    }

    const interval = setInterval(() => {
      axios(`https://api.hnpwa.com/v0/item/${id}.json`).then((resp) => {
        if (resp.data !== null) {
          setPeaceOfNews(resp.data);
        } else goNotFound();
      });
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [newsId]);

  let dateStr = '';
  if (peaceOfNews) {
    dateStr = dateCalc(peaceOfNews?.time);
  }
  if (peaceOfNews) {
    return (
      <Wrapper>
        <div className="title">
          <h1>{peaceOfNews.title}</h1>
        </div>
        <SingleNews
          className="singleNews"
          url={peaceOfNews.url}
          dateStr={dateStr}
          comments_count={peaceOfNews.comments_count}
          author={peaceOfNews.user}
        />
        {peaceOfNews.comments.map((comment) => {
          return <Comment key={comment.id} id={comment.id} level={0} />;
        })}
        <UpdateButton
          className="updateBtn"
          onClick={() => {
            axios(`https://api.hnpwa.com/v0/item/${newsId}.json`).then((resp) => {
              if (resp.data !== null) {
                setPeaceOfNews(resp.data);
              } else goNotFound();
            });
          }}
        />
        <GoNewsButton className="goNewsBtn" />
      </Wrapper>
    );
  } else {
    return <></>;
  }
};
