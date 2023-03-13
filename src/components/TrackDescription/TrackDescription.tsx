import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import s from "./trackDescription.module.scss";

interface ITrackDescriptionProps {
  track_name: string | boolean;
  artist_name: string | boolean;
  genre: string | boolean;
  album_name: string | boolean;
}

export const noInfo = ' No information yet'

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
          <div className={s.trackTitle}>{track_name !== false ? track_name : `Song: ${noInfo}` }</div>
          <div className={s.trackArtist}>
            <BsFillPersonFill />
            <span>{ artist_name !== false ? artist_name : `Artist: ${noInfo}`}</span>
          </div>
          <div className={s.trackAlbum}>
            Album name: <span>{album_name !== false ? album_name : noInfo}</span>
          </div>
          <div className={s.genre}>
            Genre: <span>{genre !== false ? genre : noInfo}</span>
          </div>
        </div>
      </div>
      <div className={s.bottomLine}></div>
    </>
  );
};

export default TrackDescription;
