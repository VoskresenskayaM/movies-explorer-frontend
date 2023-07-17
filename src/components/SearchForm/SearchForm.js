import './SearchForm.css';
import find from '../../images/find.png';
import find_grey from '../../images/find_grey.png';
function SearchForm() {
    return (
        <div className='searchForm'>
            <form className='searchForm__form'>
                <div className='searchForm__block'>
                    <div className='searchForm__form-input-block'>
                        <input className='searchForm__form-input' type='text' name='filmName' placeholder="Фильм" min='1' max='300' required autocomplete="off"></input>
                        <img className='searchForm__form-input-find' src={find_grey} alt='найти' />
                        <button className='searchForm__form-button' type="submit"><img src={find} alt='лупа' /></button>
                    </div>
                    <div className='searchForm__shortFilm-block'>
                        <label for='toddle' className='searchForm__lable'>
                            <input id='toddle' className='searchForm__toggle-input' type='checkbox' name='isShortFilm' />
                            <span className='searchForm__slider'></span>
                        </label>
                        <p className='searchForm__shortFilm'>Kороткометражки</p>
                    </div>
                </div>
            </form>
            <div className='searchForm__border-line'></div>
        </div>
    )
}

export default SearchForm;
