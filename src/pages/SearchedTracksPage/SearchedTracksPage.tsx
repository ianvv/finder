import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import RequestHeader from "../../components/RequestHeader/RequestHeader";
import {
  fetchSearchedTracks,
  searchedTracksSelector,
  setSearchValue,
} from "../../redux/slices/searchTrackSlice";
import { EStatus, ITrackItemFromArray } from "../../redux/commonDeclaration";
import RequestedTracks from "../../components/RequestedTracks/RequestedTracks";

const SearchedTracksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { tracklist, status, page, totalItems } = useSelector(
    searchedTracksSelector
  );

  const searchValue = location.pathname.split("/")[3];
  const codedPathname = location.pathname.split("/")[3].split("%20").join(" ");
  const decodedPathname = decodeURIComponent(codedPathname);

  console.log(decodeURIComponent("какfasfas"));

  useEffect(() => {
    dispatch(fetchSearchedTracks({ searchValue, page }));
    dispatch(setSearchValue(decodedPathname));
  }, [page]);

  if (tracklist === undefined) {
    return <RequestHeader title={"Something went wrong..."} />;
  }

  if (status === EStatus.LOADING) {
    return <Loader />;
  }

  if (status === EStatus.SUCCESS && tracklist?.length === 0) {
    return (
      <RequestHeader
        title={`No items were found for your search:  "${decodedPathname}"`}
      />
    );
  }

  return (
    <RequestedTracks
      status={status}
      title={`Searched tracks  ( ${totalItems} items )`}
      tracklist={tracklist}
    />
  );
};

export default SearchedTracksPage;

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useAppDispatch } from "../../redux/store";
// import { useLocation } from "react-router-dom";
// import Loader from "../../components/Loader/Loader";
// import RequestHeader from "../../components/RequestHeader/RequestHeader";
// import {
//   fetchSearchedTracks,
//   searchedTracksSelector,
//   setSearchValue,
// } from "../../redux/slices/searchTrackSlice";
// import { EStatus, ITrackItemFromArray } from "../../redux/commonDeclaration";
// import RequestedTracks from "../../components/RequestedTracks/RequestedTracks";
//
// const SearchedTracksPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const location = useLocation();
//   const { tracklist, status, searchValue } = useSelector(
//     searchedTracksSelector
//   );
//   const [items, setItems] = useState<ITrackItemFromArray[]>([]);
//   const [page, setPage] = useState(1);
//
//   console.log("tracklist");
//   console.log(tracklist);
//
//   // const searchValue = location.pathname.split("/")[3].split("%20").join(" ");
//
//   console.log("searchValue");
//   console.log(searchValue);
//
//   console.log("page");
//   console.log(page);
//
//   useEffect(() => {
//     dispatch(fetchSearchedTracks({ searchValue, page }));
//     dispatch(setSearchValue(searchValue));
//     const setItemsFunc = () => setItems([...items, ...tracklist]);
//     setItemsFunc();
//   }, [page]);
//
//   const handleLoadMoreClick = () => {
//     setPage(page + 1);
//   };
//
//   if (tracklist === undefined) {
//     return <RequestHeader title={"Something went wrong..."} />;
//   }
//
//   if (status === EStatus.LOADING && tracklist.length === 0) {
//     return <Loader />;
//   }
//
//   if (status === EStatus.SUCCESS && tracklist?.length === 0) {
//     return <RequestHeader title={"No items were found for your search"} />;
//   }
//
//   return (
//     <RequestedTracks
//       status={status}
//       title={"Searched tracks"}
//       items={items}
//       loadMoreHandler={handleLoadMoreClick}
//     />
//   );
// };
//
// export default SearchedTracksPage;
