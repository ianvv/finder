import React from 'react';
import s from './requestHeader.module.scss'
import {fetchSearchedTrack, searchTrackSelector, setSearchValue} from "../../redux/slices/searchTrackSlice";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {useSelector} from "react-redux";
import Button from '../../UiKit/Button/Button';


interface RequestHeaderProps {
    title: string;
}

const RequestHeader: React.FC<RequestHeaderProps> = ({title}) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {searchValue} = useSelector(searchTrackSelector);


    const goHomeButtonHandler = () => {
        navigate(`/`);
        dispatch(setSearchValue(''))
    }

    const researchButtonHandler = () => {
        navigate(`/search/tracks/${searchValue}`);
        dispatch(fetchSearchedTrack(searchValue))
    }

    return (
        <div className={s.headerWrapper}>
            <h1>{title}</h1>
            {title === 'No items were found for your search' && 'Something went wrong...' &&
                <div className={s.buttons}>
                    <Button title={'Go home'} onClick={goHomeButtonHandler}/>
                    <Button title={'Research'} onClick={researchButtonHandler}/>
                </div>}
        </div>
    )
};

export default RequestHeader;