import { Container } from "reactstrap";
import { DescriptionComponent, GiftAvailAndTermsComponent, ImageSectionComponent, PrizeGiftComponent, UserHeaderComponent } from "../index";

const JackPotWon = ({ contestId, phaseInfo, enrollmentGiftPrize }) => {
    return (
        <>
            <Container fluid className="reward-container">
                <div className="reward-box">
                    <UserHeaderComponent customerName={phaseInfo.customerName} />

                    <ImageSectionComponent imageUrl={enrollmentGiftPrize?.prize?.product?.image[0]?.url} headingText="Congratulations!" headingText2="Jackpot Win" />

                    <p className="won-text">You've won a</p>

                    <DescriptionComponent title={enrollmentGiftPrize?.prize?.product?.title} worth={enrollmentGiftPrize?.prize?.product?.worth} description={enrollmentGiftPrize?.prize?.product?.description} />

                    {enrollmentGiftPrize.redemptionCode ? (
                        <p className="redemption-code">
                            Redemption Code: {enrollmentGiftPrize.redemptionCode}
                        </p>
                    ) : null}

                    <PrizeGiftComponent contestId={contestId} title="Enrollment Gift" textBackgroundColor="#D1AA61" imageBackgroundColor="#816632" isEnrollment={true} enrollmentGift={enrollmentGiftPrize} prizeInfo={phaseInfo.prizeInfo || {}} />

                    <GiftAvailAndTermsComponent />
                </div>
            </Container>
        </>
    )
}

export default JackPotWon;
