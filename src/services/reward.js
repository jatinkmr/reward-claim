// const axios = require('axios');
import axios from 'axios';
const { contestEnrollmentUrl, allocatingGiftUrl } = require('./index');

const enrollService = async reqBody => {
    return await axios.post(contestEnrollmentUrl, reqBody)
};

const allocatingGiftService = async reqBody => {
    return await axios.post(allocatingGiftUrl, reqBody)
};


export {
    enrollService, allocatingGiftService
}
