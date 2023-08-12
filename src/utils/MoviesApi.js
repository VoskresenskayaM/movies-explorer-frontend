import { SERVER_MOVIES_URL } from "./Constants"; 

class MoviesApi { 
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getMovies() {
        return fetch(this._baseUrl, {
            headers: this._headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`произошла ошибка на сервере`);
            })
          
    }
}

    const beatFilmApi = new MoviesApi({
        baseUrl: `${SERVER_MOVIES_URL}/beatfilm-movies`,
        headers: {
            "Content-Type": "application/json",
        },
    });

    export default beatFilmApi;
