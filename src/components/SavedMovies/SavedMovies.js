import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import './SavedMovies.css';

function SavedMovies({ isSavedList, isMoviesEmpty, hendlePopupOpen, mapForPage }) {

    return (
    <>
        <main className='savedMovies'>
            <SearchForm />
            <MoviesCardList
                isSavedList={isSavedList}
                isMoviesEmpty={isMoviesEmpty}
                mapForPage={mapForPage}
                hendlePopupOpen={hendlePopupOpen} />
        </main>
        <Footer />
    </>
    )
}
export default SavedMovies;