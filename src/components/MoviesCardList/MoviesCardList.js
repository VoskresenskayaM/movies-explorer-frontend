import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ isSavedList, isMoviesEmpty, mapForPage, hendlePopupOpen }) {

    return (
        <section className='moviesCardList'>
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
            <button className={isMoviesEmpty ? 'moviesCardList__button  moviesCardList__button-none' :
                'moviesCardList__button'}>Ещё</button>
        </section>
    )
}
export default MoviesCardList;
