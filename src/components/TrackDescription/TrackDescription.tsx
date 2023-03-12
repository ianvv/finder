import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import s from "./trackDescription.module.scss";

interface ITrackDescriptionProps {
  track_name: string;
  artist_name: string;
  genre: string;
  album_name: string;
}

const TrackDescription: React.FC<ITrackDescriptionProps> = ({
  track_name,
  artist_name,
  genre,
  album_name,
}) => {
  return (
    <>
      <div className={s.container}>
        <img
          src="https://marketplace.canva.com/EAFHHJD5ReI/1/0/1600w/canva-black-red-grunge-moon-light-music-album-cover-hCgJtjS-6AE.jpg"
          alt="album cover"
          className={s.albumCover}
        />
        <div className={s.trackInfo}>
          <div className={s.trackTitle}>{track_name}</div>
          <div className={s.trackArtist}>
            <BsFillPersonFill />
            {artist_name}
          </div>
          <div className={s.trackAlbum}>
            Album name: <span>{album_name}</span>
          </div>
          <div className={s.genre}>
            Genre: <span>{genre}</span>
          </div>
        </div>
      </div>
      <div className={s.bottomLine}></div>
    </>
  );
};

export default TrackDescription;
