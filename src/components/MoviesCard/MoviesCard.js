import React, { useState } from 'react';
import './MoviesCard.css';
import MoviesCardSave from '../MoviesCardSave/MoviesCardSave';
import MoviesCardDelete from '../MoviesCardDelete/MoviesCardDelete';
import MoviesCardIcon from '../MoviesCardIcon/MoviesCardIcon';
import { SERVER_MOVIES_URL } from '../../utils/Constants';

function MoviesCard({ movie, isSavedList, hendlePopupOpen,
    hendleDeleteMovies, hendleSaveMovies, hendleSelectMovies, hendleTrailerPopupOpen }) {

    const heandleImg = () => {
        hendleSelectMovies(movie)
        hendleTrailerPopupOpen()
    }
    const [isSaved, setIsSaved] = useState(movie.isSaved);

    const handleSave = () => {
        hendleSaveMovies(movie)
        setIsSaved(true);
    }

    const hendleDeleteSavedMovies = () => {
        hendleDeleteMovies(movie)
        setIsSaved(false);
    }

    const hendleDelete = () => {
        hendlePopupOpen()
        hendleSelectMovies(movie)
    }

    const getTimeFromMins = (mins) => {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        if (hours > 0) return hours + 'ч ' + minutes + 'м';
        else return minutes + 'м';
    };

    const url = isSavedList ? `${movie.image}` : `${SERVER_MOVIES_URL}${movie.image.url}`;
    const time = getTimeFromMins(movie.duration)
    return (
        <div className='moviesCard'>
            <div className='moviesCard__icon'>
                {isSavedList ? <MoviesCardDelete
                    hendleDelete={hendleDelete} />
                    : isSaved ?
                        <MoviesCardIcon
                            hendleDeleteSavedMovies={hendleDeleteSavedMovies} /> :
                        <MoviesCardSave
                            handleSave={handleSave}
                        />}
            </div>
            <img className='moviesCard__picture' src={url} alt={movie.nameRU} onClick={heandleImg} />
            <div className='moviesCard__name-block'>
                <p className='moviesCard__name'>{movie.nameRU}</p>
                <div className='moviesCard__length-container'>
                    <p className='moviesCard__length'>{time}</p>
                </div>
            </div>
        </div>
    )
}

export default MoviesCard;
