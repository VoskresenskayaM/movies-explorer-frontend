import './RegForm.css';
import SubmitButton from '../SubmitButton/SubmitButton';
import ErrorMessageFromForm from '../ErrorMessageFromForm/ErrorMessageFromForm';

function RegForm({ buttonValue, children, hendlePopupOpen, handleSubmit, isFormValid, errorMessage}) {

    const isFormValidButton = errorMessage === '' ? isFormValid : false

    return (
        <form onSubmit={handleSubmit} className='regForm' noValidate>
            <fieldset className='regForm__block'>
                {children}
            </fieldset>
            <ErrorMessageFromForm
                errorMessage={errorMessage}
            />
            <SubmitButton
                buttonValue={buttonValue}
                isFormValid={isFormValidButton}
                hendlePopupOpen={hendlePopupOpen}
                handleSubmit={handleSubmit}
             
            />
        </form>)
}

export default RegForm;
