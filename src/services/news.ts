import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import NewsOrComment from '../interfaces/NewsOrComment';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.hnpwa.com/v0/item/' }),
  endpoints: (builder) => ({
    getNewsOrCommentById: builder.query<NewsOrComment, number>({
      query: (id) => {
        return `${id}.json`;
      },
    }),
  }),
});

export const { useGetNewsOrCommentByIdQuery } = newsApi;
