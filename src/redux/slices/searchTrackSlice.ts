import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {
    apikey,
    BASIC_URL,
    EStatus,
    ITrackItemFromArray,
} from "../commonDeclaration";
import {RootState} from "../store";

export const fetchSearchedTrack = createAsyncThunk<ITrackItemFromArray[],
    string>("navbar/fetchSearchedTrack", async (trackTitle) => {
    let {data} = await axios.get(
        `${BASIC_URL}track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc${apikey}`
    );
    return data.message.body.track_list;
});

interface ISearchTrackSliceState {
    tracklist: ITrackItemFromArray[];
    status: EStatus;
    searchValue: string;
}

const initialState: ISearchTrackSliceState = {
    tracklist: [] as ITrackItemFromArray[],
    status: EStatus.LOADING,
    searchValue: '',
};

const chartTrackSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
    },
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
            console.log("ERROR in chartTrackSlice, 87 row");
            state.status = EStatus.ERROR;
            state.tracklist = [];
        });
    },
});

export const searchTrackSelector = (state: RootState) => state.searchTrack;

export const {setSearchValue} =
    chartTrackSlice.actions;

export default chartTrackSlice.reducer;
