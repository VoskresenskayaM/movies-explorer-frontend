import MoviesHeader from '../MoviesHeader/MoviesHeader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import './Movies.css';

function Movies({ isSavedList, isMoviesEmpty, mapForPage }) {

    return (
        <div className='movies'>
            <SearchForm />
            <MoviesCardList
                isSavedList={isSavedList}
                isMoviesEmpty={isMoviesEmpty}
                mapForPage={mapForPage} />
            <Footer />
        </div>
    )
}
export default Movies;
