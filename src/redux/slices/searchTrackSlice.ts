import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  apikey,
  BASIC_URL,
  EStatus,
  ITrackItemFromArray,
} from "../commonDeclaration";
import { RootState } from "../store";

export const fetchSearchedTrack = createAsyncThunk<
  ITrackItemFromArray[],
  string
>("navbar/fetchSearchedTrack", async (trackTitle) => {
  let { data } = await axios.get(
    `${BASIC_URL}track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc${apikey}`
  );
  console.log(data.message.body.track_list);
  return data.message.body.track_list;
});

interface ISearchTrackSliceState {
  tracklist: ITrackItemFromArray[];
  status: EStatus;
}

const initialState: ISearchTrackSliceState = {
  tracklist: [] as ITrackItemFromArray[],
  status: EStatus.LOADING,
};

const chartTrackSlice = createSlice({
  name: "music",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchedTrack.pending, (state) => {
      state.status = EStatus.LOADING;
      state.tracklist = [];
    });

    builder.addCase(fetchSearchedTrack.fulfilled, (state, action) => {
      state.tracklist = action.payload;
      state.status = EStatus.SUCCESS;
    });

    builder.addCase(fetchSearchedTrack.rejected, (state) => {
      state.status = EStatus.ERROR;
      state.tracklist = [];
      console.log("ERROR in chartTrackSlice, 87 row");
    });
  },
});

export const chartTrackSelector = (state: RootState) => state.chartTrack;

export default chartTrackSlice.reducer;
