import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const NotFound = () => {
    return (
        <Container className="text-center d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <Row>
                <Col>
                    <h1 className="display-1 text-danger">404</h1>
                    <p className="lead">Oops! The page you're looking for doesn't exist.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
