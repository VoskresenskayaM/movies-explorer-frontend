import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Main from '../Main/Main';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NavTabPopup from '../NavTabPopup/NavTabPopup';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import SuccessRegPopup from '../SuccessRegPopup/SuccessRegPopup';
import ErrorRegPopup from '../ErrorRegPopup/ErrorRegPopup';
import { register, authorize, getCurrentUser } from "../../utils/AuthApi";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from '../../context/currentUserContext';
import { TOO_MANY_REQUESTS, SUCCESS_REGISTRATION, SUCCESS_EDIT_USER, NOT_AUTH, NOT_MOVIES, NOT_REGISTER, ERROR_EDIT_PROFILE, ERROR_DELETE_MOVIE } from '../../utils/Constants';
import { useLocation } from "react-router-dom";
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import TrailerPopup from '../TrailerPopup/TrailerPopup';
import { findMoviesByNameyAndDuration, findMoviesByName } from '../../utils/Movies'

function App() {

  /*переход по страницам*/
  const navigate = useNavigate()

  const navigateForPage = ((path) => {
    navigate(path, { replace: false })
  })

  let location = useLocation();
  const [loggenIn, setloggenIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ _id: '', name: '', email: '' })

  const heandleRemoveCurrentUser = () => {
    setCurrentUser({ _id: '', name: '', email: '' })
  }
  const handleLogin = () => {
    setloggenIn(true);
  }
  const handleNotLogin = () => {
    setloggenIn(false);
  }

  /*попапы*/
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessRegPopupOpen, setIsSuccessRegPopupOpen] = useState(false);
  const [isErrorsRegPopupOpen, setIsErrorRegPopupOpen] = useState(false);
  const [isTrailerPopupOpen, setIsTrailerPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const hendleResetErrorMessage = () => {
    setErrorMessage('')
  }
  const hendlePopupOpen = () => {
    setIsPopupOpen(true)
  }
  const hendlePopupClose = () => {
    setIsPopupOpen(false)
  }

  const hendleSetErrorInErrorRegPopup = (err) => {
    setErrorMessage(err)
  }

  const hendleSuccessRegPopupClose = () => {
    setIsSuccessRegPopupOpen(false)
  }

  const hendleErrorRegPopupOpen = () => {
    setIsErrorRegPopupOpen(true)
  }

  const hendleErrorRegPopupClose = () => {
    setIsErrorRegPopupOpen(false)
  }

  const hendleTrailerPopupOpen = () => {
    setIsTrailerPopupOpen(true)
  }

  const hendleTrailerPopupClose = () => {
    setIsTrailerPopupOpen(false)
  }

  /*проверка токена*/
  const checkToken = useCallback(() => {

    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      getCurrentUser(token)
        .then((res) => {
          if (res) {
            handleLogin();
            if (location.pathname === '/signup' || location.pathname === '/signin') {
              navigateForPage("/movies");
            }
            else navigateForPage(location.pathname)
          }
        })
        .catch((err) => {
          setErrorMessage(NOT_AUTH)
          setIsErrorRegPopupOpen(true)
          console.log(err)
        })
    }
  }, [loggenIn])

  useEffect(() => {
    checkToken()
  }, [checkToken])

  /*уcтановка текущего пользователя*/
  const setUser = useCallback(() => {
    mainApi
      .getUser()
      .then((user) => {
        setCurrentUser({ _id: user.data._id, name: user.data.name, email: user.data.email })
      })
      .catch((e) => {
        setloggenIn(false);
        navigateForPage("/signin");
      })
  }, [currentUser])

  useEffect(() => {
    if (loggenIn) {
      setUser()
    }
  }, [loggenIn]);

  /*массив с сохраненными фильмами*/
  const [mainSavedMap, setMainSavedMap] = useState([])
  const [savedMapForSearch, setSavedMapForSearch] = useState([])

  /*переключение лайков */
  const toggeMovie = (param, movie) => {
    /*const mainWhithLike = JSON.parse(localStorage.getItem('beatFilmMovies')).map(m => m.id === movie.id ? m = Object.assign(m, { ownerID: param }) : m)
    localStorage.removeItem('beatFilmMovies');
    localStorage.setItem('beatFilmMovies', JSON.stringify(mainWhithLike));*/
    const localStorageWhithLike = JSON.parse(localStorage.getItem('selectedMoviesMap')).map(m => m.id === movie.id ? m = Object.assign(m, { ownerID: param }) : m)
    localStorage.removeItem('selectedMoviesMap');
    localStorage.setItem('selectedMoviesMap', JSON.stringify(localStorageWhithLike));
    getSavedMovies()
    return localStorageWhithLike
  }

  /*удаление сохраннного фильма*/
  async function hendleDeleteSavedMovie(id) {
    await mainApi.deleteMovies(id)
      .then((deleteMovie) => {
        if (deleteMovie) {
          /*const mainWhithLike = JSON.parse(localStorage.getItem('beatFilmMovies')).map(m => m.ownerID === id ? m = Object.assign(m, { ownerID: null }) : m)
          localStorage.removeItem('beatFilmMovies');
          localStorage.setItem('beatFilmMovies', JSON.stringify(mainWhithLike));*/
          const localStorageWhithLike = JSON.parse(localStorage.getItem('selectedMoviesMap'))
          localStorage.removeItem('selectedMoviesMap');
          localStorage.setItem('selectedMoviesMap', JSON.stringify(localStorageWhithLike.map(m => m.ownerID === id ? m = Object.assign(m, { ownerID: null }) : m)));
        }
        if (JSON.parse(localStorage.getItem('selectedShortMovie') === true))
          setMainSavedMap(mainSavedMap.filter(m => m._id !== id && m.duration <= 40))
        else
          setMainSavedMap(mainSavedMap.filter(m => m._id !== id))
      })
      .catch((err) => {
        console.log(err)
        hendleSetErrorInErrorRegPopup(ERROR_DELETE_MOVIE)
        hendleErrorRegPopupOpen()
      })
  }

  async function getSavedMovies() {
    if (loggenIn) {
      await mainApi.getMovies()
        .then((movies) => {
          if (movies) {
            setMainSavedMap(movies.data)
            setSavedMapForSearch(movies.data)
          }
          else {
            setMainSavedMap([])

          }
        })
        .catch((e) => {
          console.log(e)
          setErrorMessage(NOT_MOVIES)
          setIsErrorRegPopupOpen(true)
        })
    }
  }

  useEffect(() => {
    getSavedMovies()
  }, [loggenIn])

  /*фильтр короткометражек для сохраненных фильмов */
  const [isMainMapLoading, setIsMainMapLoading] = useState(false)

  const hendleSetMainMapLoading = (param) => {
    setIsMainMapLoading(param)
  }

  const heandleFoundShortSavedMovie = (short, val) => {
    const shortMovies = findMoviesByNameyAndDuration(val, savedMapForSearch)
    const movies = findMoviesByName(val, savedMapForSearch)
    if (short === true) {
      if (shortMovies.length === 0)
        setIsMainMapLoading(true)
      else {
        setMainSavedMap(shortMovies)
        setIsMainMapLoading(false)
      }
    }
    else {
      if (val === '') {
        getSavedMovies()
        setIsMainMapLoading(false)
      }
      else {
        if (movies.length === 0)
          setIsMainMapLoading(true)
        else {
          setMainSavedMap(movies)
          setIsMainMapLoading(false)
        }
      }
    }
  }
  /*отрисовка найденых сохраннных фильмов*/
  const hendleFoundSavedMovie = (map) => {
    setMainSavedMap(map)
  }

  /*авторизация*/
  function loginUser(email, password) {
    setIsLoading(false)
    authorize(email, password)
      .then((res) => {
        if (res.status === 429) {
          setErrorMessage(TOO_MANY_REQUESTS)
          setIsErrorRegPopupOpen(true)
        }
        else if (res.status <= 300) {
          return res.json()
            .then((data) => {
              if (data.token) {
                localStorage.setItem("token", data.token);
                setloggenIn(true);
                navigateForPage('/movies')
              }
            })
        }
        else return res.json()
          .then((res) => {
            setErrorMessage(res.message)
          })
      })
      .catch((err) => {
        setErrorMessage(NOT_AUTH)
        console.log(err)
      })
      .finally(() => {
        setIsLoading(true)
      })
  }

  /*регистрация*/
  function registerUser(name, email, password) {
    setIsLoading(false)
    register(name, email, password)
      .then((res) => {
        if (res.status === 429) {
          setErrorMessage(TOO_MANY_REQUESTS)
        }
        else if (res.status <= 300) {
          return res.json()
            .then((res) => {
              setSuccessMessage(SUCCESS_REGISTRATION)
              setIsSuccessRegPopupOpen(true)
              loginUser(email, password)
            })
        }
        else return res.json()
          .then((res) => {
            if (res) {
              setErrorMessage(res.message)
            }
          })
      })
      .catch((err) => {
        setErrorMessage(NOT_REGISTER)
        console.log(err)
      })
      .finally(() => {
        setIsLoading(true)
      })
  }

  /*изменение данных пользователя*/
  function editUser({ item }) {
    setIsLoading(false)
    mainApi.editUser({ item: item })
      .then((user) => {
        if (user) {
          setCurrentUser({ _id: user.data._id, name: user.data.name, email: user.data.email })
          setSuccessMessage(SUCCESS_EDIT_USER)
          setIsSuccessRegPopupOpen(true)
        }
      })
      .catch((err) => {
        setErrorMessage(ERROR_EDIT_PROFILE)
        console.log(err)
      })
      .finally(() => {
        setIsLoading(true)
      })
  }

  const [selectedMovie, setSelectedMovie] = useState({})

  function hendleSelectMovies(movie) {
    setSelectedMovie(movie)
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <NavTabPopup
          isPopupOpen={isPopupOpen}
          hendlePopupClose={hendlePopupClose}
        />
        <SuccessRegPopup
          isPopupOpen={isSuccessRegPopupOpen}
          hendlePopupClose={hendleSuccessRegPopupClose}
          successMessage={successMessage}
        />
        <ErrorRegPopup
          isPopupOpen={isErrorsRegPopupOpen}
          hendlePopupClose={hendleErrorRegPopupClose}
          errorMessage={errorMessage} />
        <Header
          hendlePopupOpen={hendlePopupOpen}
          loggenIn={loggenIn}
        />
        <TrailerPopup
          isPopupOpen={isTrailerPopupOpen}
          hendlePopupClose={hendleTrailerPopupClose}
          selectedMovie={selectedMovie}
        />

        <Routes>
          <Route path="/" element={<Main
          />} />
          <Route path="/movies" element={<ProtectedRouteElement
            element={Movies}
            loggenIn={loggenIn}
            mainSavedMap={mainSavedMap}
            hendleSetErrorInErrorRegPopup={hendleSetErrorInErrorRegPopup}
            hendleErrorRegPopupOpen={hendleErrorRegPopupOpen}
            isLoading={isLoading}
            hendleTrailerPopupOpen={hendleTrailerPopupOpen}
            hendleSelectMovies={hendleSelectMovies}
            selectedMovie={selectedMovie}
            toggeMovie={toggeMovie}
            hendleDeleteSavedMovie={hendleDeleteSavedMovie}
          />} />
          <Route path="/saved-movies" element={<ProtectedRouteElement
            element={SavedMovies}
            loggenIn={loggenIn}
            navigateForPage={navigateForPage}
            mainSavedMap={mainSavedMap}
            hendleTrailerPopupOpen={hendleTrailerPopupOpen}
            selectedMovie={selectedMovie}
            hendleSelectMovies={hendleSelectMovies}
            hendleDeleteSavedMovie={hendleDeleteSavedMovie}
            hendleFindShort={heandleFoundShortSavedMovie}
            hendleFoundSavedMovie={hendleFoundSavedMovie}
            getSavedMovies={getSavedMovies}
            hendleSetMainMapLoading={hendleSetMainMapLoading}
            isMainMapLoading={isMainMapLoading}
            savedMapForSearch={savedMapForSearch}
          />} />
          <Route path="/profile" element={<ProtectedRouteElement
            element={Profile}
            loggenIn={loggenIn}
            handleNotLogin={handleNotLogin}
            navigateForPage={navigateForPage}
            editUser={editUser}
            heandleRemoveCurrentUser={heandleRemoveCurrentUser}
            isLoading={isLoading}
            errorMessage={errorMessage}
            hendleResetErrorMessage={hendleResetErrorMessage}
            hendleFoundSavedMovie={hendleFoundSavedMovie} />} />
          <Route path="/signin" element={<Login
            loginUser={loginUser}
            isLoading={isLoading}
            errorMessage={errorMessage}
            hendleResetErrorMessage={hendleResetErrorMessage}
          />} />
          <Route path="/signup" element={<Register
            registerUser={registerUser}
            isLoading={isLoading}
            errorMessage={errorMessage}
            hendleResetErrorMessage={hendleResetErrorMessage}
          />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
