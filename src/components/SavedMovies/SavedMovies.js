import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import DeleteMoviesPopup from '../DeleteMoviesPopup/DeleteMoviesPopup';
import { findMovies } from '../../utils/Movies';
import TrailerPopup from '../TrailerPopup/TrailerPopup';
import './SavedMovies.css';

function SavedMovies({ mainSavedMap, selectedMovie, hendleSelectMovies, hendleDeleteSavedMovie, hendleFoundSavedMovie, hendleFindShort, getSavedMovies, hendleSetMainMapLoading, isMainMapLoading }) {

    /*const [isMainMapLoading, setIsMainMapLoading] = useState(false)*/
    const [isLoadingSavedMovies, setIsLoadingSavedMovies] = useState(true)
    const [isDeleteMoviesPopupOpen, setIsDeleteMoviesPopupOpen] = useState(false);
    const [isTrailerPopupOpen, setIsTrailerPopupOpen] = useState(false);

    useEffect(() => {
        getSavedMovies()
     
        /*if (JSON.parse(localStorage.getItem('selectedShortMovie')) === true)
        hendleFoundSavedMovie(mainSavedMap.filter(m => m.duration < 40))*/
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

    function hendleFindMovies(movieName, isShortFilm) {
        setIsLoadingSavedMovies(false)

        const foundMap = findMovies(movieName, isShortFilm, mainSavedMap)
        if (foundMap.length === 0) {
            hendleSetMainMapLoading(true)
            /*setIsMainMapLoading(true)*/
            hendleFoundSavedMovie(foundMap)
            setIsLoadingSavedMovies(true)
        }
        else {
            hendleFoundSavedMovie(foundMap)
            setIsLoadingSavedMovies(true)
            hendleSetMainMapLoading(false)
            /*setIsMainMapLoading(false)*/
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
                    /*setOldSearch={setOldSearch}*/
                    isSavedList={true}
                    map={mainSavedMap}
                    hendleFindShort={hendleFindShort} />
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
