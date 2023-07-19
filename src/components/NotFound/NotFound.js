import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    return (
        <main>
            <section className="notFound">
                <h1 className="notFound__404">404</h1>
                <p className="notFound__title">Страница не найдена</p>
                <Link to="/" className="notFound__back">Назад</Link>
            </section>
        </main>
    )
}
export default NotFound;