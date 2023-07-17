import './Login.css';
import RegForm from '../RegForm/RegForm';
import Input from '../Input/Input';
import RegQuestion from '../RegQuestion/RegQuestion';

function Login() {
    return (
        <div className='login'>
            <RegForm
                children={
                    <>
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
                buttonValue='Войти' />
            <RegQuestion
                question='Еще не зарегистрированны?'
                link='/signup'
                buttonValue='Регистрация'
            />
        </div>
    )
}
export default Login;
