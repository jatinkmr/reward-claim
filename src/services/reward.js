// const axios = require('axios');
import axios from 'axios';
const { contestEnrollment } = require('./index');

const enrollService = async reqBody => {
    return await axios.post(contestEnrollment, reqBody)
};

export {
    enrollService
}
