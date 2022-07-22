import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonFrame } from './ButtonFrame';
import { ChevronLeft } from '../icons/ChevronLeft';
import styled from 'styled-components';

const GoNewsButton = (props: { className?: string }) => {
  return (
    <Link to="/news">
      <ButtonFrame className={props.className}>
        <ChevronLeft />
      </ButtonFrame>
    </Link>
  );
};

export const StyledGoNewsButton = styled(GoNewsButton)``;
