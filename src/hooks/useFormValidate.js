import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import validator from "validator";
import { VALIDATE_PASSWORD, VALIDATE_NAME } from '../utils/Constants';
import { CurrentUserContext } from '../context/currentUserContext';

export const useFormValidate = (...args) => {
    const location = useLocation()
    const [formValue, setFormValue] = useState({})
    const [errors, setErrors] = useState({})
    const [isValidInputs, setIsValidInputs] = useState({})

    const user = useContext(CurrentUserContext);

    useEffect(() => {
        args.forEach(val => {
            formValue[val] = ''
            setFormValue(formValue)
            errors[`${val}Error`] = ''
            setErrors(errors)
            isValidInputs[`${val}IsValid`] = false
            setIsValidInputs(isValidInputs)
        })
    }, [])

        const [isFormValid, setIsFormValid] = useState(false)
    useEffect(() => {
        if (location.pathname === '/profile') {
            setFormValue({
                'name': user.name,
                'email': user.email
            });
            setIsValidInputs({
                'nameIsVaild': true,
                'emailIsValid': true
            })
        }
    }, [])

    const validate = (name, value) => {
        switch (name) {
            case "name":
                if (value.length === 0 || value.length === undefined) {
                    setErrors({ ...errors, [`${name}Error`]: "Заполните это поле" });
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })
                }
                else if (value.length < 2) {
                    setErrors({
                        ...errors,
                        [`${name}Error`]: "Имя не может быть меньше 2-х символов",
                    });
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })
                } else if (value.length >= 30) {
                    setErrors({
                        ...errors,
                        [`${name}Error`]: "Имя не может быть больше 30-ти символов",
                    });
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })

                } else if (!VALIDATE_NAME.test(value)) {
                    setErrors({
                        ...errors,
                        [`${name}Error`]: "Имя должно состоять из букв, дефисов или пробелов",
                    });
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })
                }
                else {
                    setErrors({ ...errors, [`${name}Error`]: '' })
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: true })
                }
                break;

            case "email":
                if (value.length === 0 || value.length === undefined) {
                    setErrors({ ...errors, [`${name}Error`]: "Заполните это поле" });
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })
                }

                else if (!validator.isEmail(value)) {
                    setErrors({
                        ...errors,
                        [`${name}Error`]: "Некорректный адрес электронной почты",
                    });
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })
                }
                else {
                    setErrors({ ...errors, [`${name}Error`]: '' })
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: true })
                }
                break;

            case "password":
                if (value.length === 0 || value.length === undefined) {
                    setErrors({ ...errors, [`${name}Error`]: "Заполните это поле" });
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })
                }
                else if (!VALIDATE_PASSWORD.test(value)) {
                    setErrors({
                        ...errors,
                        [`${name}Error`]: "Пароль может состоять из букв, символов !@#$%^&* и должен иметь длину от 6 до 20 символов",
                    });
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: false })
                }
                else {
                    setErrors({ ...errors, [`${name}Error`]: '' })
                    setIsValidInputs({ ...isValidInputs, [`${name}IsValid`]: true })
                }

                break;
            default:
                break;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        validate(name, value)
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    useEffect(() => {
        if (Object.values(isValidInputs).every(e => e === true)
            && Object.values(errors).every(e => e === '')
            && Object.values(formValue).every(e => e !== ''))
            setIsFormValid(true)
        else setIsFormValid(false)
    }, [isValidInputs, errors, formValue])

    return { isValidInputs, errors, formValue, handleChange, isFormValid }
}
