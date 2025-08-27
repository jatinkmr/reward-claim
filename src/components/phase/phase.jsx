import { useNavigate, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { DescriptionComponent, ImageSectionComponent, IsBetterLuckNextTime, JackPotWon, Loader, PrizeGiftComponent, PrizeTermsAndConditionsComponent, UserHeaderComponent } from "../index";
import { useEffect, useState } from "react";
import { fetchPhaseService } from "../../services";

const PhaseEnrollmentComponent = () => {
    const { contestId } = useParams();
    const [loading, setLoading] = useState(false);
    const [phase, setPhase] = useState({});
    const [prizeImgUrl, setPrizeImgUrl] = useState('');
    const [enrollmentGift, setEnrollmentGift] = useState({});
    const navigate = useNavigate();
    const [isBetterLuck, setIsBetterLuck] = useState(false);

    useEffect(() => {
        const fetchPhaseEnrollment = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');

                const reqBody = { token, contestId };

                const response = await fetchPhaseService(reqBody);

                if (response?.data?.status.toLowerCase() === "ok" || response?.data?.status === 200) {
                    // if bannerImage available then show bannerImage else show the highestProbability or rarest prize
                    if (response?.data?.data?.bannerImage?.url) {
                        setPrizeImgUrl(response?.data?.data?.bannerImage?.url);
                    } else if (response?.data?.data?.prizes?.length) {
                        // Filter prize with highest probability value
                        let highestProbabilityPrize = response.data.data.prizes.reduce((maxPrize, currentPrize) => {
                            return (currentPrize.probability > maxPrize.probability) ? currentPrize : maxPrize;
                        });
                        if (highestProbabilityPrize?.product?.image?.length && highestProbabilityPrize?.product?.image[0]?.url) {
                            setPrizeImgUrl(highestProbabilityPrize?.product?.image[0]?.url);
                        } else {
                            setPrizeImgUrl('')
                        }
                    }
                    setPhase({
                        customerName: response?.data?.data?.customerInfo?.name,
                        endDate: response?.data?.data?.endDate,
                        prizes: response?.data?.data?.prizes?.length ? response?.data?.data?.prizes : [],
                        prizeInfo: response?.data?.data?.prizeInfo || 'N/A',
                        isWon: (response?.data?.data?.enrollmentGift?.prize?.documentId !== ""),
                        redemptionCode: response?.data?.data?.enrollmentGift?.redemptionCode || 'N/A'
                    })
                    setEnrollmentGift(response?.data?.data?.enrollmentGift)
                    setIsBetterLuck(!!response?.data?.data?.enrollmentGift?.prize?.product?.isBetterLuck)
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
        };

        fetchPhaseEnrollment();
    }, [contestId, navigate])

    if (loading) return <Loader />

    if (isBetterLuck) return <IsBetterLuckNextTime contestId={contestId} phaseInfo={phase} enrollmentGift={enrollmentGift} />

    if (phase?.isWon) return <JackPotWon contestId={contestId} phaseInfo={phase} enrollmentGiftPrize={enrollmentGift} />

    return (
        <>
            <Container fluid className="reward-container">
                <div className="reward-box">
                    <UserHeaderComponent customerName={phase.customerName} />

                    <ImageSectionComponent imageUrl={prizeImgUrl} headingText="Jackpot Entry Confirmed" endDate={phase.endDate} isJackpot={true} />

                    <DescriptionComponent isList={true} title="Prizes" prizeList={phase.prizes} />

                    {phase?.prizes?.length ? <PrizeGiftComponent contestId={contestId} title="Enrollment Gift" textBackgroundColor="#D1AA61" imageBackgroundColor="#816632" isEnrollment={true} enrollmentGift={enrollmentGift} /> : null}

                    <PrizeTermsAndConditionsComponent endDate={phase.endDate} />
                </div>
            </Container>
        </>
    )
};

export default PhaseEnrollmentComponent;
