import './Input.css';

function Input({ id, lable, type, name, autoComplete, placeholder, error, isValidInput, value }) {
    const errorClassName = `input__error ${isValidInput ? '' : 'input__error-active'}`
    const inputClassName = `input__input ${isValidInput ? '' : 'input__input-text-error'}`
    return (
        <div className='input'>
            <lable className="input__lable" for={id}>{lable}</lable>
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