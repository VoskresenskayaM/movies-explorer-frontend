
const findMoviesByName = (movieName, moviesMap) => {
    return moviesMap.filter((m) => {
        if (m.nameRU.toLowerCase().includes(movieName.toLowerCase()) || m.nameEN.toLowerCase().includes(movieName.toLowerCase()))
            return m
    })
}

const findMoviesByNameyAndDuration = (movieName, moviesMap) => {
    return moviesMap.filter((m) => {
        if (m.nameRU.toLowerCase().includes(movieName.toLowerCase()) && m.duration < 40 ||
            m.nameEN.toLowerCase().includes(movieName.toLowerCase()) && m.duration < 40)
            return m
    })
}

export const findMovies = (fileName, isShortFilm, allMoviesMap) => {

    if (isShortFilm) {
        return findMoviesByNameyAndDuration(fileName, allMoviesMap)
    }
    else  {
   
        return findMoviesByName(fileName, allMoviesMap)
    }
}
