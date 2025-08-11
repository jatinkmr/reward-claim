const DescriptionComponent = ({ title, worth, description }) => {
    return (
        <div className="prize-card">
            <h3 className="prize-title">{title || 'N/A'}</h3>
            <p className="worth-text">worth ₹{worth || 'N/A'}</p>
            <hr className="divider" />
            <p className="description-text">{description || 'N/A'}</p>
        </div>
    )
}

export default DescriptionComponent;
