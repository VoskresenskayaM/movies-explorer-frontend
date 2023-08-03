import React, { useEffect, useState, useCallback } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import beatFilmApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import { findMoviesByName, findMoviesByDuration, findMovies } from '../../utils/Movies';
import NotFoundMap from '../NotFoundMap/NotFoundMap';

function Movies({ mainSavedMap }) {

    const [isLoading, setIsLoading] = useState(true)
    const [mainMap, setMainMap] = useState([]);
    const [isMainMapLoading, setIsMainMapLoading] = useState(false)
    const [savedMap, setSavedMap] = useState(mainSavedMap)
    /*const [mapLocalStorage, setMapLocalStorage] = useState(JSON.parse(localStorage.getItem('beatFilmMap')))*/

    /*useEffect(() => {
        setMapLocalStorage(mapLocalStorage)
    }, [mapLocalStorage])*/

    const [searchMovie, setSearchMovie] = useState('')

    /*Поиск фильма*/
    function hendleFindMovies(movieName, isShortFilm) {
        setIsLoading(false)
        const foundMap = findMovies(movieName, isShortFilm, mainMap/*, mapLocalStorage*/)
        if (foundMap.length === 0) {
            setIsMainMapLoading(true)
            setIsLoading(true)
            if (localStorage.getItem('selectedMovie') === null) {
                localStorage.setItem('selectedMovie', JSON.stringify(movieName));
                setSearchMovie(movieName)
            }
            else {
                localStorage.removeItem('selectedMovie');
                localStorage.setItem('selectedMovie', JSON.stringify(movieName));
                setSearchMovie(movieName)
            }
        }
        else {
            setMainMap(foundMap)
            setIsLoading(true)
            setIsMainMapLoading(false)
        }
    }
    /*удаление фильма*/

    const [muvieForDelete, setMuvieForDelete] = useState()


    /*function hendleSelectMovies(movie) {
        setSelectedMovie(movie)
    }*/

    function hendleDeleteMovies(movie) {
        const mov = savedMap.find(m => m.nameRU === movie.nameRU)
        mainApi.deleteMovies(mov._id)
            .then((deleteMovie) => {
                const mapInLocalStorage = JSON.parse(localStorage.getItem('beatFilmMap'))
                console.log(mapInLocalStorage)
                mapInLocalStorage.forEach(m => {
                    if (m._id === movie._id) { m.isSaved = false }
                })
                localStorage.removeItem('beatFilmMap')
                localStorage.setItem('beatFilmMap', JSON.stringify(mapInLocalStorage))
                /*setMapLocalStorage(localStorage.getItem('beatFilmMap'))*/
            })
            .catch((e) => {
                console.log(e)
            })
    }

    /*useEffect(() => {
        mainApi.getMovies()
            .then((movies) => {
                const moviesMap = movies.data
                console.log(`selectedMovie.nameRU: ${selectedMovie.nameRU}`)
                console.log(moviesMap)
                /*const mov = moviesMap.find(function(m){
                    return m.nameRU === selectedMovie.nameRU})
                console.log(`mov: ${mov}`)
                setMuvieForDelete(moviesMap.find(function(m){
                    return m.nameRU === selectedMovie.nameRU}))
            })
            .catch((e) => {
                console.log(e)
            })
    }, [selectedMovie])

    useEffect(() => {
    console.log(`muvieForDelete: ${muvieForDelete}`)
    }, [muvieForDelete])*/

    /*сохранение фильма*/

    function hendleSaveMovies(movie) {
        mainApi.saveMovies({ item: movie })
            .then((movie) => {
                const mapInLocalStorage = JSON.parse(localStorage.getItem('beatFilmMap'))
                mapInLocalStorage.forEach(m => {
                    if (m.nameRU === movie.nameRU) m.isSaved = true
                })
                localStorage.removeItem('beatFilmMap')
                localStorage.setItem('beatFilmMap', JSON.stringify(mapInLocalStorage))
                /*setMapLocalStorage(localStorage.getItem('beatFilmMap'))*/
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <main className='movies'>
                <SearchForm
                    hendleFindMovies={hendleFindMovies} 
                    searchMovie={searchMovie}/>
                {isLoading ?
                    <MoviesCardList
                        isSavedList={false}
                        map={mainMap}
                        /*isMoviesEmpty={isMoviesEmpty}
                        mapForPage={mapForPage}
                        hendlePaginateMovies={hendlePaginateMovies}*/
                        hendleSaveMovies={hendleSaveMovies}
                        /*hendleSelectMovies={hendleSelectMovies}*/
                        hendleDeleteMovies={hendleDeleteMovies}
                        isMainMapLoading={isMainMapLoading}

                    />
                    : <Preloader />}
            </main>
            <Footer />
        </>
    )
}
export default Movies;
