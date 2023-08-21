import './NotFoundMap.css';
function NotFoundMap({ isSavedList }) {
    let text;
    if (!isSavedList) {
        text = localStorage.getItem('selectedMoviesMap') !== null ? "По Вашему запросу не найдено ни одного фильма. Измените запрос и попробуйтe еще раз." :
            "Для того чтобы начать поиски введите название фильма в строке поиска"
    }
    else {
        text = "По Вашему запросу не найдено ни одного фильма. Измените запрос и попробуйтe еще раз."
    }
    return (
        <div className='notfoundmap'>
            <h2 className='notfoundmap-title'>{text}</h2>
        </div>
    )
}

export default NotFoundMap;
