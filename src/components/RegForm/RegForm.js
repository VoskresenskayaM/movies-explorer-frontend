import './RegForm.css';
import SubmitButton from '../SubmitButton/SubmitButton';
import ErrorMessageFromForm from '../ErrorMessageFromForm/ErrorMessageFromForm';

function RegForm({ buttonValue, children, hendlePopupOpen, handleSubmit, isFormValid, errorMessage}) {

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
                isFormValid={isFormValid}
                hendlePopupOpen={hendlePopupOpen}
                handleSubmit={handleSubmit}
             
            />
        </form>)
}

export default RegForm;
