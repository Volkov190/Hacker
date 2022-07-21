import React from 'react';
import { Link } from 'react-router-dom';
import PieceOfNewsMainInfo from '../interfaces/PieceOfNewsMainInfo';
import styled from 'styled-components';
import dateCalc from '../functions/dateCalc';
import { Frame } from './Frame';

const Wrapper = styled(Frame)`
  height: 120px;
  color: #2590f5;
  text-decoration: none;

  @media (max-width: 850px) {
    font-size: 10pt;
  }

  & .info {
    color: #3d3d3d;
  }
`;

interface NeedClassName {
  className: string;
}

export const PieceOfNews = (props: PieceOfNewsMainInfo & NeedClassName) => {
  return (
    <Link
      to={`/news/${props.id}`}
      style={{ textDecoration: 'none', display: 'block' }}
      className={props.className}
    >
      <Wrapper>
        <h2>{props.title}</h2>
        <div className="info">
          {props.rating} points | {props.nickname} | {dateCalc(props.date)}
        </div>
      </Wrapper>
    </Link>
  );
};
