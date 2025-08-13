import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { ImageSectionComponent } from "../index";
import { useCallback, useEffect, useState } from "react";
import { fetchPhaseService } from "../../services";

const PhaseEnrollmentComponent = () => {
    const { contestId } = useParams();
    const [loading, setLoading] = useState(false);

    const fetchPhaseEnrollment = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            const reqBody = { token, contestId };

            const response = await fetchPhaseService(reqBody);
            console.log('response -> ', response)
        } catch (error) {
            console.log('error -> ', error)
        } finally {
            setLoading(false);
        }
    }, [contestId]);

    useEffect(() => {
        fetchPhaseEnrollment();
    }, [fetchPhaseEnrollment])

    return (
        <>
            <Container fluid className="reward-container">
                <div className="reward-box">
                    <ImageSectionComponent imageUrl="" headingText="Jackpot Entry Confirmed" />
                </div>
            </Container>
        </>
    )
};

export default PhaseEnrollmentComponent;
