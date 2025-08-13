import axios from 'axios';
import { allocatingGiftUrl, contestEnrollmentUrl, phaseEnrollmentUrl } from './routes';

const enrollService = async reqBody => {
    return await axios.post(contestEnrollmentUrl, reqBody)
};

const allocatingGiftService = async reqBody => {
    return await axios.post(allocatingGiftUrl, reqBody)
};

const fetchPhaseService = async reqBody => {
    return await axios.post(phaseEnrollmentUrl, reqBody);
}


export {
    enrollService, allocatingGiftService, fetchPhaseService
}
