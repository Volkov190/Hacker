import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import NewsOrComment from '../interfaces/NewsOrComment';
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
  const [comment, setComment] = useState<NewsOrComment>();
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const { data, isLoading } = useGetNewsOrCommentByIdQuery(props.commentId);
  useEffect(() => {
    if (!isLoading) setComment(data);
  }, [data, isLoading]);

  return (
    <>
      <Wrapper
        level={props.commentLevel}
        onClick={() => {
          setIsAnswerVisible(!isAnswerVisible);
        }}
      >
        {!isLoading && typeof comment !== 'undefined' ? (
          <>
            <p>
              <b>{comment.user}</b> | {comment.time_ago}
            </p>
            <Content dangerouslySetInnerHTML={{ __html: comment.content }} />
            <div>
              {comment.comments_count > 0 ? <p>Ответов: {comment.comments_count}</p> : null}
            </div>
          </>
        ) : (
          'Loading...'
        )}
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
