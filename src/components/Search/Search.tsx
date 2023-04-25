import React from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import s from "./search.module.scss";
import { useAppDispatch } from "../../redux/store";
import {
  fetchSearchedTracks,
  resetTracklist,
  searchedTracksSelector,
  setFirstPage,
  setPage,
  setSearchValue,
} from "../../redux/slices/searchTrackSlice";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Search: React.FC = () => {
  const { searchValue } = useSelector(searchedTracksSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClear = (): void => {
    dispatch(setSearchValue(""));
  };

  const searchResultHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(resetTracklist());
    dispatch(setFirstPage());
    navigate(`/search/tracks/${searchValue}`);
    location.pathname.split("/")[1] === "search" &&
      dispatch(fetchSearchedTracks({ searchValue, page: 1 }));
  };

  return (
    <div className={s.formWrapper}>
      <form className={s.searchForm}>
        <div className={s.inputWrapper}>
          <span className={s.searchIcon}>
            <IoIosSearch size={18} />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className={s.searchInput}
            value={searchValue}
            onChange={(e) => dispatch(setSearchValue(e.target.value))}
          />
          {searchValue.length > 0 && (
            <span className={s.closeIcon} onClick={handleClear}>
              <IoCloseOutline size={20} />
            </span>
          )}
        </div>
        <button
          disabled={searchValue === ""}
          className={s.searchButton}
          onClick={(event) => searchResultHandler(event)}
        >
          <IoIosSearch size={20} />
        </button>
      </form>
    </div>
  );
};

export default Search;
