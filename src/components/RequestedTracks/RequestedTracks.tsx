import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import RequestHeader from "../RequestHeader/RequestHeader";
import TrackItem from "../TrackItem/TrackItem";
import Button from "../../UiKit/Button/Button";
import { setPage, setSearchValue } from "../../redux/slices/searchTrackSlice";
import { EStatus, ITrackItemFromArray } from "../../redux/commonDeclaration";
import s from "./requestedTracks.module.scss";
import { ScrollToTopButton } from "../../UiKit/ScrollToTopButton/ScrollToTopButton";

interface RequestedTracksProps {
  tracklist: ITrackItemFromArray[];
  title: string;
  status: EStatus;
}

const RequestedTracks: React.FC<RequestedTracksProps> = ({
  tracklist,
  title,
  status,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/`);
    dispatch(setSearchValue(""));
  };

  return (
    <div className={s.requestedTracks}>
      <ScrollToTopButton />
      {status === EStatus.SUCCESS && <RequestHeader title={title} />}
      <div className={s.tracklist}>
        {status === EStatus.SUCCESS &&
          tracklist.length > 0 &&
          tracklist.map((track) => (
            <TrackItem
              location={location}
              track={{ ...track }}
              items={tracklist}
              key={track.track.track_id}
            />
          ))}
      </div>
      <div className={s.buttonsWrapper}>
        {location.pathname !== "/" && (
          <div className={s.buttons}>
            <Button title={"Load more"} onClick={() => dispatch(setPage())} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestedTracks;

// import React from 'react';
// import {useLocation, useNavigate} from "react-router-dom";
// import {useAppDispatch} from "../../redux/store";
// import RequestHeader from "../RequestHeader/RequestHeader";
// import TrackItem from "../TrackItem/TrackItem";
// import Button from "../../UiKit/Button/Button";
// import {setSearchValue} from "../../redux/slices/searchTrackSlice";
// import {EStatus, ITrackItemFromArray} from "../../redux/commonDeclaration";
// import s from "./requestedTracks.module.scss";
//
// interface RequestedTracksProps {
//     items: ITrackItemFromArray[];
//     title: string;
//     status: EStatus;
//     loadMoreHandler?: () => void;
// }
//
// const RequestedTracks: React.FC<RequestedTracksProps> = ({items, title, status, loadMoreHandler}) => {
//
//     const dispatch = useAppDispatch()
//     const location = useLocation();
//     const navigate = useNavigate();
//
//     const handleButtonClick = () => {
//         navigate(`/`);
//         dispatch(setSearchValue(''))
//     }
//
//     return (
//         <div className={s.requestedTracks}>
//             {status === EStatus.SUCCESS && <RequestHeader title={title}/>}
//             <div className={s.tracklist}>
//                 {
//                     items.map((track) => (
//                         <TrackItem {...track} key={track.track.track_id}/>
//                     ))
//                 }
//             </div>
//             {/*<div className={s.buttons}>*/}
//
//             <Button title={"Load more"} onClick={loadMoreHandler}/>
//
//             {/*{location.pathname !== '/' && <Button title={"Go home"} onClick={handleButtonClick}/>}*/}
//             {/*</div>*/}
//         </div>
//     );
// }
//
// export default RequestedTracks;
