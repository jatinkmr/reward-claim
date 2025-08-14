const DescriptionComponent = ({ title, worth, description, isList = false, prizeList }) => {

    // Function to render the prize list
    const renderPrizeList = () => {
        if (!prizeList || prizeList.length === 0) {
            return <p className="no-prizes">No prizes available</p>;
        }

        // Show only top 3 items (like your screenshot) and then "& Much more..."
        const visiblePrizes = prizeList.slice(0, 3);
        const hasMore = prizeList.length > 3;

        return (
            <div className="prize-list">
                {visiblePrizes.map((prize, index) => (
                    <div key={index} className="prize-item">
                        <div className="prize-info">
                            {/* Image */}
                            {prize.product?.image?.url && (
                                <img
                                    src={prize.product.image.url}
                                    alt={prize.product.image.name || prize.product.title}
                                    className="prize-image"
                                />
                            )}

                            <div className="prize-details">
                                {/* Quantity + Name */}
                                <h4 className="prize-name">
                                    {prize.product?.title || 'N/A'}
                                </h4>
                                {/* Worth */}
                                <p className="prize-worth">
                                    worth ₹{prize.product?.worth || 'N/A'}
                                </p>
                            </div>
                        </div>

                        {/* Divider except last item */}
                        {index !== visiblePrizes.length - 1 && <hr className="prize-divider" />}
                    </div>
                ))}

                {hasMore && (
                    <p className="more-prizes">& Much more...</p>
                )}
            </div>
        );
    };

    return (
        isList ? (
            <>
                <div className="prize-card">
                    <h3 className="prize-title">{title || 'N/A'}</h3>
                    <p className="worth-text">You've a chance to win</p>
                    <hr className="divider" />
                    {renderPrizeList()}
                </div>
            </>
        ) : (
            <div className="prize-card">
                <h3 className="prize-title">{title || 'N/A'}</h3>
                <p className="worth-text">worth ₹{worth || 'N/A'}</p>
                <hr className="divider" />
                <p className="description-text">{description || 'N/A'}</p>
            </div>
        )
    );
};

export default DescriptionComponent;
