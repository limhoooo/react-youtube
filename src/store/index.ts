import { configureStore } from '@reduxjs/toolkit';
import videoSlice from './reducers/videoSlice';

export const store = configureStore({
  reducer: {
    video: videoSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
