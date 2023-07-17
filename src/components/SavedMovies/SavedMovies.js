import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import './SavedMovies.css';

function SavedMovies({ isSavedList, isMoviesEmpty, hendlePopupOpen, mapForPage }) {

    return (
        <div className='savedMovies'>
            <SearchForm />
            <MoviesCardList
                isSavedList={isSavedList}
                isMoviesEmpty={isMoviesEmpty}
                mapForPage={mapForPage}
                hendlePopupOpen={hendlePopupOpen} />
            <Footer />
        </div>
    )
}
export default SavedMovies;