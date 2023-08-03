import './MoviesCardIcon.css';
import save from '../../images/icon.svg';

function MoviesCardIcon({ hendleDeleteSavedMovies }) {
    return (
        <button className='moviesCardIcon' onClick={hendleDeleteSavedMovies}>
            <img src={save} alt='галочка'  />
        </button>
    )
}

export default MoviesCardIcon;