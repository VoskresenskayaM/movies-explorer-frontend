import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import DeleteMoviesPopup from '../DeleteMoviesPopup/DeleteMoviesPopup';
import { findMovies } from '../../utils/Movies';
import TrailerPopup from '../TrailerPopup/TrailerPopup';
import './SavedMovies.css';

function SavedMovies({ mainSavedMap, selectedMovie, hendleSelectMovies, hendleDeleteSavedMovie, hendleFoundSavedMovie,  getSavedMovies,
     hendleSetMainMapLoading, isMainMapLoading,  hendleSetErrorInErrorRegPopup, hendleErrorRegPopupOpen }) {

    const [isLoadingSavedMovies, setIsLoadingSavedMovies] = useState(true)
    const [isDeleteMoviesPopupOpen, setIsDeleteMoviesPopupOpen] = useState(false);
    const [isTrailerPopupOpen, setIsTrailerPopupOpen] = useState(false);

   useEffect(() => {
        getSavedMovies()
        hendleSetMainMapLoading(false)
    }, [])

    const hendleDeleteMoviesPopupOpen = () => {
        setIsDeleteMoviesPopupOpen(true)
    }
    const hendleDeleteMoviesPopupClose = () => {
        setIsDeleteMoviesPopupOpen(false)
    }

    const hendleTrailerPopupOpen = () => {
        setIsTrailerPopupOpen(true)
    }

    const hendleTrailerPopupClose = () => {
        setIsTrailerPopupOpen(false)
    }

    async function hendleFindMovies(movieName, isShortFilm) {
        setIsLoadingSavedMovies(false)
        const savedMapForSearch = JSON.parse(localStorage.getItem('savedMoviesMap'))
        const foundMap = findMovies(movieName, isShortFilm, savedMapForSearch)
        if (foundMap.length === 0) {
            hendleSetMainMapLoading(true)
            hendleFoundSavedMovie(foundMap)
            setIsLoadingSavedMovies(true)
        }
        else {
            hendleFoundSavedMovie(foundMap)
            setIsLoadingSavedMovies(true)
            hendleSetMainMapLoading(false)
        }
    }

    /*удаление фильма*/
    function hendleDelete() {
        hendleDeleteMoviesPopupClose()
        setIsLoadingSavedMovies(false);
        hendleDeleteSavedMovie(selectedMovie._id)
        setIsLoadingSavedMovies(true);
    }


    return (
        <>
            <DeleteMoviesPopup
                isPopupOpen={isDeleteMoviesPopupOpen}
                hendlePopupClose={hendleDeleteMoviesPopupClose}
                hendleDeleteMovies={hendleDelete}
                isSavedList={true}
            />
            <TrailerPopup
                isPopupOpen={isTrailerPopupOpen}
                hendlePopupClose={hendleTrailerPopupClose}
                selectedMovie={selectedMovie}
                isSavedList={true}
            />
            <main className='savedMovies'>
                <SearchForm
                    hendleFindMovies={hendleFindMovies}
                    isSavedList={true}
                    map={mainSavedMap}
                    getSavedMovies={getSavedMovies}
                    hendleSetErrorInErrorRegPopup={hendleSetErrorInErrorRegPopup}
                    hendleErrorRegPopupOpen={hendleErrorRegPopupOpen}
                />
                {isLoadingSavedMovies ?
                    <MoviesCardList
                        isSavedList={true}
                        hendlePopupOpen={hendleDeleteMoviesPopupOpen}
                        map={mainSavedMap}
                        hendleSelectMovies={hendleSelectMovies}
                        isMainMapLoading={isMainMapLoading}
                        hendleTrailerPopupOpen={hendleTrailerPopupOpen}
                        
                    />
                    : <Preloader />}
            </main>
            <Footer />
        </>
    )
}

export default SavedMovies;
