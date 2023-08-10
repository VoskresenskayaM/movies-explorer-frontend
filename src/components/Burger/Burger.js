import './Burger.css'
function Burger({ hendlePopupOpen }) {
    return (
        <div className='burger' onClick={hendlePopupOpen}>
            <div className='burger__line'></div>
            <div className='burger__line'></div>
            <div className='burger__line'></div>
        </div>
    )
}

export default Burger;
