import { useState } from "react";

const AvailAndTermsComponent = () => {
    const [activeTab, setActiveTab] = useState("avail");

    return (
        <>
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
        </>
    )
}

export default AvailAndTermsComponent;
