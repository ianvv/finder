import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../redux/store";
import {useLocation} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import RequestHeader from "../../components/RequestHeader/RequestHeader";
import {fetchSearchedTrack, searchTrackSelector, setSearchValue} from "../../redux/slices/searchTrackSlice";
import {EStatus} from "../../redux/commonDeclaration";
import RequestedTracks from "../../components/RequestedTracks/RequestedTracks";


const SearchedTracksPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const {tracklist, status} = useSelector(searchTrackSelector);

    const pageTitle = location.pathname.split('/')[3].split('%20').join(' ')

    useEffect(() => {
        dispatch(fetchSearchedTrack(pageTitle))
        dispatch(setSearchValue(pageTitle))
    }, []);

    if (tracklist === undefined) {
        return <RequestHeader title={'Something went wrong...'}/>
    }

    if (status === EStatus.LOADING) {
        return <Loader/>
    }

    if (status === EStatus.SUCCESS && tracklist?.length === 0) {
        return <RequestHeader title={'No items were found for your search'}/>
    }


    return (
        <RequestedTracks status={status} title={'Searched tracks'} tracklist={tracklist}/>
    );
};

export default SearchedTracksPage;