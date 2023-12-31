          
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound({loggenIn}) {

    const navigate = useNavigate();

    const hendleBack=()=>{
      !loggenIn? navigate(-1): navigate(-3)
    }
    return (
        <main>
            <section className="notFound">
                <h1 className="notFound__404">404</h1>
                <p className="notFound__title">Страница не найдена</p>
                <button className="notFound__back" onClick={hendleBack}>Назад</button>
            </section>
        </main>
    )
}
export default NotFound;