import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface FeedItem {
  id: number;
  title: string;
  points?: number | null;
  user?: string | null;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url?: string;
  domain?: string;
}

interface News {
  count: number;
  news: Array<FeedItem>;
}

const initialState: News = {
  count: 0,
  news: [],
};

const maxNewsNeed = 100;

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNewsAction: (state, action: PayloadAction<Array<FeedItem>>) => {
      if (state.count + action.payload.length <= maxNewsNeed) {
        state.news = state.news.concat(action.payload);
        state.count = state.news.length;
      } else {
        const newsNeedCount = maxNewsNeed - state.count;
        const newsToAdd = action.payload.slice(0, newsNeedCount);
        state.news = state.news.concat(newsToAdd);
        state.count += newsNeedCount;
      }

      state.news.sort((a, b) => {
        return b.time - a.time;
      });
    },
  },
});

export const selectNews = (state: RootState) => state.news.news;
export const selectNewsCount = (state: RootState) => state.news.count;
export const { addNewsAction } = newsSlice.actions;

export default newsSlice.reducer;
