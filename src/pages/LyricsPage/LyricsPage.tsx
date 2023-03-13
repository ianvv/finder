import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import Loader from "../../components/Loader/Loader";
import Button from "../../UiKit/Button/Button";
import TrackDescription from "../../components/TrackDescription/TrackDescription";
import {fetchTrack, fetchTrackLyrics, trackLyricsSelector,} from "../../redux/slices/trackLyricsSlice";
import {setSearchValue} from "../../redux/slices/searchTrackSlice";
import {EStatus} from "../../redux/commonDeclaration";
import s from "./lyricsPage.module.scss";

const LyricsPage: React.FC = () => {

    const {id} = useParams();
    const dispatch = useAppDispatch();

    const {lyrics, track, status} = useSelector(trackLyricsSelector);

    const {lyrics_body} = lyrics;
    const {track_name, artist_name, album_name, primary_genres} = track;

    // const location = useLocation();
    // const pageTitle = location.pathname.split('/')[1]

    const navigate = useNavigate();

    const genre =
        primary_genres?.music_genre_list.length > 0 && primary_genres.music_genre_list[0]?.music_genre?.music_genre_name_extended;


    useEffect(() => {
        dispatch(fetchTrackLyrics(Number(id)));
        dispatch(fetchTrack(Number(id)));
    }, []);

    const handleButtonClick = () => {
        navigate('/');
        dispatch(setSearchValue(''))
    }

    return (
        <>
            {status === EStatus.LOADING ? (
                <Loader/>
            ) : status === EStatus.ERROR ? (
                <>Something went wrong...</>
            ) : (
                <>
                    <div className={s.lyricsContainer}>
                        <TrackDescription
                            track_name={track_name !== '' ? track_name : false}
                            artist_name={artist_name !== '' ? artist_name : false}
                            genre={genre ? genre : false}
                            album_name={album_name !== '' ? album_name : false}
                        />
                        <div className={s.lyricsHeader}>
                            {lyrics_body !== '' && <h1>The lyrics</h1>}
                        </div>
                        <div className={s.lyricsWrapper}>
                            <div className={s.lyricsBody}>
                                <div className={s.lyricsText}>{lyrics_body !== '' ? lyrics_body :
                                    <div>Here is no lyrics yet...</div>}</div>
                            </div>
                        </div>

                        <div className={s.buttonWrapper}>
                            <Button title={"Go back"} onClick={handleButtonClick}/>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default LyricsPage;
