import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IComment from '../interfaces/IComment';
import Item from '../interfaces/Item';
import { Frame } from './Frame';

const Wrapper = styled(Frame)<{ level: number }>`
  margin-top: 40px;
  margin-left: ${(props) => props.level * 100}px;
  cursor: pointer;

  & .content {
    margin-left: 20px;
  }
`;

export const Comment = (props: IComment) => {
  const [comment, setComment] = useState<Item>();
  const [showAns, setShowAns] = useState(false);
  useEffect(() => {
    axios(`https://api.hnpwa.com/v0/item/${props.id}.json`).then((resp) => {
      if (resp.data) {
        setComment(resp.data);
      }
    });
  }, []);

  if (comment) {
    // console.log(comment);
    return (
      <>
        <Wrapper
          className="commentWrapper"
          level={props.level}
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
            return <Comment key={comm.id} id={comm.id} level={props.level + 1} />;
          })}
      </>
    );
  } else return <></>;
};
