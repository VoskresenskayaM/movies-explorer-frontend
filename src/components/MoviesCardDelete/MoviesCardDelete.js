import './MoviesCardDelete.css';
import del from '../../images/delete.svg';

function MoviesCardDelete({ hendlePopupOpen }) {

    return (
        <button className='moviesCardDelete' onClick={hendlePopupOpen}>
            <img src={del} alt='крестик' />
        </button>
    )
}

export default MoviesCardDelete;