import './RegQuestion.css';
import { Link } from 'react-router-dom';

function RegQuestion({ question, link, buttonValue }) {
    return (
        <div className='regQuestion'>
            <p className='regQuestion__question'>{question}</p>
            <Link to={link} className='regQuestion__question-link'>{buttonValue}</Link>
        </div>
    )
}

export default RegQuestion;
