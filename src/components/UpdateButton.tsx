import React, { FC } from 'react';
import { ButtonFrame } from './ButtonFrame';
import { ReactComponent as UpdateSVG } from '../icons/UpdateSVG.svg';
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
