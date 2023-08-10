import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useEffect, useState } from 'react';
import mainApi from "../../utils/MainApi";
import Preloader from '../Preloader/Preloader';
import DeleteMoviesPopup from '../DeleteMoviesPopup/DeleteMoviesPopup';
import { findMovies } from '../../utils/Movies';
import TrailerPopup from '../TrailerPopup/TrailerPopup';
import { ERROR_DELETE_MOVIE } from '../../utils/Constants';
import './SavedMovies.css';

function SavedMovies({ mainSavedMap, selectedMovie, hendleSelectMovies, hendleSetErrorInErrorRegPopup, hendleErrorRegPopupOpen }) {

    const [isMainMapLoading, setIsMainMapLoading] = useState(false)
    const [isLoadingSavedMovies, setIsLoadingSavedMovies] = useState(true)
    const [mainMap, setMainMap] = useState([])
    const [isDeleteMoviesPopupOpen, setIsDeleteMoviesPopupOpen] = useState(false);
    const [isTrailerPopupOpen, setIsTrailerPopupOpen] = useState(false);

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
            setIsMainMapLoading(true)
            setMainMap(foundMap)
            setIsLoadingSavedMovies(true)
        }
        else {
            setMainMap(foundMap)
            setIsLoadingSavedMovies(true)
            setIsMainMapLoading(false)
        }
    }

    useEffect(() => {
        setIsLoadingSavedMovies(false)
        setMainMap(mainSavedMap)
        setIsLoadingSavedMovies(true)
    }, [mainSavedMap])

    /*удаление фильма*/
    const hendleDeleteMovies = () => {
        setIsLoadingSavedMovies(false);
        mainApi.deleteMovies(selectedMovie._id)
            .then((deleteMovie) => {
                hendleDeleteMoviesPopupClose()
                const map = mainMap.filter(m => m._id !== selectedMovie._id)
                setMainMap(map)
                const searchMovies = JSON.parse(localStorage.getItem('selectedMoviesMap'));
                const i = searchMovies.findIndex(m => m.nameRU === selectedMovie.nameRU);
                searchMovies[i].isSaved = false;
                localStorage.removeItem('selectedMoviesMap');
                localStorage.setItem('selectedMoviesMap', JSON.stringify(searchMovies));
            })
            .catch((err) => {
                console.log(err)
                hendleSetErrorInErrorRegPopup(ERROR_DELETE_MOVIE)
                hendleErrorRegPopupOpen()
            })
            .finally(() => {
                setIsLoadingSavedMovies(true);
            })
    }

    function setOldSearch() {
        return {
            movieSearch: '',
            shortMovieSearch: false
        }
    }

    return (
        <>
            <DeleteMoviesPopup
                isPopupOpen={isDeleteMoviesPopupOpen}
                hendlePopupClose={hendleDeleteMoviesPopupClose}
                hendleDeleteMovies={hendleDeleteMovies}
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
                    setOldSearch={setOldSearch} />
                {isLoadingSavedMovies ?
                    <MoviesCardList
                        isSavedList={true}
                        hendlePopupOpen={hendleDeleteMoviesPopupOpen}
                        map={mainMap}
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
