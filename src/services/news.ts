import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import NewsOrComment from '../interfaces/NewsOrComment';
import StoredNews from '../interfaces/StoredNews';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.hnpwa.com/v0/' }),
  endpoints: (builder) => ({
    getNewsOrCommentById: builder.query<NewsOrComment, number>({
      query: (id) => {
        return `item/${id}.json`;
      },
    }),
    getNewest: builder.query<StoredNews[], number>({
      async queryFn(newsCount, _queryApi, _extraOptions, fetchWithBQ) {
        let pageNum = 1;
        let results: StoredNews[] = [];
        while (results.length < newsCount) {
          const resp = await fetchWithBQ(`newest/${pageNum}.json`);
          const newsCountNeed = newsCount - results.length;
          const data = resp.data as StoredNews[];
          results = [...results, ...data.slice(0, newsCountNeed)];
          ++pageNum;
        }

        return { data: results };
      },
    }),
  }),
});

export const { useGetNewsOrCommentByIdQuery, useGetNewestQuery } = newsApi;
