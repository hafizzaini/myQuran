import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { LayoutConfig } from '../components/DefaultLayout/DefaultLayout/DefaultLayout';
import { AppState } from './store';

const pageConfigInitialState: LayoutConfig = {
  showNavbar: 'full',
  isDarkMode: false,
};

const pageConfigSlice = createSlice({
  name: 'pageConfig',
  initialState: pageConfigInitialState,
  reducers: {
    emptyLayout: (state) => {
      state.showNavbar = 'none';
    },
    fullLayout: (state) => {
      state.showNavbar = 'full';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.pageConfig,
      };
    });
  },
});

export const selectShowNavbar = (state: AppState) => state.pageConfig.showNavbar;

export const { emptyLayout, fullLayout } = pageConfigSlice.actions;

export default pageConfigSlice.reducer;
