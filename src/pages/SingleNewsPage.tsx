import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SingleNews } from '../components/SingleNews';
import dateCalc from '../functions/dateCalc';
import { Comment } from '../components/Comment';
import styled from 'styled-components';
import { StyledUpdateButton } from '../components/UpdateButton';
import { StyledGoNewsButton } from '../components/GoNewsButton';
import { useGetNewsOrCommentByIdQuery } from '../services/news';

const Wrapper = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;

  ${StyledUpdateButton} {
    top: 35px;
    right: 50px;

    @media (max-width: 426px) {
      right: 10px;
    }
  }

  ${StyledGoNewsButton} {
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
  const { newsId } = useParams();
  const goNotFound = () => navigate('/notfound');

  const {
    data: pieceOfNews,
    refetch,
    error,
  } = useGetNewsOrCommentByIdQuery(parseInt(newsId!), {
    pollingInterval: 60000,
  });

  useEffect(() => {
    if (error || isNaN(parseInt(newsId!)) || pieceOfNews === null) goNotFound();
  }, [pieceOfNews, newsId]);

  if (!pieceOfNews) return null;

  const dateStr = dateCalc(pieceOfNews?.time);

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
          refetch();
        }}
      />
      <StyledGoNewsButton />
    </Wrapper>
  );
};
