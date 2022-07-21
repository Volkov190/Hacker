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

export const SingleNewsPage = () => {
  const navigate = useNavigate();
  const [pieceOfNews, setPieceOfNews] = useState<Item>();
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

  let dateStr = '';
  if (pieceOfNews) {
    dateStr = dateCalc(pieceOfNews?.time);
  }
  if (pieceOfNews) {
    return (
      <Wrapper>
        <div className="title">
          <h1>{pieceOfNews.title}</h1>
        </div>
        <SingleNews
          className="singleNews"
          url={pieceOfNews.url}
          dateStr={dateStr}
          comments_count={pieceOfNews.comments_count}
          author={pieceOfNews.user}
        />
        {pieceOfNews.comments.map((comment) => {
          return <Comment key={comment.id} id={comment.id} level={0} />;
        })}
        <UpdateButton
          className="updateBtn"
          onClick={() => {
            axios(`https://api.hnpwa.com/v0/item/${newsId}.json`).then((resp) => {
              if (resp.data !== null) {
                setPieceOfNews(resp.data);
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
