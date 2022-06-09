import React from 'react';
import { Link } from 'react-router-dom';
import aPeaceOfNews from '../interfaces/aPeaceOfNews';

const PeaceOfNews = (props: aPeaceOfNews) => {
  return (
    <>
      <Link to={`/news/${props.id}`}>
        <h2>{props.title}</h2>
      </Link>
    </>
  );
};

export { PeaceOfNews };
