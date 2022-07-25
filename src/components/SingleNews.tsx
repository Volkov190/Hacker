import React, { FC } from 'react';
import styled from 'styled-components';
import NewsOnSeparatePage from '../interfaces/NewsOnSeparatePage';
import { Frame } from './Frame';

const Content = styled.div`
  margin-bottom: 10px;
`;

const Time = styled(Content)`
  margin-top: 20px;
`;

export const SingleNews: FC<NewsOnSeparatePage> = (props) => {
  return (
    <Frame>
      <a href={props.url}>{props.url}</a>
      <Time>{props.dateStr}</Time>
      <Content>
        Автор: <b>{props.author}</b>
      </Content>
      <Content>Комментариев: {props.comments_count}</Content>
    </Frame>
  );
};
