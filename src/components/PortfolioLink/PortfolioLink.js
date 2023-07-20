
import imglLink from '../../images/link.svg';
import './PortfolioLink.css'

function PorfolioLink({ name, link }) {
    return (
        <a href={link} className="porfolioLink__link" target="_blank" rel="noopener noreferrer">
            <div className='porfolioLink-block'>
                <h3 className='porfolioLink__name'>{name}</h3>
                <img className='porfolioLink__img' src={imglLink} alt='срелка' />
            </div>
        </a>
    )
}

export default PorfolioLink;
