import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import { findMovies } from '../../utils/Movies';
import { ERROR_DELETE_MOVIE, ERROR_SAVE_MOVIE } from '../../utils/Constants';
import beatFilmApi from '../../utils/MoviesApi';

function Movies({ mainSavedMap, hendleSetErrorInErrorRegPopup, hendleErrorRegPopupOpen,
    hendleTrailerPopupOpen, hendleSelectMovies, toggeMovie }) {

    const [isMoviesLoading, setIsMoviesLoading] = useState(true)
    const [mainMap, setMainMap] = useState([]);//map для отрисовки
    const [isMainMapLoading, setIsMainMapLoading] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("beatFilmMovies") === null) {
            setIsMoviesLoading(false)
            beatFilmApi.getMovies()
                .then((movies) => {
                    if (movies) {
                        movies.forEach((mov) => {
                            mov.ownerID = null
                        })
                        localStorage.setItem("beatFilmMovies", JSON.stringify(movies))
                }
                })
                .catch((e) => {
                    console.log(e)
                })
                .finally(() => { setIsMoviesLoading(true) })
        }
    }, [])

  useEffect(()=>{
    setIsMoviesLoading(false)
       const beatFilmMovies = JSON.parse(localStorage.getItem("beatFilmMovies"))
        if (mainSavedMap.length !== 0) {
            beatFilmMovies.forEach((mov) => {
                mov.ownerID = null
                mainSavedMap.forEach((sevedMov) => {
                    if (sevedMov.nameRU === mov.nameRU) mov.ownerID = sevedMov._id
                })
            })
            localStorage.removeItem("beatFilmMovies")
            localStorage.setItem("beatFilmMovies", JSON.stringify(beatFilmMovies))
        }
        setIsMoviesLoading(true)
    },[])

    /*карточки из localstorage*/
    useEffect(() => {
        setIsMoviesLoading(false)
        if (localStorage.getItem('selectedMovie')
            && localStorage.getItem('selectedMoviesMap')) {
            const searchMovies = JSON.parse(localStorage.getItem('selectedMoviesMap'));
            if (JSON.parse(localStorage.getItem('selectedShortMovie')) === true) {
                const shortMovies = searchMovies.filter(m => m.duration < 40)
                if (shortMovies.length === 0) {
                    setIsMainMapLoading(true)
                }
                else {
                    setMainMap(shortMovies)
                    setIsMainMapLoading(false)
                }
            }
            else setMainMap(searchMovies)
        }
        else {
            setMainMap([])
        }
        setIsMoviesLoading(true)
    }, [])

    /*поиск фильма*/
    function hendleFindMovies(movieName, isShortFilm) {
        setIsMoviesLoading(false)
        const mapForSearch = JSON.parse(localStorage.getItem('beatFilmMovies'))
        const foundMap = findMovies(movieName, isShortFilm, mapForSearch)
        if (foundMap.length === 0) {
            setIsMainMapLoading(true)
            setIsMoviesLoading(true)
            localStorage.removeItem('selectedMoviesMap')
            localStorage.removeItem('selectedMovie')
            localStorage.removeItem('selectedShortMovie')
        }
        else {
            if (localStorage.getItem('selectedMoviesMap') !== null && localStorage.getItem('selectedMovie') !== null) {
                localStorage.setItem('selectedMovie', JSON.stringify(movieName));
                localStorage.setItem('selectedMoviesMap', JSON.stringify(foundMap));
            }
            else {
                localStorage.removeItem('selectedMovie');
                localStorage.removeItem('selectedMoviesMap');
                localStorage.setItem('selectedMovie', JSON.stringify(movieName));
                localStorage.setItem('selectedMoviesMap', JSON.stringify(foundMap));
            }
            setMainMap(foundMap)
            setIsMoviesLoading(true)
            setIsMainMapLoading(false)
        }
    }

    /*удаление фильма*/
    async function hendleDeleteMovies(movie) {
        await mainApi.deleteMovies(movie.ownerID)
            .then((deleteMovie) => {
                if (JSON.parse(localStorage.getItem('selectedShortMovie')) === true) {
                    setMainMap(toggeMovie(null, movie).filter(m => m.duration <= 40))
                }
                else
                    setMainMap(toggeMovie(null, movie))
            })
            .catch((e) => {
                console.log(e)
                hendleSetErrorInErrorRegPopup(ERROR_DELETE_MOVIE)
                hendleErrorRegPopupOpen()
            })
    }

    /*фильтр для короткометрожек*/
    const hendleFindShortMovie = (short) => {
        setIsMoviesLoading(false)
        const filterMovies = JSON.parse(localStorage.getItem('selectedMoviesMap'))
        if (short) {
            const map = filterMovies.filter(m => m.duration <= 40)
            if (map.length === 0)
                setIsMainMapLoading(true)
            else setMainMap(filterMovies.filter(m => m.duration <= 40))
        }
        else {
            setMainMap(filterMovies)
            setIsMainMapLoading(false)
        }
        setIsMoviesLoading(true)
    }

    /*сохранение фильма*/
    async function hendleSaveMovies(movie) {
        await mainApi.saveMovies({ item: movie })
            .then((savedMovie) => {
               
                if (JSON.parse(localStorage.getItem('selectedShortMovie')) === true) {
                    setMainMap(toggeMovie(savedMovie._id, movie).filter(m => m.duration <= 40))
                }
                else setMainMap(toggeMovie(savedMovie._id, movie))
            })
            .catch((err) => {
                hendleSetErrorInErrorRegPopup(ERROR_SAVE_MOVIE)
                hendleErrorRegPopupOpen()
                console.log(err)
            })
    }

    return (
        <>
            <main className='movies'>
                <SearchForm
                    hendleFindMovies={hendleFindMovies}
                    isSavedList={false}
                    hendleFindShort={hendleFindShortMovie}
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
