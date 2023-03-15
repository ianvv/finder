import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  apikey,
  BASIC_URL,
  EStatus,
  ITrackItemFromArray,
} from "../commonDeclaration";
import { RootState } from "../store";

export const fetchChartTracks = createAsyncThunk<ITrackItemFromArray[]>(
  "chartsPage/fetchChartTracks",
  async () => {
    let { data } = await axios.get(
      `${BASIC_URL}chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1${apikey}`
    );
    console.log(data);
    return data.message.body.track_list;
  }
);

interface IChartTracksSliceState {
  tracklist: ITrackItemFromArray[];
  status: EStatus;
}

const initialState: IChartTracksSliceState = {
  tracklist: [] as ITrackItemFromArray[],
  status: EStatus.LOADING,
};

const chartTracksSlice = createSlice({
  name: "chartTracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChartTracks.pending, (state) => {
      state.status = EStatus.LOADING;
      state.tracklist = [];
    });

    builder.addCase(fetchChartTracks.fulfilled, (state, action) => {
      state.tracklist = action.payload;
      state.status = EStatus.SUCCESS;
    });

    builder.addCase(fetchChartTracks.rejected, (state) => {
      state.status = EStatus.ERROR;
      state.tracklist = [];
      console.log("ERROR in chartTrackSlice, 87 row");
    });
  },
});

export const chartTracksSelector = (state: RootState) => state.chartTracks;

export default chartTracksSlice.reducer;
