import React from "react";
import './SubmitButton.css'
function SubmitButton({ buttonValue, isFormValid }) {

    const buttonClassName = `submitButton ${isFormValid ? 'submitButton_inactive' : ''}`
    console.log(isFormValid)
    return (
        <button className={buttonClassName} type="submit" disabled={isFormValid}>{buttonValue}</button>
    )
}

export default SubmitButton;
