import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const NotFound = () => {
    return (
        <Container fluid className="text-center d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
            <Row>
                <Col className="text-center">
                    <div className="div404">
                        <h1 className="display-2 text-muted">404</h1>
                        <p className="h5 text-secondary">Nothing to see here...</p>
                        <hr className="my-4" />
                        <p className="lead">Oops! The page you're looking for doesn't exist.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
