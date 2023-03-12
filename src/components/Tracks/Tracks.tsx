import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import s from "./tracks.module.scss";
import {
  chartTrackSelector,
  fetchChartTracks,
} from "../../redux/slices/chartTrackSlice";
import Loader from "../Loader/Loader";
import Track from "./Track/Track";
import { EStatus } from "../../redux/commonDeclaration";

const Tracks: React.FC = () => {
  const dispatch = useAppDispatch();

  const { tracklist, status } = useSelector(chartTrackSelector);

  useEffect(() => {
    dispatch(fetchChartTracks());
  }, [dispatch]);

  return (
    <div className={s.tracksHeader}>
      {status === EStatus.SUCCESS && <h1>Top charts</h1>}
      <div>
        {status === EStatus.LOADING ? (
          <Loader />
        ) : (
          tracklist &&
          tracklist.length > 0 &&
          tracklist &&
          tracklist.map((track) => (
            <Track {...track} key={track.track.track_id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Tracks;
