import './Input.css';

function Input({ id, lable, type, name, autoComplete, placeholder, error, isValidInput, value }) {
    const errorClassName = `input__error ${isValidInput ? '' : 'input__error-active'}`
    const inputClassName = `input__input ${isValidInput ? '' : 'input__input-text-error'}`
    return (
        <div className='input'>
            <label className="input__lable" htmlFor={id}>{lable}</label>
            <input className={inputClassName}
                id={id}
                type={type}
                name={name}
                autoComplete={autoComplete}
                placeholder={placeholder}
                value={value}
                required
            />
            <span className={errorClassName}>{error}</span>
        </div>
    )
}
export default Input;