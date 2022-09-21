import { showNotification } from '@mantine/notifications';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clientApi } from 'lib/api';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './store';

export const getVerseAsync = createAsyncThunk(
  'verse/verses',
  async (): Promise<any> => {
    try {
      const response = await clientApi.post('/getVerse');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const verseSlice = createSlice({
  name: 'verse',
  initialState: { verses: [], testVerse: 1 },
  reducers: {
    testVerse: (state) => {
      console.log('testVerse');
      state.testVerse += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: any) => {
        return {
          ...state,
          ...action.payload.verse,
        };
      })
      .addCase(getVerseAsync.fulfilled, (state, action) => {
        state.verses = action.payload?.verses;
      })

      .addCase(getVerseAsync.rejected, (state, action) => {
        if (typeof window !== 'undefined') {
          showNotification({
            color: 'red',
            title: 'Error',
            message: action.error.message || '',
          });
        }
      });
  },
});

export const selectVerses = (state: AppState) => state.verse.verses;
export const { testVerse } = verseSlice.actions;

export default verseSlice.reducer;
