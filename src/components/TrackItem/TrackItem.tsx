import React from "react";
import s from "./trackItem.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { ITrackItemFromArray } from "../../redux/commonDeclaration";
import Button from "../../UiKit/Button/Button";
import { useAppDispatch } from "../../redux/store";
import { setSearchValue } from "../../redux/slices/searchTrackSlice";
import { noInfo } from "../TrackDescription/TrackDescription";

interface ITrackItemProps {
  track: ITrackItemFromArray;
  items: ITrackItemFromArray[];
  location: ReturnType<typeof useLocation>;
}

const TrackItem: React.FC<ITrackItemProps> = ({ track, items, location }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { track_name, artist_name, album_name, track_id } = track.track;

  const handleButtonClick = () => {
    navigate(`/lyrics/track/${track_id}`);
    dispatch(setSearchValue(""));
  };
  const rating =
    items.findIndex((item) => item.track.track_id === track_id) + 1;
  return (
    <div className={s.article}>
      {location.pathname === "/" && (
        <div className={s.rating}>{rating < 10 ? "0" + rating : rating}</div>
      )}
      <div className={s.articleDetails}>
        <button className={s.trackName} onClick={handleButtonClick}>
          {track_name !== "" ? track_name : `Song: ${noInfo}`}
        </button>
        <div className={s.artistName}>
          {artist_name !== "" ? artist_name : `Artist ${noInfo}`}
        </div>
        <div className={s.articleLastWeek}>
          Album: {album_name !== "" ? album_name : noInfo}
        </div>
      </div>
      <Button title={"View lyrics"} onClick={handleButtonClick} />
    </div>
  );
};

export default TrackItem;
