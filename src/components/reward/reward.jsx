import React, { useCallback, useEffect, useState } from "react";
import Loader from "../loader/loader";
import { allocatingGiftService } from "../../services/reward";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { baseUrl } from "../../services";
import DescriptionComponent from "./description";
import AvailAndTermsComponent from "./availAndTerms";
import PrizeGiftComponent from "./prizeGift";

const RewardComponent = () => {
    const { contestId } = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [reward, setReward] = useState({});
    const navigate = useNavigate();

    const enrollingUser = useCallback(async () => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");

        setLoading(true);
        try {
            const reqBody = { token, contestId };
            const response = await allocatingGiftService(reqBody);
            if (response?.data?.status.toLowerCase() === "ok") {
                setReward({
                    giftTitle: response?.data?.data?.gift?.product?.title || response?.data?.data?.product?.title || 'N/A',
                    giftWorth: response?.data?.data?.gift?.product?.worth || response?.data?.data?.product?.worth || 'N/A',
                    giftImageUrl: response?.data?.data?.gift?.product?.image[0]?.url || response?.data?.data?.product?.image[0]?.url || '',
                    giftDescription: response?.data?.data?.gift?.product?.description || response?.data?.data?.product?.description || 'N/A',
                    phaseEndDate: response?.data?.data?.phase?.endDate || 'N/A',
                    jackPotPrize: response?.data?.data?.phase?.prizeInfo || 'N/A',
                    redemptionCode: response?.data?.data?.redemptionCode || 'N/A',
                });
            }
        } catch (error) {
            console.error("Enrollment failed:", error);
            console.log('error.response -> ', error?.response?.data?.error)
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
    }, [contestId, location.search, navigate]);

    useEffect(() => {
        enrollingUser();
    }, [enrollingUser]);

    if (loading) return <Loader />;

    return (
        <Container fluid className="reward-container">
            <div className="reward-box">
                <div className="reward-section">
                    <h1 className="congrats-text">Congratulations!</h1>
                    <img
                        src={reward.giftImageUrl?.includes('media.strapiapp.com') ? reward.giftImageUrl : `${baseUrl}${reward.giftImageUrl}`}
                        alt="reward-image"
                        className="reward-image"
                    />
                </div>

                <p className="won-text">You've won a</p>

                <DescriptionComponent title={reward.giftTitle} worth={reward.giftWorth} description={reward.giftDescription} />

                <p className="redemption-code">
                    Redemption Code: {reward.redemptionCode}
                </p>

                {(reward?.phaseEndDate !== 'N/A') ? <PrizeGiftComponent title="Mega Jackpot" prizeInfo={reward?.jackPotPrize || {}} endDate={reward.phaseEndDate} textBackgroundColor="#4F46E5" imageBackgroundColor="#27218D" /> : null}

                <AvailAndTermsComponent />
            </div>
        </Container>
    );
};

export default RewardComponent;
