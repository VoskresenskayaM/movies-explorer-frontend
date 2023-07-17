import imglLink from '../../images/link.svg';
import './PortfolioLink.css'

function PorfolioLink({ name, link }) {
    return (
        <div className='porfolioLink'>
            <h3 className='porfolioLink__name'>{name}</h3>
            <a href={link} className="porfolioLink__link" target="_blank" rel="noopener noreferrer">
                <img className='porfolioLink__img' src={imglLink} alt='срелка' />
            </a>
        </div>
    )
}

export default PorfolioLink;
