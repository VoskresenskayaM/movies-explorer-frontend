import React, { useState } from 'react';
import './MoviesCard.css';
import MoviesCardSave from '../MoviesCardSave/MoviesCardSave';
import MoviesCardDelete from '../MoviesCardDelete/MoviesCardDelete';
import MoviesCardIcon from '../MoviesCardIcon/MoviesCardIcon';

function MoviesCard({ movie, isSavedList, hendlePopupOpen }) {

    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => setIsSaved(true);

    return (
        <div className='moviesCard'>
            <div className='moviesCard__icon'>
                {isSavedList ? <MoviesCardDelete
                    hendlePopupOpen={hendlePopupOpen}
                />
                    : isSaved ?
                        <MoviesCardIcon /> :
                        <MoviesCardSave
                            handleSave={handleSave}
                        />}
            </div>
            <img className='moviesCard__picture' src={movie.link} alt={movie.name} />
            <div className='moviesCard__name-block'>
                <p className='moviesCard__name'>{movie.name}</p>
                <div className='moviesCard__length-container'>
                    <p className='moviesCard__length'>{movie.length}</p>
                </div>
            </div>
        </div>
    )
}

export default MoviesCard;
