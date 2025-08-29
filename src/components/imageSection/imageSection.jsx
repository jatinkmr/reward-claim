import { Col, Row } from "reactstrap";
import { baseUrl } from "../../services";
import "./imageSection.css";
import successGif from "./../../assets/SuccessGif.gif";

const ImageSectionComponent = ({
  imageUrl,
  headingText,
  headingText2,
  isJackpot = false,
  endDate,
  isBetterLuck = false,
  customClassName = "",
}) => {
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
    <div className={`reward-section ${customClassName}`}>
      {isBetterLuck ? (
        <>
          <Row>
            <Col>
              <p className="better-luck-title">
                Sorry, No win today but <br /> better luck next time!
              </p>
            </Col>
          </Row>
        </>
      ) : isJackpot ? (
        <>
          <div className="jackpot-heading">
            <img
              src={successGif}
              alt="success-jackpot-img"
              className="success-jackpot-img"
            />
            <h1 className="congrats-text-jackpot">{headingText}</h1>
          </div>

          <div className="winner-section">
            Winners to be declared on {formatDate(endDate)}
          </div>
        </>
      ) : (
        <>
          <h1 className="congrats-text">{headingText}</h1>
          {headingText2 ? (
            <h1 className="congrats-text">{headingText2}</h1>
          ) : null}
        </>
      )}

      <img
        src={
          isBetterLuck
            ? "/emptyGiftBox.svg"
            : imageUrl?.includes("media.strapiapp.com")
            ? imageUrl
            : `${baseUrl}${imageUrl}`
        }
        alt="reward-image"
        className="reward-image"
      />
    </div>
  );
};

export default ImageSectionComponent;
