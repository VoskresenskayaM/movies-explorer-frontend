import { useState } from 'react';
import './RegForm.css';
import SubmitButton from '../SubmitButton/SubmitButton';


function RegForm({ buttonValue, children, hendlePopupOpen, handleSubmit, isFormValid }) {

    /*const [isFormValid, setIsFormVAlid] = useState(false)*/

    return (
        <form onSubmit={handleSubmit} className='regForm'>
            <fieldset className='regForm__block'>
                {children}
            </fieldset>
            <SubmitButton
                buttonValue={buttonValue}
                isFormValid={isFormValid}
                hendlePopupOpen={hendlePopupOpen}
                handleSubmit={handleSubmit}
            />
        </form>)
}

export default RegForm;
