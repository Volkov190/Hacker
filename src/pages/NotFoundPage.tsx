import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <>
      <h1>Page not found!</h1>
      <Link to="/">To news list</Link>
    </>
  );
};
