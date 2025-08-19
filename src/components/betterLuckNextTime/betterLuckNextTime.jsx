import { Container } from "reactstrap";
import { UserHeaderComponent, ImageSectionComponent, PrizeGiftComponent } from "../index";

const IsBetterLuckNextTime = ({ contestId, phaseInfo, enrollmentGift }) => {
    return (
        <>
            <Container fluid className="reward-container">
                <div className="reward-box">
                    <UserHeaderComponent customerName={phaseInfo.customerName} />

                    <ImageSectionComponent isBetterLuck={true} isJackpot={false} />

                    <p className="betterLuckNextTimeHeading">Stay tuned! The next exciting contest <br /> is just around the corner!</p>

                    {(phaseInfo?.phaseEndDate !== 'N/A') ? <PrizeGiftComponent contestId={contestId} title="Mega Jackpot" prizeInfo={phaseInfo?.prizeInfo || {}} endDate={phaseInfo?.endDate || ''} textBackgroundColor="#4F46E5" imageBackgroundColor="#27218D" phaseId={phaseInfo.phaseId} isEnrollment={true} enrollmentGift={enrollmentGift} /> : null}
                </div>
            </Container>
        </>
    )
}

export default IsBetterLuckNextTime;
