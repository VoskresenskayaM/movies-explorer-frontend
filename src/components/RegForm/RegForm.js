import { useState } from 'react';
import './RegForm.css';
import SubmitButton from '../SubmitButton/SubmitButton';
function RegForm({ buttonValue, children }) {

    const [isFormValid, setIsFormVAlid] = useState(false)

    return (
        <form className='regForm'>
            <fieldset className='regForm__block'>
                {children}
            </fieldset>
            <SubmitButton
                buttonValue={buttonValue}
                isFormValid={isFormValid}
            />
        </form>)
}

export default RegForm;
