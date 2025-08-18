import { Col, Row } from "reactstrap";
import { baseUrl } from "../../services";
import './imageSection.css';

const ImageSectionComponent = ({ imageUrl, headingText, isJackpot = false, endDate, isBetterLuck = false }) => {
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
        <div className="reward-section">
            {isBetterLuck ? (
                <>
                    <Row>
                        <Col>
                            <p className="betterLuckNextTimeHeading">Sorry, Now win today but <br /> better luck next time!</p>
                        </Col>
                    </Row>
                </>
            ) : (isJackpot ? (
                <>
                    <Row>
                        <Col xs={3}>
                            <img
                                src="/Success.svg"
                                alt="jackpot-image"
                            />
                        </Col>
                        <Col>
                            <h1 className="congrats-text">{headingText}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="winner-section">
                            Winners to be declared on {formatDate(endDate)}
                        </Col>
                    </Row>
                </>
            ) : (
                <h1 className="congrats-text">{headingText}</h1>
            ))}
            <img
                src={isBetterLuck ? '/emptyGiftBox.svg' : (imageUrl?.includes('media.strapiapp.com') ? imageUrl : `${baseUrl}${imageUrl}`)}
                alt="reward-image"
                className="reward-image"
            />
        </div>
    )
}

export default ImageSectionComponent;
