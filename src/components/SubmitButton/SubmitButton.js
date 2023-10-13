import React from "react";
import './SubmitButton.css'
function SubmitButton({ buttonValue, isFormValid, handleSubmit}) {

    const buttonClassName = `submitButton ${!isFormValid ? 'submitButton_inactive' : ''}`
    return (
        <button className={buttonClassName} type="submit" disabled={!isFormValid} onSubmit={handleSubmit}>{buttonValue}</button>
    )
}

export default SubmitButton;
