import { Button } from "reactstrap";
import { baseUrl } from "../../services";
import { useNavigate } from "react-router-dom";

const PrizeGiftComponent = ({
  contestId,
  title,
  prizeInfo,
  endDate,
  textBackgroundColor,
  imageBackgroundColor,
  phaseId,
  isEnrollment = false,
  enrollmentGift,
}) => {
  const navigate = useNavigate();

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
      <div
        className="jackpot-banner"
        style={{ backgroundColor: textBackgroundColor }}
      >
        <div className="jackpot-wrapper">
          {/* Left Section */}
          <div className="jackpot-text">
            <p className="jackpot-subtitle">{title}</p>
            <h2 className="jackpot-title">
              {isEnrollment
                ? enrollmentGift?.gift?.product?.title || "N/A"
                : `Your chance to win`}
              <br />
              {isEnrollment ? null : prizeInfo?.product?.title || "N/A"}
            </h2>
            {isEnrollment ? (
              <Button
                className="jackpot-result"
                onClick={() => navigate(`/contest/${contestId}/gift`)}
              >
                {enrollmentGift?.giftClaimedAt ? "Claimed" : "Claim Now"}
              </Button>
            ) : (
              <Button
                className="jackpot-result"
                onClick={() =>
                  navigate(`/contest/${contestId}/phase/${phaseId}`)
                }
              >
                Result Declared on {formatDate(endDate)}
              </Button>
            )}
          </div>

          {/* Right Section */}
          <div
            className="jackpot-image"
            style={{ backgroundColor: imageBackgroundColor }}
          >
            {isEnrollment ? (
              <img
                alt={enrollmentGift?.gift?.product?.title || "Prize Image"}
                src={
                  enrollmentGift?.gift?.product?.image[0]?.url?.includes(
                    "media.strapiapp.com"
                  )
                    ? enrollmentGift?.gift?.product?.image[0]?.url
                    : (enrollmentGift?.gift?.product?.image[0]?.url
                        ? `${baseUrl}${enrollmentGift?.gift?.product?.image[0]?.url}`
                        : "") || ""
                }
              />
            ) : (
              <img
                src={
                  prizeInfo?.product?.image[0]?.url?.includes(
                    "media.strapiapp.com"
                  )
                    ? prizeInfo?.product?.image[0]?.url
                    : (prizeInfo?.product?.image[0]?.url
                        ? `${baseUrl}${prizeInfo?.product?.image[0]?.url}`
                        : "") || ""
                }
                alt={prizeInfo?.product?.title || "Prize Image"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrizeGiftComponent;
