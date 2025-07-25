const baseUrl = process.env.REACT_APP_BASE_URL;

const contestEnrollmentUrl = `${baseUrl}/api/contest-enrollment`;
const allocatingGiftUrl = `${baseUrl}/api/giftallocation/allocate`;

export {
    contestEnrollmentUrl, allocatingGiftUrl, baseUrl
};
