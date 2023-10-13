import { SERVER_MAIN_URL } from "./Constants";
import { SERVER_MOVIES_URL } from "./Constants";

class MainApi {
    constructor(bathPath, token) {
        this._basePath = bathPath;
    }

    _getHeaders() {
        return {
            authorization: `Bearer ${localStorage.getItem('token')} `,
            'Content-Type': 'application/json'
        }
    }

    _getJson(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._getJson);
    }

    getMovies() {
        return this._request(`${this._basePath}/movies`, {
            headers: this._getHeaders()
        });
    }

    deleteMovies(id) {
        return this._request(`${this._basePath}/movies/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders()
        });
    }

    getUser() {
        return this._request(`${this._basePath}/users/me`, {
            headers: this._getHeaders()
        });
    }

    editUser({ item }) {
        return this._request(`${this._basePath}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: item.name,
                email: item.email,
                password: item.password
            })
        });
    }

    saveMovies({ item }) {
        return this._request(`${this._basePath}/movies`, {
            method: "POST",
            headers: this._getHeaders(),
            body: JSON.stringify({
                "country": item.country,
                "director": item.director,
                "duration": item.duration,
                "year": item.year,
                "description": item.description,
                "image": `${SERVER_MOVIES_URL}${item.image.url}`,
                "trailer": item.trailerLink,
                "thumbnail": `${SERVER_MOVIES_URL}${item.image.formats.thumbnail.url}`,
                "nameRU": item.nameRU,
                "nameEN": item.nameEN,
            })
        });
    }
}

const api = new MainApi(SERVER_MAIN_URL)
export default api;