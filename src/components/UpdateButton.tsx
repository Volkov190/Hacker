import React from 'react';
import { ButtonFrame } from './ButtonFrame';
import { UpdateSVG } from '../icons/UpdateSVG';

export const UpdateButton = (props: { onClick: () => void; className?: string }) => {
  return (
    <ButtonFrame onClick={props.onClick} className={props.className}>
      <UpdateSVG />
    </ButtonFrame>
  );
};
