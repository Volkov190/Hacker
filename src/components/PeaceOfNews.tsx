import React from 'react';

interface aPeaceOfNews {
  title: string;
  rating: number | null | undefined;
  nickname: string | null | undefined;
}

const PeaceOfNews = (props: aPeaceOfNews) => {
  return (
    <>
      <h2>{props.title}</h2>
    </>
  );
};

export { PeaceOfNews };
