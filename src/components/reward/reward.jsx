import React, { useCallback, useEffect, useState } from "react";
import Loader from "../loader/loader";
import { allocatingGiftService } from "../../services/reward";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { baseUrl } from "../../services";

const RewardComponent = () => {
    const { contestId } = useParams();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("avail");
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
                    giftDescription: response?.data?.data?.gift?.product?.description || response?.data?.data?.product?.description || 'N/A'
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
                        src={`${baseUrl}${reward.giftImageUrl}`}
                        alt="reward-image"
                        className="reward-image"
                    />
                </div>

                <p className="won-text">You've won a</p>
                <div className="prize-card">
                    <h3 className="prize-title">{reward.giftTitle || 'N/A'}</h3>
                    <p className="worth-text">worth ₹{reward.giftWorth || 'N/A'}</p>
                    <hr className="divider" />
                    <p className="description-text">{reward.giftDescription || 'N/A'}</p>
                </div>

                <div className="tab-buttons">
                    <button
                        className={`tab-btn ${activeTab === "avail" ? "active" : ""}`} onClick={() => setActiveTab("avail")}
                    >
                        How to avail
                    </button>
                    <button
                        className={`tab-btn ${activeTab === "terms" ? "active" : ""}`} onClick={() => setActiveTab("terms")}
                    >
                        Terms & Conditions
                    </button>
                </div>

                {activeTab === "avail" && (
                    <div className="instructions">
                        <ol>
                            <li>Open the Prestige Gravity app on your mobile device.</li>
                            <li>
                                Open the Giveaway page in the app, under the "Rewards" section.
                            </li>
                            <li>
                                Go to the gift center located near the Jupiter Block at Prestige Techpark, Bangalore, during operational hours.
                            </li>
                            <li>
                                Bring your smartphone with the Prestige Gravity app, show the prize confirmation screen to the staff and share your UPIN.
                            </li>
                            <li>
                                After verification, the staff will hand over the boAt smartwatch if available on-site.
                            </li>
                            {/* <li>
                                <strong>Deadline:</strong> Redeem your prize by August 30, 2025. Prizes may not be claimable after this date.
                            </li> */}
                        </ol>
                    </div>
                )}

                {activeTab === "terms" && (
                    <div className="instructions">
                        <ol>
                            <li>
                                This prize is non-transferable and non-exchangeable for cash or other items.
                            </li>
                            <li>Only one prize can be redeemed per user ID.</li>
                            <li>
                                Prize availability is on a first-come, first-served basis.
                            </li>
                            <li>
                                The company reserves the right to modify or cancel the prize at any time.
                            </li>
                            <li>
                                Prize must be collected in person with valid identification and UPIN.
                            </li>
                        </ol>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default RewardComponent;
