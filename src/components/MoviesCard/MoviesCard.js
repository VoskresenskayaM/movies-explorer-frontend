import React, { useState, useContext, useEffect } from 'react';
import './MoviesCard.css';
import MoviesCardSave from '../MoviesCardSave/MoviesCardSave';
import MoviesCardDelete from '../MoviesCardDelete/MoviesCardDelete';
import MoviesCardIcon from '../MoviesCardIcon/MoviesCardIcon';
import { SERVER_MOVIES_URL } from '../../utils/Constants';

function MoviesCard({ movie, isSavedList, hendlePopupOpen, hendleDeleteMovies, hendleSaveMovies, hendleSelectMovies }) {
   
    const [isSaved, setIsSaved] = useState(movie.isSaved);

    const handleSave = () => {
        /*hendleSelectMovies(movie)*/
        hendleSaveMovies(movie)
        setIsSaved(true);
    }

    const hendleDeleteSavedMovies = () => {
        /*hendleSelectMovies(movie)*/
        hendleDeleteMovies(movie)
        setIsSaved(false);
    }

    const url = isSavedList ? `${movie.image}` : `${SERVER_MOVIES_URL}${movie.image.url}`;

    const hendleDelete = () => {
        hendlePopupOpen()
        hendleSelectMovies(movie)
        /*hendleDeleteMovies()*/
    }


    return (
        <div className='moviesCard'>
            <div className='moviesCard__icon'>
                {isSavedList ? <MoviesCardDelete
                    hendleDelete={hendleDelete}
                /*hendleAction={hendleAction}
                handleDelete={handleDelete}*/
                />
                    : isSaved ?
                        <MoviesCardIcon
                        hendleDeleteSavedMovies={hendleDeleteSavedMovies} /> :
                        <MoviesCardSave
                            handleSave={handleSave}
                        />}
            </div>
            <img className='moviesCard__picture' src={url} alt={movie.nameRU} />
            <div className='moviesCard__name-block'>
                <p className='moviesCard__name'>{movie.nameRU}</p>
                <div className='moviesCard__length-container'>
                    <p className='moviesCard__length'>{movie.duration}</p>
                </div>
            </div>
        </div>
    )
}

export default MoviesCard;
