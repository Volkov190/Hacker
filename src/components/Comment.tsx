import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewsOrComment from '../interfaces/NewsOrComment';
import { Frame } from './Frame';

const Wrapper = styled(Frame)<{ level: number }>`
  margin-top: 40px;
  margin-left: ${(props) => props.level * 100}px;
  cursor: pointer;
`;

const Content = styled.div`
  margin-left: 20px;
`;

export const Comment = (props: { commentId: number; commentLevel: number }) => {
  const [comment, setComment] = useState<NewsOrComment>();
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  useEffect(() => {
    axios(`https://api.hnpwa.com/v0/item/${props.commentId}.json`).then((resp) => {
      if (resp.data) {
        setComment(resp.data);
      }
    });
  }, []);

  if (!comment) return null;

  return (
    <>
      <Wrapper
        level={props.commentLevel}
        onClick={() => {
          setIsAnswerVisible(!isAnswerVisible);
        }}
      >
        <p>
          <b>{comment.user}</b> | {comment.time_ago}
        </p>
        <Content dangerouslySetInnerHTML={{ __html: comment.content }} />
        <div>{comment.comments_count > 0 ? <p>Ответов: {comment.comments_count}</p> : null}</div>
      </Wrapper>
      {isAnswerVisible &&
        comment.comments.map((answer) => {
          return (
            <Comment key={answer.id} commentId={answer.id} commentLevel={props.commentLevel + 1} />
          );
        })}
    </>
  );
};
