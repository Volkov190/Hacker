import React from 'react';
import { ButtonFrame } from './ButtonFrame';
import { UpdateSVG } from '../icons/UpdateSVG';
import styled from 'styled-components';

const UpdateButton = (props: { onClick: () => void; className?: string }) => {
  return (
    <ButtonFrame onClick={props.onClick} className={props.className}>
      <UpdateSVG />
    </ButtonFrame>
  );
};

export const StyledUpdateButton = styled(UpdateButton)``;
