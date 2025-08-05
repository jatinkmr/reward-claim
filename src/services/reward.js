import axios from 'axios';
import { allocatingGiftUrl, contestEnrollmentUrl } from '.';

const enrollService = async reqBody => {
    return await axios.post(contestEnrollmentUrl, reqBody)
};

const allocatingGiftService = async reqBody => {
    return await axios.post(allocatingGiftUrl, reqBody)
};


export {
    enrollService, allocatingGiftService
}
