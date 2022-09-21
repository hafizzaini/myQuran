import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import pageConfigReducer from './pageConfigSlice';
import verseReducer from './verse';

const makeStore = () =>
  configureStore({
    reducer: {
      pageConfig: pageConfigReducer,
      verse: verseReducer,
    },
    devTools: true,
  });

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
