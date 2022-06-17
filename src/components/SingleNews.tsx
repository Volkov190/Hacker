import React from 'react';
import styled from 'styled-components';
import singleNews from '../interfaces/singleNews';
import { Frame } from './Frame';

const Wrapper = styled(Frame)`
  & .title {
    margin: 0;
    color: #576cd4;
    margin-bottom: 20px;
  }

  & .content {
    margin-bottom: 10px;
  }

  & .time {
    margin-top: 20px;
  }
`;

export const SingleNews = (props: singleNews & { className?: string }) => {
  return (
    <Wrapper>
      <a href={props.url}>{props.url}</a>
      <div className="time content">{props.dateStr}</div>
      <div className="content">
        Автор: <b>{props.author}</b>
      </div>
      <div className="content">Комментариев: {props.comments_count}</div>
    </Wrapper>
  );
};
