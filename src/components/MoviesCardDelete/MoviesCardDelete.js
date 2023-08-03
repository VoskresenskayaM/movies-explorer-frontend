import './MoviesCardDelete.css';
import del from '../../images/delete.svg';

function MoviesCardDelete({ hendleDelete }) {

    return (
        <button className='moviesCardDelete' onClick={hendleDelete}>
            <img src={del} alt='крестик' />
        </button>
    )
}

export default MoviesCardDelete;
