import React from 'react';
import styled from 'styled-components';
import { Frame } from './Frame';
import { UpdateSVG } from '../icons/UpdateSVG';

const Wrapper = styled(Frame)`
  position: fixed;
  background-color: #576cd4;
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

export const UpdateButton = (props: { onClick: () => void; className?: string }) => {
  return (
    <Wrapper onClick={props.onClick} className={props.className}>
      <UpdateSVG />
    </Wrapper>
  );
};
