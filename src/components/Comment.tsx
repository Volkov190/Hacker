import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import Comment from '../interfaces/Comment';
import NewsOrComment from '../interfaces/NewsOrComment';
import { Frame } from './Frame';

const Wrapper = styled(Frame)<{ level: number }>`
  margin-top: 40px;
  margin-left: ${(props) => props.level * 100}px;
  cursor: pointer;

  & .content {
    margin-left: 20px;
  }
`;

export const Comment = (props: { commentId: number; commentLevel: number }) => {
  const [comment, setComment] = useState<NewsOrComment>();
  const [showAns, setShowAns] = useState(false);
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
        className="commentWrapper"
        level={props.commentLevel}
        onClick={() => {
          setShowAns(!showAns);
        }}
      >
        <p>
          <b>{comment.user}</b> | {comment.time_ago}
        </p>
        <div className="content" dangerouslySetInnerHTML={{ __html: comment.content }}></div>
        <div>{comment.comments_count > 0 ? <p>Ответов: {comment.comments_count}</p> : null}</div>
      </Wrapper>
      {showAns &&
        comment.comments.map((comm) => {
          return (
            <Comment key={comm.id} commentId={comm.id} commentLevel={props.commentLevel + 1} />
          );
        })}
    </>
  );
};
