import React, { FC } from 'react';
import { ButtonFrame } from './ButtonFrame';
import { UpdateSVG } from '../icons/UpdateSVG';
import styled from 'styled-components';

interface UpdateByuttonProps {
  onClick: () => void;
  className?: string;
}

const UpdateButton: FC<UpdateByuttonProps> = (props) => {
  return (
    <ButtonFrame onClick={props.onClick} className={props.className}>
      <UpdateSVG />
    </ButtonFrame>
  );
};

export const StyledUpdateButton = styled(UpdateButton)``;
