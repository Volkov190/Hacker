import React from 'react';
import { Link } from 'react-router-dom';
import aPeaceOfNews from '../interfaces/aPeaceOfNews';
import styled from 'styled-components';
import dateCalc from '../functions/dateCalc';

const Wrapper = styled.div`
  padding: 10px;
  height: 120px;
  border-radius: 30px;
  background-color: #e8f4ff;
  & a {
    color: #2590f5;
    text-decoration: none;

    & .info {
      color: #3d3d3d;
    }
  }
`;

interface NeedClassName {
  className: string;
}

const PeaceOfNews = (props: aPeaceOfNews & NeedClassName) => {
  return (
    <Wrapper className={props.className}>
      <Link to={`/news/${props.id}`}>
        <h2>{props.title}</h2>
        <div className="info">
          {props.rating} points | {props.nickname} | {dateCalc(props.date)}
        </div>
      </Link>
    </Wrapper>
  );
};

export { PeaceOfNews };
