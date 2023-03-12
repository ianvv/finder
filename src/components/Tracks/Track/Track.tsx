import React from "react";
import s from "./track.module.scss";
import { Link } from "react-router-dom";
import { ITrackItemFromArray } from "../../../redux/commonDeclaration";
import Button from "../../../UiKit/Button/Button";

const Track: React.FC<ITrackItemFromArray> = (track) => {
  const { track_name, artist_name, album_name, track_id } = track.track;

  return (
    <div className={s.article}>
      <div className={s.articleDetails}>
        <div className={s.articlerank}>{track_name}</div>
        <div className={s.articleTitle}>{artist_name}</div>
        <div className={s.articleLastWeek}>Album: {album_name}</div>
      </div>
      <Link to={`lyrics/track/${track_id}`}>
        <Button title={"View lyrics"} />
      </Link>
    </div>
  );
};

export default Track;
