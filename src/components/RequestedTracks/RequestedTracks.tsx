import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import RequestHeader from "../RequestHeader/RequestHeader";
import TrackItem from "../TrackItem/TrackItem";
import Button from "../../UiKit/Button/Button";
import {setSearchValue} from "../../redux/slices/searchTrackSlice";
import {EStatus, ITrackItemFromArray} from "../../redux/commonDeclaration";
import s from "./requestedTracks.module.scss";

interface RequestedTracksProps {
    tracklist: ITrackItemFromArray[];
    title: string;
    status: EStatus;
}

const RequestedTracks: React.FC<RequestedTracksProps> = ({tracklist, title, status}) => {

    const dispatch = useAppDispatch()
    const location = useLocation();
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(`/`);
        dispatch(setSearchValue(''))
    }

    return (
        <div className={s.requestedTracks}>
            {status === EStatus.SUCCESS && <RequestHeader title={title}/>}
            <div className={s.tracklist}>
                {
                    tracklist.map((track) => (
                        <TrackItem {...track} key={track.track.track_id}/>
                    ))
                }
            </div>
            <div className={s.buttons}>
                {location.pathname !== '/' && <Button title={"Go home"} onClick={handleButtonClick}/>}
            </div>
        </div>
    );
}

export default RequestedTracks;