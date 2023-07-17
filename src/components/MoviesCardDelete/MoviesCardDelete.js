import './MoviesCardDelete.css';
import del from '../../images/delete.svg';

function MoviesCardDelete({ hendlePopupOpen }) {

    return (
        <div className='moviesCardDelete' onClick={hendlePopupOpen}>
            <img src={del} alt='крестик' />
        </div>
    )
}

export default MoviesCardDelete;