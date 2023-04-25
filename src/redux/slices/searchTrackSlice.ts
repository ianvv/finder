import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASIC_URL,
  EStatus,
  ISearchRequest,
  ITrackItemFromArray,
} from "../commonDeclaration";
import { RootState } from "../store";

const apikey = "&apikey=06e166665e01610df031e7711f263f29";

type TFetchSearchedTracksParams = {
  searchValue: string;
  page: number;
};

export const fetchSearchedTracks = createAsyncThunk<
  ISearchRequest,
  TFetchSearchedTracksParams
>("navbar/fetchSearchedTrack", async (params) => {
  const { searchValue, page } = params;

  let { data } = await axios.get(
    `${BASIC_URL}track.search?q_track=${searchValue}&page_size=10&page=${page}&s_track_rating=desc${apikey}`
  );
  // console.log(data);
  console.log(data.message);
  return data.message;
  // return data.message.body.track_list;
});

interface ISearchedTracksSliceState {
  tracklist: ITrackItemFromArray[];
  status: EStatus;
  searchValue: string;
  page: number;
  totalItems: number;
}

const initialState: ISearchedTracksSliceState = {
  tracklist: [] as ITrackItemFromArray[],
  // tracklist: [],
  totalItems: 0,
  status: EStatus.LOADING,
  searchValue: "",
  page: 1,
};

const searchedTracksSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setPage(state) {
      state.page = state.page + 1;
    },
    setFirstPage(state) {
      state.page = 1;
    },
    resetTracklist(state) {
      state.tracklist = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchedTracks.pending, (state) => {
      state.status = EStatus.LOADING;
      // state.tracklist = [];
    });

    builder.addCase(fetchSearchedTracks.fulfilled, (state, action) => {
      let prevArr = state.tracklist;
      let newArr = action.payload.body.track_list;
      state.tracklist = [...prevArr, ...newArr];
      state.totalItems = action.payload.header.available;
      state.status = EStatus.SUCCESS;
    });

    builder.addCase(fetchSearchedTracks.rejected, (state) => {
      console.log("ERROR in chartTrackSlice, 87 row");
      state.status = EStatus.ERROR;
      state.tracklist = [];
    });
  },
});

export const searchedTracksSelector = (state: RootState) =>
  state.searchedTracks;

export const { setSearchValue, setPage, setFirstPage, resetTracklist } =
  searchedTracksSlice.actions;

export default searchedTracksSlice.reducer;

// type TSearchTracksParams = {
//   searchValue: string;
//   page: number;
// };

// export const fetchSearchedTracks = createAsyncThunk<
//   ITrackItemFromArray[],
//   TSearchTracksParams
// >("navbar/fetchSearchedTrack", async (params) => {
//   const { searchValue, page } = params;
//
//   let { data } = await axios.get(
//     `${BASIC_URL}track.search?q_track=${searchValue}&page_size=10&page=${page}&s_track_rating=desc${apikey}`
//   );
//   return data.message.body.track_list;
// });
