import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ isSavedList, isMoviesEmpty, mapForPage, hendlePopupOpen }) {


    return (
        <div className='moviesCardList'>
            <ul className='moviesCardList__list'>
                {mapForPage.map((el, index, _) => (
                    <li key={index}>
                        <MoviesCard
                            isSavedList={isSavedList}
                            movie={el}
                            hendlePopupOpen={hendlePopupOpen}
                        />
                    </li>
                )
                )}
            </ul>
            <botton className={isMoviesEmpty ? 'moviesCardList__botton  moviesCardList__botton-none' :
                'moviesCardList__botton'}>Ещё</botton>
        </div>
    )
}
export default MoviesCardList;
