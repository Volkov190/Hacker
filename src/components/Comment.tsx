import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useGetNewsOrCommentByIdQuery } from '../services/news';
import { Frame } from './Frame';

const Wrapper = styled(Frame)<{ level: number }>`
  margin-top: 40px;
  margin-left: ${(props) => props.level * 100}px;
  cursor: pointer;
`;

const Content = styled.div`
  margin-left: 20px;
`;

interface CommentProps {
  commentId: number;
  commentLevel: number;
}

export const Comment: FC<CommentProps> = (props) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const { data: comment, isLoading } = useGetNewsOrCommentByIdQuery(props.commentId);

  if (isLoading || typeof comment === 'undefined')
    return <Wrapper level={props.commentLevel}>Loading...</Wrapper>;

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
        <div>{comment.comments_count > 0 && <p>Ответов: {comment.comments_count}</p>}</div>
      </Wrapper>
      {isAnswerVisible &&
        comment &&
        comment.comments.map((answer) => {
          return (
            <Comment key={answer.id} commentId={answer.id} commentLevel={props.commentLevel + 1} />
          );
        })}
    </>
  );
};
