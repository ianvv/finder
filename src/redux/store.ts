import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import chartTrack from "./slices/chartTrackSlice";
import trackLyrics from "./slices/trackLyricsSlice";
import searchTrack from "./slices/searchTrackSlice";

export const store = configureStore({
  reducer: {
    chartTrack,
    trackLyrics,
    searchTrack
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
