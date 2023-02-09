
const ApartmentsListItem = ({name, rooms, price, description, handleDelete, nodeRef}) => {
    
    return(
        <div className="apartments-list-item" ref={nodeRef}>
            <div className="apartments-list-item__title">{name}</div>
            <div className="apartments-list-item__small">
                <span className="apartments-list-item__label">Rooms: </span>
                {rooms}
            </div>
            <div className="apartments-list-item__small">
                <span className="apartments-list-item__label">Price: </span>
                {`${price}$`}
            </div>
            <div className="apartments-list-item__description">{description}</div>
            <div className="apartments-list-item__btns">
                <button 
                    className="apartments-list-item__button"
                    onClick={handleDelete}>
                        Delete
                </button>
            </div>
        </div>
    )
}

export default ApartmentsListItem;