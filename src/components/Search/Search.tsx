import React from "react";
import {IoIosSearch} from "react-icons/io";
import {IoCloseOutline} from "react-icons/io5";
import s from "./search.module.scss";
import {useAppDispatch} from "../../redux/store";
import {fetchSearchedTrack, searchTrackSelector, setSearchValue} from "../../redux/slices/searchTrackSlice";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";

const Search: React.FC = () => {

    const {searchValue} = useSelector(searchTrackSelector)
    const dispatch = useAppDispatch();

    const handleClear = (): void => {
        dispatch(setSearchValue(""));
    };

    return (
        <div className={s.formWrapper}>
            <form className={s.searchForm}>
        <span className={s.searchIcon}>
          <IoIosSearch size={18}/>
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
            <IoCloseOutline size={20}/>
          </span>
                )}
            </form>
            <Link to={`search/tracks/${searchValue}`}>
                <button
                    className={s.searchButton}
                    onClick={() => dispatch(fetchSearchedTrack(searchValue))}
                >
                    <IoIosSearch size={20}/>
                </button>
            </Link>
        </div>
    );
};

export default Search;
