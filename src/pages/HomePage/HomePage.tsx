import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../redux/store";
import Loader from "../../components/Loader/Loader";
import RequestHeader from "../../components/RequestHeader/RequestHeader";
import RequestedTracks from "../../components/RequestedTracks/RequestedTracks";
import {chartTrackSelector, fetchChartTracks,} from "../../redux/slices/chartTrackSlice";
import {EStatus} from "../../redux/commonDeclaration";

const HomePage: React.FC = () => {

    const dispatch = useAppDispatch();
    const {tracklist, status} = useSelector(chartTrackSelector);

    useEffect(() => {
        dispatch(fetchChartTracks());
    }, [dispatch]);

    if (tracklist === undefined) {
        return <RequestHeader title={'Something went wrong...'}/>
    }

    if (status === EStatus.LOADING) {
        return <Loader/>
    }

    if (status === EStatus.SUCCESS && tracklist?.length === 0) {
        return <RequestHeader title={'No items were found for your search'}/>
    }

    return <RequestedTracks status={status} title={'Top charts'} tracklist={tracklist}/>
};

export default HomePage;