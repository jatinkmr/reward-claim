import React, { useEffect, useState } from "react";
import Loader from "../loader/loader";
import { enrollService } from "../../services/reward";
import { useLocation, useParams } from "react-router-dom";
import { Container } from "reactstrap";

const RewardComponent = () => {
    const { contestId } = useParams();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("avail");
    const [loading, setLoading] = useState(false);
    const [reward, setReward] = useState({});

    const enrollingUser = async () => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");

        setLoading(true);
        try {
            const reqBody = { token, contestId };
            console.log("reqBody -> -> ", reqBody);
            // const response = await enrollService(reqBody);
            // console.log(response);
            setReward({
                imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/046/829/689/small_2x/smart-watch-isolated-on-transparent-background-png.png",
                title: "boAt Wave Magma",
                worth: "5000",
                description: 'Smartwatch with 1.96" HD Display, 100+ Sports Modes, IP68 Dust & Water Resistance'
            })
        } catch (error) {
            console.error("Enrollment failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const enroll = async () => {
            await enrollingUser();
        };
        enroll();
    }, []);

    if (loading) return <Loader />;

    return (
        <Container fluid className="reward-container">
            <div className="reward-box">
                <div className="reward-section">
                    <h1 className="congrats-text">Congratulations!</h1>
                    <img
                        src={reward.imageUrl}
                        alt="Smartwatch"
                        className="reward-image"
                        style={{ maxWidth: "300px", marginTop: "20px" }}
                    />
                </div>
                <p className="won-text pt-4">You've won a</p>
                <div className="prize-card">
                    <h3 className="prize-title">{reward.title}</h3>
                    <p className="worth-text">worth ₹{reward.worth}</p>
                    <hr className="divider" />
                    <p className="description-text">{reward.description}</p>
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
                            <li>
                                <strong>Deadline:</strong> Redeem your prize by August 30, 2025. Prizes may not be claimable after this date.
                            </li>
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
