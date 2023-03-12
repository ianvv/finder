import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import s from "./search.module.scss";
import { useAppDispatch } from "../../redux/store";
import { fetchSearchedTrack } from "../../redux/slices/searchTrackSlice";

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useAppDispatch();

  const handleClear = (): void => {
    setSearchValue("");
  };

  return (
    <div className={s.formWrapper}>
      <form className={s.searchForm}>
        <span className={s.searchIcon}>
          <IoIosSearch size={18} />
        </span>
        <input
          type="text"
          placeholder="Search the track"
          className={s.searchInput}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue.length > 0 && (
          <span className={s.closeIcon} onClick={handleClear}>
            <IoCloseOutline size={20} />
          </span>
        )}
      </form>
      <button
        className={s.searchButton}
        onClick={() => dispatch(fetchSearchedTrack(searchValue))}
      >
        <IoIosSearch size={20} />
      </button>
    </div>
  );
};

export default Search;
