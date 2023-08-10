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
import { TOO_MANY_REQUESTS, SUCCESS_REGISTRATION, SUCCESS_EDIT_USER, NOT_AUTH, NOT_MOVIES, NOT_REGISTER } from '../../utils/Constants';
import { useLocation } from "react-router-dom";
import ProtectedRouteElement from '../../utils/ProtectedRouteElement';
import beatFilmApi from '../../utils/MoviesApi';
import TrailerPopup from '../TrailerPopup/TrailerPopup';

function App() {

  /*переход по страницам*/
  const navigate = useNavigate()

  const navigateForPage = useCallback((path) => {
    navigate(path, { replace: true })
  }, [navigate])

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
    navigateForPage('/signin')
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
  const location = useLocation();

  const checkToken = useCallback(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      getCurrentUser(token)
        .then((res) => {
          if (res) {
            handleLogin();
            if (location.pathname === '/signup' || location.pathname === '/signin') {
              navigateForPage('/movies');
            }
          }
        })
        .catch((err) => {
          setErrorMessage(NOT_AUTH)
          setIsErrorRegPopupOpen(true)
          console.log(err)
        })
    }
  }, [navigateForPage])

  useEffect(() => {

    checkToken();

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

  /*массив со всеми фильмами*/
  const [mainBeatFilmMap, setmainBeatFilmMap] = useState([])
  useEffect(() => {
    if (loggenIn) {
      beatFilmApi.getMovies()
        .then((movies) => {
          movies.forEach(m => {
            m.isSaved = false
          })
          setmainBeatFilmMap(movies)
        })
        .catch((e) => {
          console.log(e)
          setErrorMessage(NOT_MOVIES)
          setIsErrorRegPopupOpen(true)
        })
    }
  }, [loggenIn])

  /*массив с сохраненными фильмами*/
  const [mainSavedMap, setMainSavedMap] = useState([])

  useEffect(() => {
    if (loggenIn) {
      mainApi.getMovies()
        .then((movies) => {
          setMainSavedMap(movies.data)
        })
        .catch((e) => {
          console.log(e)
          setErrorMessage(NOT_MOVIES)
          setIsErrorRegPopupOpen(true)
        })
    }
  }, [loggenIn, navigate])

  /*массив для хранения всех фильмов с отметкой о сохранении*/
  const [mainBeatFilmWhitSavedMap, setMainBeatFilmWhitSavedMap] = useState([])

  useEffect(() => {
    setIsLoading(false)
    if (mainSavedMap.length !== 0 && mainBeatFilmMap.length !== 0) {
      mainBeatFilmMap.forEach((mov) => {
        mainSavedMap.forEach((sevedMov) => {
          if (sevedMov.nameRU === mov.nameRU) mov.isSaved = true
        })
      })
    }
    setMainBeatFilmWhitSavedMap(mainBeatFilmMap)
    setIsLoading(true)
  }, [mainSavedMap, mainBeatFilmMap, navigate])

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
        setErrorMessage(err.message)
        setIsErrorRegPopupOpen(errorMessage)
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
        />
        <TrailerPopup
          isPopupOpen={isTrailerPopupOpen}
          hendlePopupClose={hendleTrailerPopupClose}
          selectedMovie={selectedMovie}
        />
        <Routes>
          <Route path="/" element={<Main
          />} />
          <Route path="/movies" element={<ProtectedRouteElement element={Movies}
            loggenIn={loggenIn}
            mainSavedMap={mainSavedMap}
            mainBeatFilmWhitSavedMap={mainBeatFilmWhitSavedMap}
            hendleSetErrorInErrorRegPopup={hendleSetErrorInErrorRegPopup}
            hendleErrorRegPopupOpen={hendleErrorRegPopupOpen}
            isLoading={isLoading}
            hendleTrailerPopupOpen={hendleTrailerPopupOpen}
            hendleSelectMovies={hendleSelectMovies}
            selectedMovie={selectedMovie}
          />} />
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies}
            loggenIn={loggenIn}
            navigateForPage={navigateForPage}
            mainSavedMap={mainSavedMap}
            hendleTrailerPopupOpen={hendleTrailerPopupOpen}
            selectedMovie={selectedMovie}
            hendleSelectMovies={hendleSelectMovies}
          />} />
          <Route path="/profile" element={<ProtectedRouteElement
            element={Profile}
            loggenIn={loggenIn}
            handleNotLogin={handleNotLogin}
            navigateForPage={navigateForPage}
            editUser={editUser}
            heandleRemoveCurrentUser={heandleRemoveCurrentUser}
            isLoading={isLoading} />} />
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
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
