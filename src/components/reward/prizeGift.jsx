import { Col, Row } from "reactstrap";
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
            <div className="jackpotWrapper">
                <Row className="jackpot-banner no-stack">
                    {/* Left Section */}
                    <Col xs="7" className="jackpot-text" style={{ backgroundColor: textBackgroundColor }}>
                        <p className="jackpot-subtitle">{title}</p>
                        <h2 className="jackpot-title">
                            Your chance to win <br /> {prizeInfo?.product?.title || 'N/A'}
                        </h2>
                        <div className="jackpot-result">Result on {formatDate(endDate)}</div>
                    </Col>

                    {/* Right Section */}
                    <Col xs="5" className="jackpot-image" style={{ backgroundColor: imageBackgroundColor }}>
                        <img
                            src={prizeInfo?.product?.image[0]?.url?.includes('media.strapiapp.com') ? prizeInfo?.product?.image[0]?.url : (prizeInfo?.product?.image[0]?.url ? `${baseUrl}${prizeInfo?.product?.image[0]?.url}` : '') || ''}
                            alt={prizeInfo?.product?.title || 'N/A'}
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default PrizeGiftComponent;
