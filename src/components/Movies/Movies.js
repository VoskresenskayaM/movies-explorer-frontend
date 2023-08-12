import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import { findMovies } from '../../utils/Movies';
import { useNavigate } from 'react-router-dom';
import {  ERROR_DELETE_MOVIE, ERROR_SAVE_MOVIE } from '../../utils/Constants';
import beatFilmApi from '../../utils/MoviesApi';

function Movies({ mainSavedMap, hendleSetErrorInErrorRegPopup, hendleErrorRegPopupOpen,
    hendleTrailerPopupOpen, heandlePushInSavedMap, heandleDeleteInSavedMap, hendleSelectMovies }) {

    useEffect(() => {
        beatFilmApi.getMovies()
            .then((movies) => {
                if (movies) {
                    movies.forEach(m => {
                        m.isSaved = false
                    })
                    if (movies !== 0 && mainSavedMap.length !== 0) {
                        movies.forEach((mov) => {
                            mainSavedMap.forEach((sevedMov) => {
                                if (sevedMov.nameRU === mov.nameRU) mov.isSaved = true
                            })
                        })
                    }
                    localStorage.setItem("beatFilmMovies", JSON.stringify(movies))
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    const navigate = useNavigate()
    const [isMoviesLoading, setIsMoviesLoading] = useState(true)
    const [mainMap, setMainMap] = useState([]);//map для отрисовки
    const [isMainMapLoading, setIsMainMapLoading] = useState(false)

    /*карточки из localstorage*/
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
        const mapForSearch = JSON.parse(localStorage.getItem('beatFilmMovies'))
        console.log(mapForSearch)
        const foundMap = findMovies(movieName, isShortFilm, mapForSearch)
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
            setIsMoviesLoading(true)
            setIsMainMapLoading(false)
        }
    }

    async function hendleDeleteMovies(movie) {
        setIsMoviesLoading(false)
        const mov = mainSavedMap.find(m => m.nameRU === movie.nameRU)
        await mainApi.deleteMovies(mov._id)
            .then((deleteMovie) => {
                heandleDeleteInSavedMap(deleteMovie)
                const searchMovies = JSON.parse(localStorage.getItem('selectedMoviesMap'));
                const i = searchMovies.findIndex(m => m.nameRU === movie.nameRU);
                searchMovies[i].isSaved = false;
                localStorage.removeItem('selectedMoviesMap');
                localStorage.setItem('selectedMoviesMap', JSON.stringify(searchMovies));
                setMainMap(searchMovies)
                let copyMainWhithLike= JSON.parse(localStorage.getItem('beatFilmMovies'))
                const k = copyMainWhithLike.findIndex(m => m.id === movie.id)
                copyMainWhithLike[k].isSaved = false
                localStorage.removeItem('beatFilmMovies');
                localStorage.setItem('beatFilmMovies', JSON.stringify(copyMainWhithLike));
            })
            .catch((e) => {
                console.log(e)
                hendleSetErrorInErrorRegPopup(ERROR_DELETE_MOVIE)
                hendleErrorRegPopupOpen()
            })
            .finally(() => {
                setIsMoviesLoading(true)
            })
    }

    /*сохранение фильма*/
    async function hendleSaveMovies(movie) {
        console.log(movie)
        setIsMoviesLoading(false)
        await mainApi.saveMovies({ item: movie })
            .then((savedMovie) => {
                heandlePushInSavedMap(savedMovie)
                const searchMovies = JSON.parse(localStorage.getItem('selectedMoviesMap'))
                const i = searchMovies.findIndex(m => m.nameRU === savedMovie.nameRU)
                searchMovies[i].isSaved = true
                localStorage.removeItem('selectedMoviesMap')
                localStorage.setItem('selectedMoviesMap', JSON.stringify(searchMovies))
                setMainMap(searchMovies)
                let copyMainWhithLike= JSON.parse(localStorage.getItem('beatFilmMovies'))
                const k = copyMainWhithLike.findIndex(m => m.id === movie.id)
                copyMainWhithLike[k].isSaved = true
                localStorage.removeItem('beatFilmMovies');
                localStorage.setItem('beatFilmMovies', JSON.stringify(copyMainWhithLike));
            })
            .catch((err) => {
                hendleSetErrorInErrorRegPopup(ERROR_SAVE_MOVIE)
                hendleErrorRegPopupOpen()
                console.log(err)
            })
            .finally(() => {
                setIsMoviesLoading(true)
            })
    }

    return (
        <>
            <main className='movies'>
                <SearchForm
                    hendleFindMovies={hendleFindMovies}
                    isSavedList={false}
                />
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
