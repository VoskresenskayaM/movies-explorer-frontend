import './MoviesCardSave.css';

function MoviesCardSave({ handleSave }) {
    return (
        <button className='moviesCardSave' onClick={handleSave}>
            <p className='moviesCardSave__value'>Сохранить</p>
        </button>
    )
}

export default MoviesCardSave;
