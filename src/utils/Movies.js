

const findMoviesByName = (movieName, moviesMap) => {
    return moviesMap.filter((m) => {
        if (m.nameRU.toLowerCase().includes(movieName.toLowerCase()) || m.nameEN.toLowerCase().includes(movieName.toLowerCase()))
            return m
    })
}

const findMoviesByDuration = (moviesMap) => {
    return moviesMap.filter(m => m.duration < 40)
}

const findMoviesByNameyAndDuration = (movieName, moviesMap) => {
    return moviesMap.filter((m) => {
        if (m.nameRU.toLowerCase().includes(movieName.toLowerCase()) && m.duration < 40 ||
            m.nameEN.toLowerCase().includes(movieName.toLowerCase()) && m.duration < 40)
            return m
    })
}

export const findMovies = (fileName, isShortFilm, mainMap/*, mapInLocalStorage*/) => {

    if (isShortFilm && mainMap.length !== 0) {
        return findMoviesByDuration(mainMap)
    }
    else if (isShortFilm && mainMap.length === 0) {
        const mapInLocalStorage = JSON.parse(localStorage.getItem('beatFilmMap'))
        return findMoviesByNameyAndDuration(fileName, mapInLocalStorage)

    }
    else if (!isShortFilm && mainMap.length === 0) {
        const mapInLocalStorage = JSON.parse(localStorage.getItem('beatFilmMap'))
        return findMoviesByName(fileName, mapInLocalStorage)
    }

    else if (!isShortFilm && mainMap.length !== 0) {
        const mapInLocalStorage = JSON.parse(localStorage.getItem('beatFilmMap'))
        return findMoviesByName(fileName, mapInLocalStorage)
    }
    else return []
}

export const findSavedMovies = (fileName, isShortFilm, mainMap) => {

    if (isShortFilm) {
        return findMoviesByDuration(mainMap)
    }
    else {
        return findMoviesByName(fileName, mainMap)
    }

}