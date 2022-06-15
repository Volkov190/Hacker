import React from 'react';
import { Link } from 'react-router-dom';
import aPeaceOfNews from '../interfaces/aPeaceOfNews';
import styled from 'styled-components';
import dateCalc from '../functions/dateCalc';
import { Frame } from './Frame';

const Wrapper = styled(Frame)`
  height: 120px;
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
