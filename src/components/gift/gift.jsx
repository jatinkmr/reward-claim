import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { allocatingGiftService } from '../../services';
import { Container } from 'reactstrap';
import { GiftAvailAndTermsComponent, DescriptionComponent, ImageSectionComponent, UserHeaderComponent, Loader, PrizeGiftComponent } from '../index';

const GiftComponent = () => {
    const { contestId } = useParams();
    const [loading, setLoading] = useState(false);
    const [gift, setGift] = useState({});
    const navigate = useNavigate();


    const enrollmentGift = useCallback(async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem('token');

            const reqBody = { token, contestId };

            const response = await allocatingGiftService(reqBody);

            if (response?.data?.status.toLowerCase() === "ok") {
                setGift({
                    giftTitle: response?.data?.data?.gift?.product?.title || response?.data?.data?.product?.title || 'N/A',
                    giftWorth: response?.data?.data?.gift?.product?.worth || response?.data?.data?.product?.worth || 'N/A',
                    giftImageUrl: response?.data?.data?.gift?.product?.image[0]?.url || response?.data?.data?.product?.image[0]?.url || '',
                    giftDescription: response?.data?.data?.gift?.product?.description || response?.data?.data?.product?.description || 'N/A',
                    phaseEndDate: response?.data?.data?.phase?.endDate || 'N/A',
                    jackPotPrize: response?.data?.data?.phase?.prizeInfo || 'N/A',
                    redemptionCode: response?.data?.data?.redemptionCode || 'N/A',
                    congratulationHeading: response?.data?.data?.gift?.congratulationHeading || response?.data?.data?.congratulationHeading || 'Congratulations!',
                    phaseId: response?.data?.data?.phase?.documentId,
                    customerName: response?.data?.data?.customerInfo?.name || 'N/A'
                });
            }
        } catch (error) {
            navigate("/error", {
                state: {
                    error: {
                        status: error?.response?.status || error?.response?.data?.error?.status || 500,
                        message: error?.response?.data?.error?.message || error?.response?.data?.error || "Unexpected error",
                        details: "Please try again later or contact support."
                    }
                }
            });
        } finally {
            setLoading(false);
        }
    }, [contestId, navigate]);

    useEffect(() => {
        enrollmentGift();
    }, [enrollmentGift]);

    if (loading) return <Loader />;

    return (
        <>
            <Container fluid className="reward-container">
                <div className="reward-box">
                    <UserHeaderComponent customerName={gift.customerName} />

                    <ImageSectionComponent headingText={gift.congratulationHeading} imageUrl={gift.giftImageUrl} />

                    <p className="won-text">You've won a</p>

                    <DescriptionComponent title={gift.giftTitle} worth={gift.giftWorth} description={gift.giftDescription} isList={false} />

                    {gift.redemptionCode ? (
                        <p className="redemption-code">
                            Redemption Code: {gift.redemptionCode}
                        </p>
                    ) : null}

                    {(gift?.phaseEndDate !== 'N/A') ? <PrizeGiftComponent contestId={contestId} title="Mega Jackpot" prizeInfo={gift?.jackPotPrize || {}} endDate={gift.phaseEndDate} textBackgroundColor="#4F46E5" imageBackgroundColor="#27218D" phaseId={gift.phaseId} /> : null}

                    <GiftAvailAndTermsComponent />
                </div>
            </Container>
        </>
    )
}

export default GiftComponent;
