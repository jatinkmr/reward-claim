import React from 'react';
import { Spinner } from 'reactstrap';
import './loader.css'

const Loader = () => {
    return (
        <div className="backdrop">
            <div className="container">
                <Spinner color="primary" />
                <p>Loading...</p>
            </div>
        </div>
    );
};

export default Loader;
