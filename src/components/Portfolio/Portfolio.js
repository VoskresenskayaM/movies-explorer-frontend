import './Portfolio.css';
import PortfolioLink from '../PortfolioLink/PortfolioLink';

function Portfolio() {
    return (
        <div className='portfolio'>
            <h3 className='portfolio-title'>Портфолио</h3>
            <div className='portfolio-container'>
                <div className='portfolio-blok'>
                    <PortfolioLink
                        name='Статичный сайт'
                        link='https://voskresenskayam.github.io/how-to-learn/' />
                    <PortfolioLink
                        name='Адаптивный сайт'
                        link='https://voskresenskayam.github.io/russian-travel/' />
                    <PortfolioLink
                        name='Одностраничное приложение'
                        link='https://vmm459.nomoredomains.rocks' />
                </div>
            </div>
        </div>
    )
}

export default Portfolio;
