import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import RequestHeader from "../RequestHeader/RequestHeader";
import TrackItem from "../TrackItem/TrackItem";
import Button from "../../UiKit/Button/Button";
import { setPage, setSearchValue } from "../../redux/slices/searchTrackSlice";
import { EStatus, ITrackItemFromArray } from "../../redux/commonDeclaration";
import s from "./requestedTracks.module.scss";
import { ScrollToTopButton } from "../../UiKit/ScrollToTopButton/ScrollToTopButton";
import { decodePathname } from "../../utils/decodePathname";

interface RequestedTracksProps {
  tracklist: ITrackItemFromArray[];
  title: string;
  status: EStatus;
  totalItems?: number;
}

const RequestedTracks: React.FC<RequestedTracksProps> = ({
  tracklist,
  title,
  status,
  totalItems,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = () => {
    navigate(`/`);
    dispatch(setSearchValue(""));
  };

  const goBackHandleButton = () => {
    const searchedValue = decodePathname(location.pathname.split("/")[3]);

    if (
      location.pathname.split("/")[1] === "search" &&
      location.pathname.split("/")[3] === searchedValue
    ) {
      navigate(`/search/tracks/${searchedValue}`);
    }

    // console.log("vvv");
    // console.log(vvv);
  };

  // const loadMoreHandleButton: (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => void = (event) => {
  //   event.preventDefault();
  //   dispatch(setPage());
  // };

  // const loadMoreHandleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
  // dispatch(setPage());
  // if (loadMoreButtonRef.current) {
  //   loadMoreButtonRef.current.scrollIntoView({ behavior: "smooth" });
  // }
  // event.preventDefault();
  // const savedScrollPosition = window.scrollY;
  // window.scrollTo(10, savedScrollPosition);
  // };

  //
  const loadMoreHandleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const savedScrollPosition = window.scrollY;
    dispatch(setPage());
    window.scrollTo(10, savedScrollPosition);
  };
  //
  return (
    <div className={s.requestedTracks}>
      <ScrollToTopButton />
      {status === EStatus.SUCCESS && (
        <>
          <button onClick={goBackHandleButton}> Go back </button>
          <RequestHeader title={title} />
        </>
      )}
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
        {location.pathname !== "/" &&
          (totalItems && totalItems > tracklist.length ? (
            <div className={s.buttons}>
              <Button
                title={"Load more"}
                onClick={loadMoreHandleButton}
                customRef={loadMoreButtonRef}
              />
            </div>
          ) : (
            <div className={s.itemsEnd}>You have scrolled to the end...</div>
          ))}
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
