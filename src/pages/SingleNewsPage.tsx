import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SingleNews } from '../components/SingleNews';
import dateCalc from '../functions/dateCalc';
import NewsOrComment from '../interfaces/NewsOrComment';
import { Comment } from '../components/Comment';
import styled from 'styled-components';
import { StyledUpdateButton } from '../components/UpdateButton';
import { StyledGoNewsButton } from '../components/GoNewsButton';

const Wrapper = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;

  & ${StyledUpdateButton} {
    top: 35px;
    right: 50px;

    @media (max-width: 426px) {
      right: 10px;
    }
  }

  & ${StyledGoNewsButton} {
    top: 35px;
    right: 125px;

    @media (max-width: 426px) {
      left: 10px;
    }
  }
`;

const Title = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 0;
  color: #576cd4;
`;

export const SingleNewsPage = () => {
  const navigate = useNavigate();
  const [pieceOfNews, setPieceOfNews] = useState<NewsOrComment>();
  const { newsId } = useParams();
  const goNotFound = () => navigate('/notfound');
  useEffect(() => {
    const id = parseInt(newsId!);
    if (isNaN(id)) return goNotFound();

    axios(`https://api.hnpwa.com/v0/item/${id}.json`).then((resp) => {
      if (resp.data !== null) {
        setPieceOfNews(resp.data);
      } else goNotFound();
    });

    const interval = setInterval(() => {
      axios(`https://api.hnpwa.com/v0/item/${id}.json`).then((resp) => {
        if (resp.data !== null) {
          setPieceOfNews(resp.data);
        } else goNotFound();
      });
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [newsId]);

  if (!pieceOfNews) return null;

  let dateStr = '';
  dateStr = dateCalc(pieceOfNews?.time);

  return (
    <Wrapper>
      <Title>
        <h1>{pieceOfNews.title}</h1>
      </Title>
      <SingleNews
        url={pieceOfNews.url}
        dateStr={dateStr}
        comments_count={pieceOfNews.comments_count}
        author={pieceOfNews.user}
      />
      {pieceOfNews.comments.map((comment) => {
        return <Comment key={comment.id} commentId={comment.id} commentLevel={0} />;
      })}
      <StyledUpdateButton
        onClick={() => {
          axios(`https://api.hnpwa.com/v0/item/${newsId}.json`).then((resp) => {
            if (resp.data !== null) {
              setPieceOfNews(resp.data);
            } else goNotFound();
          });
        }}
      />
      <StyledGoNewsButton />
    </Wrapper>
  );
};
