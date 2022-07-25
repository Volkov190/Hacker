import React, { FC } from 'react';
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
`;

const Info = styled.div`
  color: #3d3d3d;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

const PieceOfNews: FC<PieceOfNewsMainInfo & { className?: string }> = (props) => {
  return (
    <StyledLink to={`/news/${props.id}`} className={props.className}>
      <Wrapper>
        <h2>{props.title}</h2>
        <Info>
          {props.rating} points | {props.nickname} | {dateCalc(props.date)}
        </Info>
      </Wrapper>
    </StyledLink>
  );
};

export const StyledPieceOfNews = styled(PieceOfNews)``;
