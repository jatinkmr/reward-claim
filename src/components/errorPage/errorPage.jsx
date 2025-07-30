import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Alert, Card, CardBody, CardTitle,
    // Button, Badge 
} from 'reactstrap';

const ErrorPage = () => {
    const location = useLocation();

    const fallbackError = {
        status: 500,
        message: "An unexpected error occurred.",
        details: "Please try again later or contact support."
    };

    const [currentError, setCurrentError] = useState(fallbackError);

    useEffect(() => {
        if (location.state?.error) {
            setCurrentError(location.state.error);
        }
    }, [location.state]);

    // // Different error scenarios for demonstration
    // const errorScenarios = [
    //     {
    //         status: 404,
    //         message: "The requested resource could not be found on this server.",
    //         details: "Please check the URL and try again, or contact support if the problem persists."
    //     },
    //     {
    //         status: 500,
    //         message: "Internal server error occurred while processing your request.",
    //         details: "Our team has been notified and is working to resolve this issue. Please try again later."
    //     },
    //     {
    //         status: 403,
    //         message: "Access denied. You don't have permission to access this resource.",
    //         details: "Please log in with appropriate credentials or contact your administrator."
    //     },
    //     {
    //         status: 429,
    //         message: "Too many requests. Rate limit exceeded.",
    //         details: "Please wait a moment before making another request."
    //     },
    //     {
    //         status: 401,
    //         message: "Authentication required to access this resource.",
    //         details: "Please log in to continue or check your authentication credentials."
    //     }
    // ];

    const getErrorColor = (status) => {
        if (status >= 500) return 'danger';
        if (status >= 400) return 'warning';
        return 'info';
    };

    const getErrorIcon = (status) => {
        if (status === 404) return '🔍';
        if (status >= 500) return '⚠️';
        if (status === 403) return '🔒';
        if (status === 429) return '⏱️';
        if (status === 401) return '🔐';
        return '❌';
    };

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <Row className="w-100 justify-content-center">
                <Col xs={12} md={8} lg={6} xl={5}>
                    <Card className="shadow-lg border-0">
                        <CardBody className="p-5 text-center">
                            {/* Error Icon and Status */}
                            <div className="mb-4">
                                <div style={{ fontSize: '4rem' }} className="mb-3">
                                    {getErrorIcon(currentError.status)}
                                </div>
                                {/* <Badge
                                    color={getErrorColor(currentError.status)}
                                    pill
                                    className="fs-6 px-3 py-2"
                                >
                                    Error {currentError.status}
                                </Badge> */}
                            </div>

                            {/* Error Message */}
                            <CardTitle tag="h2" className="mb-4 text-dark">
                                Oops! Something went wrong
                            </CardTitle>

                            {/* Error Details */}
                            <Alert
                                color={getErrorColor(currentError.status)}
                                className="text-start mb-4"
                            >
                                <h6 className="alert-heading mb-2">Error Details:</h6>
                                <p className="mb-2">
                                    <strong>Message:</strong> {currentError.message}
                                </p>
                                <p className="mb-0">
                                    <strong>Details:</strong> {currentError.details}
                                </p>
                            </Alert>

                            {/* Demo: Switch Error Types */}
                            {/* <div className="border-top pt-4">
                                <small className="text-muted d-block mb-3">
                                    Demo: Try different error types
                                </small>
                                <div className="d-flex flex-wrap gap-2 justify-content-center">
                                    {errorScenarios.map((error, index) => (
                                        <Button
                                            key={index}
                                            color={currentError.status === error.status ? 'primary' : 'outline-primary'}
                                            size="sm"
                                            onClick={() => setCurrentError(error)}
                                        >
                                            {error.status}
                                        </Button>
                                    ))}
                                </div>
                            </div> */}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ErrorPage;
