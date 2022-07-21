import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import StoredNews from '../interfaces/StoredNews';

interface News {
  count: number;
  news: StoredNews[];
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
    addNewsAction: (state, action: PayloadAction<StoredNews[]>) => {
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

    deleteNewsAction: (state) => {
      state.count = 0;
      state.news = [];
    },
  },
});

export const selectNews = (state: RootState) => state.news.news;
export const selectNewsCount = (state: RootState) => state.news.count;
export const { addNewsAction, deleteNewsAction } = newsSlice.actions;

export default newsSlice.reducer;
