import './SearchForm.css';
import find from '../../images/find.svg';
import find_grey from '../../images/find_grey.svg';
import { useState } from 'react';
import { useFormValidate } from '../../hooks/useFormValidate';
import { ConsoleWriter } from 'istanbul-lib-report';

function SearchForm({ hendleFindMovies, searchMovie }) {

    const formFields = ['movieName']
    const { isValidInputs, errors, formValue, handleChange, isFormValid } = useFormValidate(...formFields)

   


    /*const [formValue, setFormValue] = useState({
        movieName: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
           [name] : value
        });
    }*/
    const [formCheckbox, setFormCheckbox] = useState(false)
    const soldCheckbox = ({ target: { checked } }) => {
        setFormCheckbox(checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        hendleFindMovies(formValue.movieName, formCheckbox)
    }
    const searchFormInputError = isValidInputs.movieNameIdValid ? 'searchForm__form-input-error' :
        'searchForm__form-input-error searchForm__form-input-error_active'

    return (
        <section className='searchForm'>
            <form onSubmit={handleSubmit} className='searchForm__form'>
                <div className='searchForm__block'>
                    <div className='searchForm__form-input-block'>
                        <div className='searchForm__form-input-error-block'>
                            <input
                                className='searchForm__form-input'
                                type='text'
                                name='movieName'
                                value={searchMovie||formValue.movieName}
                                placeholder="Фильм"
                                required 
                                autoComplete="off"
                                onChange={handleChange} />
                            {<span className={searchFormInputError}>{errors.movieNameError}</span>}
                        </div>
                        <img className='searchForm__form-input-find' src={find_grey} alt='найти' />
                        <button className='searchForm__form-button' type="submit" disabled={!isFormValid}><img src={find} alt='лупа' /></button>
                    </div>
                    <div className='searchForm__shortFilm-block'>
                        <label htmlFor='toddle' className='searchForm__lable'>
                            <input
                                id='toddle'
                                className='searchForm__toggle-input'
                                type='checkbox'
                                name='isShortFilm'
                                checked={formCheckbox}
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
