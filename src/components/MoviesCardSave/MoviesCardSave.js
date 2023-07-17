import './MoviesCardSave.css';

function MoviesCardSave({ handleSave }) {
    return (
        <div className='moviesCardSave' onClick={handleSave}>
            <p className='moviesCardSave__value'>Сохранить</p>
        </div>
    )
}

export default MoviesCardSave;
