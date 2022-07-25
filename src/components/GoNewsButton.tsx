import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ButtonFrame } from './ButtonFrame';
import { ReactComponent as ChevronLeft } from '../icons/ChevronLeft.svg';
import styled from 'styled-components';

const GoNewsButton: FC<{ className?: string }> = (props) => {
  return (
    <Link to="/news">
      <ButtonFrame className={props.className}>
        <ChevronLeft />
      </ButtonFrame>
    </Link>
  );
};

export const StyledGoNewsButton = styled(GoNewsButton)``;
