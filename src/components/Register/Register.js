import './Register.css';
import RegForm from '../RegForm/RegForm';
import Input from '../Input/Input';
import RegQuestion from '../RegQuestion/RegQuestion';
function Register() {
    return (
            <main>
                <section className='regiser'>
                    <RegForm
                        children={
                            <>
                                <Input
                                    id='nameId'
                                    lable='Имя'
                                    type='text'
                                    name='name'
                                    autoComplete='on'
                                    placeholder=''
                                    error='какая-то ошибка валидации'
                                    isValidInput={false}
                                />
                                <Input
                                    id='emailId'
                                    lable='Email'
                                    type='email'
                                    name='email'
                                    autoComplete='on'
                                    placeholder=''
                                    error='какая-то ошибка валидации'
                                    isValidInput={true}
                                />
                                <Input
                                    id='passwordId'
                                    lable='Пароль'
                                    type='password'
                                    name='password'
                                    autoComplete='on'
                                    placeholder=''
                                    error='какая-то ошибка валидации'
                                    isValidInput={false}
                                />
                            </>
                        }
                        buttonValue='Зарегистрироваться' />
                    <RegQuestion
                        question='Уже зарегистрированы?'
                        link='/signin'
                        buttonValue='Войти'
                    />
                </section>
            </main>
    )
}
export default Register;
