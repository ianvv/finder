import React, { useEffect } from "react";
import s from "./lyricsPage.module.scss";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import {
  fetchTrack,
  fetchTrackLyrics,
  trackLyricsSelector,
} from "../../redux/slices/trackLyricsSlice";
import { useSelector } from "react-redux";
import { EStatus } from "../../redux/commonDeclaration";
import Loader from "../../components/Loader/Loader";
import Button from "../../UiKit/Button/Button";
import TrackDescription from "../../components/TrackDescription/TrackDescription";

const LyricsPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { lyrics, track, status } = useSelector(trackLyricsSelector);

  const { lyrics_body } = lyrics;
  const { track_name, artist_name, album_name, primary_genres } = track;

  const genre =
    primary_genres?.music_genre_list[0].music_genre.music_genre_name_extended;

  useEffect(() => {
    dispatch(fetchTrackLyrics(Number(id)));
    dispatch(fetchTrack(Number(id)));
  }, []);

  return (
    <>
      {status === EStatus.LOADING ? (
        <Loader />
      ) : status === EStatus.ERROR ? (
        <>Something went wrong...</>
      ) : (
        <>
          <div className={s.lyricsContainer}>
            <TrackDescription
              track_name={track_name}
              artist_name={artist_name}
              genre={genre}
              album_name={album_name}
            />
            <div className={s.lyricsHeader}>
              <h1>The lyrics</h1>
            </div>
            <div className={s.lyricsWrapper}>
              <div className={s.lyricsBody}>
                <div className={s.lyricsText}>{lyrics_body}</div>
              </div>
            </div>
            <Link to={"/"}>
              <div className={s.buttonWrapper}>
                <Button title={"Go back"} />
              </div>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default LyricsPage;
