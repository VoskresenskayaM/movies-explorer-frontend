import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import { findMovies } from '../../utils/Movies';
import { useNavigate } from 'react-router-dom';
import { SUCCESS_DELETE_MOVIE, ERROR_DELETE_MOVIE, ERROR_SAVE_MOVIE } from '../../utils/Constants';

function Movies({ mainSavedMap, hendleSetErrorInErrorRegPopup, hendleErrorRegPopupOpen,
    mainBeatFilmWhitSavedMap, isLoading, hendleTrailerPopupOpen, hendleSelectMovies }) {

    const navigate = useNavigate()
    const [isMoviesLoading, setIsMoviesLoading] = useState(true)
    const [mainMap, setMainMap] = useState([]);//map для отрисовки
    const [isMainMapLoading, setIsMainMapLoading] = useState(false)


    useEffect(() => {

        if (localStorage.getItem('selectedMovie')
            && localStorage.getItem('selectedShortMovie')
            && localStorage.getItem('selectedMoviesMap')) {
            const searchMovies = JSON.parse(localStorage.getItem('selectedMoviesMap'));
            setMainMap(searchMovies)
        }
        else {
            setMainMap([])
        }

    }, [])

    function hendleFindMovies(movieName, isShortFilm) {

        setIsMoviesLoading(false)
        const foundMap = findMovies(movieName, isShortFilm, mainBeatFilmWhitSavedMap)
        if (foundMap.length === 0) {
            setIsMainMapLoading(true)
            setIsMoviesLoading(true)
        }
        else {

            if (localStorage.getItem('selectedMovie') === null
                && localStorage.getItem('selectedShortMovie') === null
                && localStorage.getItem('selectedMoviesMap')) {
                localStorage.setItem('selectedMovie', JSON.stringify(movieName));
                localStorage.setItem('selectedShortMovie', JSON.stringify(isShortFilm));
                localStorage.setItem('selectedMoviesMap', JSON.stringify(foundMap));
            }
            else {
                localStorage.removeItem('selectedMovie');
                localStorage.removeItem('selectedShortMovie');
                localStorage.removeItem('selectedMoviesMap');
                localStorage.setItem('selectedMovie', JSON.stringify(movieName));
                localStorage.setItem('selectedShortMovie', JSON.stringify(isShortFilm));
                localStorage.setItem('selectedMoviesMap', JSON.stringify(foundMap));
            }
            setMainMap(foundMap)
            document.location.reload();
            setIsMoviesLoading(true)
        }
    }

    function hendleDeleteMovies(movie) {
        setIsMoviesLoading(false)
        const mov = mainSavedMap.find(m => m.nameRU === movie.nameRU)
        mainApi.deleteMovies(mov._id)
            .then((deleteMovie) => {
                hendleSetErrorInErrorRegPopup(SUCCESS_DELETE_MOVIE)
                hendleErrorRegPopupOpen()
                navigate('/movies', { replace: true })
            })
            .catch((e) => {
                console.log(e)
                hendleSetErrorInErrorRegPopup(ERROR_DELETE_MOVIE)
                hendleErrorRegPopupOpen()
            })
            .finally(() => {
                setIsMoviesLoading(true)
            })
        const searchMovies = JSON.parse(localStorage.getItem('selectedMoviesMap'));
        const i = searchMovies.findIndex(m => m.nameRU === movie.nameRU);
        searchMovies[i].isSaved = false;
        localStorage.removeItem('selectedMoviesMap');
        localStorage.setItem('selectedMoviesMap', JSON.stringify(searchMovies));
        setIsMoviesLoading(true)
    }

    /*сохранение фильма*/
    function hendleSaveMovies(movie) {
        setIsMoviesLoading(false)
        mainApi.saveMovies({ item: movie })
            .then((movie) => { })
            .catch((err) => {
                hendleSetErrorInErrorRegPopup(ERROR_SAVE_MOVIE)
                hendleErrorRegPopupOpen()
                console.log(err)
            })
            .finally(() => {
                setIsMoviesLoading(true)
            })
        const searchMovies = JSON.parse(localStorage.getItem('selectedMoviesMap'))
        const i = searchMovies.findIndex(m => m.nameRU === movie.nameRU)
        searchMovies[i].isSaved = true
        localStorage.removeItem('selectedMoviesMap')
        localStorage.setItem('selectedMoviesMap', JSON.stringify(searchMovies))
        setIsMoviesLoading(true)
    }

    function setOldSearch() {
        if (localStorage.getItem('selectedMovie') === null
            && localStorage.getItem('selectedShortMovie') === null) {
            return {
                movieSearch: '',
                shortMovieSearch: false
            }
        }
        else {
            return {
                movieSearch: JSON.parse(localStorage.getItem('selectedMovie')),
                shortMovieSearch: JSON.parse(localStorage.getItem('selectedShortMovie'))
            }
        }
    }

    return (
        <>
            <main className='movies'>
                <SearchForm
                    hendleFindMovies={hendleFindMovies}
                    setOldSearch={setOldSearch} />
                {isMoviesLoading ?
                    <MoviesCardList
                        isSavedList={false}
                        map={mainMap}
                        hendleSaveMovies={hendleSaveMovies}
                        hendleSelectMovies={hendleSelectMovies}
                        hendleDeleteMovies={hendleDeleteMovies}
                        isMainMapLoading={isMainMapLoading}
                        hendleTrailerPopupOpen={hendleTrailerPopupOpen}
                    />
                    : <Preloader />}
            </main>
            <Footer />
        </>
    )
}
export default Movies;
