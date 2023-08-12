import './SearchForm.css';
import find from '../../images/find.svg';
import find_grey from '../../images/find_grey.svg';
import { useEffect, useState } from 'react';

function SearchForm({ hendleFindMovies, isSavedList }) {

    const [formValue, setFormValue] = useState('')
    const [formCheckbox, setFormCheckbox] = useState(false)
    const [error, setErrors] = useState('')
    const [isValidInput, setIsValidInputs] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        if (isSavedList === false) {
            if (localStorage.getItem('selectedMovie') !== null
                && localStorage.getItem('selectedShortMovie') !== null) {
                const val = JSON.parse(localStorage.getItem('selectedMovie'))
                setFormValue(val);
                setIsValidInputs(true)
                const short = JSON.parse(localStorage.getItem('selectedShortMovie'))
                setFormCheckbox(short)
            }
        }
    }, [isSavedList])

    const handleChange = (e) => {
        const { value } = e.target;
        if (value.length === 0 || value.length === undefined) {
            setErrors("Заполните это поле");
            setIsValidInputs(false)
        }
        else if (value.length < 2) {
            setErrors("Название не может быть меньше 2-х символов");
            setIsValidInputs(false)
        }
        else if (value.length > 100) {
            setErrors("Название не может быть больше 100 символов");
            setIsValidInputs(false)
        }
        else {
            setErrors('')
            setIsValidInputs(true)
        }
        setFormValue(value);
    }

    useEffect(() => {
        if (isValidInput === true
            && error === ''
            && formValue !== '')
            setIsFormValid(true)
        else setIsFormValid(false)
    }, [isValidInput, error, formValue])

    const soldCheckbox = (e) => {
        const { checked } = e.target
        setFormCheckbox(checked);
        if(localStorage.getItem('selectedMovie') !== null || isSavedList===true){
        hendleFindMovies(formValue, !formCheckbox)}
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        hendleFindMovies(formValue, formCheckbox)
    }

    const searchFormInputError = isValidInput ? 'searchForm__form-input-error' :
        'searchForm__form-input-error searchForm__form-input-error_active'

    const buttonClassName = `searchForm__form-button  ${!isFormValid ? 'searchForm__form-button_inactive' : ''}`

    return (
        <section className='searchForm'>
            <form onSubmit={handleSubmit} className='searchForm__form' noValidate>
                <div className='searchForm__block'>
                    <div className='searchForm__form-input-block'>
                        <div className='searchForm__form-input-error-block'>
                            <input
                                className='searchForm__form-input'
                                type='text'
                                name='movieName'
                                value={formValue || ''}
                                placeholder="Фильм"
                                required
                                autoComplete="off"
                                onChange={handleChange} />
                            <span className={searchFormInputError}>{error}</span>
                        </div>
                        <img className='searchForm__form-input-find' src={find_grey} alt='найти' />
                        <button className={buttonClassName} type="submit" disabled={!isFormValid}><img src={find} alt='лупа' /></button>
                    </div>
                    <div className='searchForm__shortFilm-block'>
                        <label htmlFor='toddle' className='searchForm__lable'>
                            <input
                                id='toddle'
                                className='searchForm__toggle-input'
                                type='checkbox'
                                name='isShortFilm'
                                checked={formCheckbox || false}
                                onChange={soldCheckbox} />
                            <span className='searchForm__slider'></span>
                        </label>
                        <p className='searchForm__shortFilm'>Kороткометражки</p>
                    </div>
                </div>
            </form>
            <div className='searchForm__border-line'></div>
        </section>
    )
}

export default SearchForm;
