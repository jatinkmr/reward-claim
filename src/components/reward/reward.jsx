import { useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const RewardComponent = () => {
    const { contestId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");

        if (!contestId && !token) {
            navigate("/error", {
                state: {
                    error: {
                        status: 400,
                        message: "Missing Required Parameters",
                        details: "Both contest ID and authentication token are required to access this reward page. Please ensure you have a valid link with both parameters."
                    }
                }
            });
            return;
        }

        if (!contestId) {
            navigate("/error", {
                state: {
                    error: {
                        status: 400,
                        message: "Invalid Contest ID",
                        details: "The contest ID is missing from the URL. Please check your link and ensure it contains a valid contest identifier."
                    }
                }
            });
            return;
        }

        if (!token) {
            navigate("/error", {
                state: {
                    error: {
                        status: 401,
                        message: "Authentication Token Required",
                        details: "Your authentication token is missing. This could happen if the link has expired or was not properly generated. Please request a new link."
                    }
                }
            });
            return;
        }

        // Validate token format (basic validation)
        if (token.length < 10) {
            navigate("/error", {
                state: {
                    error: {
                        status: 401,
                        message: "Invalid Authentication Token",
                        details: "The provided authentication token appears to be invalid or corrupted. Please ensure you're using the correct link."
                    }
                }
            });
            return;
        }

        localStorage.setItem('token', token);

        navigate(`/contest/${contestId}/gift`);
    }, [contestId, location.search, navigate]);
};

export default RewardComponent;
