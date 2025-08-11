import { Col, Container, Row } from "reactstrap";

const PrizeGiftComponent = ({ title, endDate, textBackgroundColor, imageBackgroundColor }) => {
    return (
        <>
            <div className="jackpotWrapper">
                <Row className="jackpot-banner no-stack">
                    {/* Left Section */}
                    <Col xs="7" className="jackpot-text">
                        <p className="jackpot-subtitle">{title}</p>
                        <h2 className="jackpot-title">
                            Your chance to win <br /> {}
                        </h2>
                        <div className="jackpot-result">Result on Sep 1</div>
                    </Col>

                    {/* Right Section */}
                    <Col xs="5" className="jackpot-image">
                        <img
                            src="https://images-cdn.ubuy.co.in/667950946610b7744c0d4637-2020-new-sony-playstation-5-disc.jpg"
                            alt="Playstation 5"
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default PrizeGiftComponent;
