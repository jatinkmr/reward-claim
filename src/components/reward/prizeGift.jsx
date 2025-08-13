import { baseUrl } from "../../services";

const PrizeGiftComponent = ({ title, prizeInfo, endDate, textBackgroundColor, imageBackgroundColor }) => {

    const formatDate = (dateInput) => {
        const date = new Date(dateInput);
        if (Number.isNaN(date.getTime())) return "TBA";
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(date);
    };

    return (
        <>
            <div className="jackpot-wrapper">
                <div className="jackpot-banner">
                    {/* Left Section */}
                    <div className="jackpot-text" style={{ backgroundColor: textBackgroundColor }}>
                        <p className="jackpot-subtitle">{title}</p>
                        <h2 className="jackpot-title">
                            Your chance to win<br />
                            {prizeInfo?.product?.title || 'Playstation 5'}
                        </h2>
                        <div className="jackpot-result">
                            Result on {formatDate(endDate)}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="jackpot-image" style={{ backgroundColor: imageBackgroundColor }}>
                        <img
                            src={prizeInfo?.product?.image[0]?.url?.includes('media.strapiapp.com')
                                ? prizeInfo?.product?.image[0]?.url
                                : (prizeInfo?.product?.image[0]?.url
                                    ? `${baseUrl}${prizeInfo?.product?.image[0]?.url}`
                                    : '') || ''}
                            alt={prizeInfo?.product?.title || 'Prize Image'}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PrizeGiftComponent;
