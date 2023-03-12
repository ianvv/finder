import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import {
  apikey,
  BASIC_URL,
  EStatus,
  ISingleTrackItem,
} from "../commonDeclaration";

interface ILyrics {
  lyrics_body: string;
  lyrics_copyright: string;
  lyrics_id: number;
  pixel_tracking_url: string;
  script_tracking_url: string;
  updated_time: string;
}

export const fetchTrackLyrics = createAsyncThunk<ILyrics, number>(
  "lyricsPage/fetchLyrics",
  async (id) => {
    let { data } = await axios.get(
      `${BASIC_URL}track.lyrics.get?track_id=${id}${apikey}`
    );
    return data.message.body.lyrics;
  }
);

export const fetchTrack = createAsyncThunk<ISingleTrackItem, number>(
  "lyricsPage/fetchTrack",
  async (id) => {
    let { data } = await axios.get(
      `${BASIC_URL}track.get?track_id=${id}${apikey}`
    );
    return data.message.body.track;
  }
);

interface ITrackLyricsSliceState {
  lyrics: ILyrics;
  track: ISingleTrackItem;
  status: EStatus;
}

const initialState: ITrackLyricsSliceState = {
  lyrics: {} as ILyrics,
  track: {} as ISingleTrackItem,
  status: EStatus.LOADING,
};

const trackLyricsSlice = createSlice({
  name: "music",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // -----------------FETCH TRACK LYRICS-----------------
    builder.addCase(fetchTrackLyrics.pending, (state) => {
      state.status = EStatus.LOADING;
      state.lyrics = {} as ILyrics;
    });

    builder.addCase(fetchTrackLyrics.fulfilled, (state, action) => {
      state.lyrics = action.payload;
      state.status = EStatus.SUCCESS;
    });

    builder.addCase(fetchTrackLyrics.rejected, (state) => {
      state.status = EStatus.ERROR;
      state.lyrics = {} as ILyrics;
      console.log("ERROR in trackLyricsSlice, 57 row");
    });

    // -----------------FETCH TRACK-----------------

    builder.addCase(fetchTrack.pending, (state) => {
      state.status = EStatus.LOADING;
      state.track = {} as ISingleTrackItem;
    });

    builder.addCase(fetchTrack.fulfilled, (state, action) => {
      state.track = action.payload;
      state.status = EStatus.SUCCESS;
    });

    builder.addCase(fetchTrack.rejected, (state) => {
      state.status = EStatus.ERROR;
      state.track = {} as ISingleTrackItem;
      console.log("ERROR in trackLyricsSlice, 57 row");
    });
  },
});

export const trackLyricsSelector = (state: RootState) => state.trackLyrics;

export default trackLyricsSlice.reducer;
