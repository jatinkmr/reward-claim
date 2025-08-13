// Error handling service for reward claim application
export const ErrorTypes = {
    // Authentication & Authorization Errors
    AUTH_TOKEN_MISSING: {
        status: 401,
        message: "Authentication Token Required",
        details: "Your authentication token is missing. This could happen if the link has expired or was not properly generated. Please request a new link."
    },
    AUTH_TOKEN_INVALID: {
        status: 401,
        message: "Invalid Authentication Token",
        details: "The provided authentication token appears to be invalid or corrupted. Please ensure you're using the correct link."
    },
    AUTH_TOKEN_EXPIRED: {
        status: 401,
        message: "Authentication Token Expired",
        details: "Your authentication token has expired. Please request a new link to access your rewards."
    },
    ACCESS_DENIED: {
        status: 403,
        message: "Access Denied",
        details: "You don't have permission to access this resource. Please contact support if you believe this is an error."
    },

    // Contest & Reward Related Errors
    CONTEST_NOT_FOUND: {
        status: 404,
        message: "Contest Not Found",
        details: "The requested contest could not be found. It may have been removed or the contest ID is incorrect."
    },
    CONTEST_EXPIRED: {
        status: 410,
        message: "Contest Has Expired",
        details: "This contest has ended and is no longer accepting entries. Please check for other active contests."
    },
    CONTEST_NOT_STARTED: {
        status: 400,
        message: "Contest Not Yet Started",
        details: "This contest has not started yet. Please check back later when the contest becomes active."
    },
    REWARD_ALREADY_CLAIMED: {
        status: 409,
        message: "Reward Already Claimed",
        details: "You have already claimed your reward for this contest. Each user can only claim one reward per contest."
    },
    REWARD_NOT_AVAILABLE: {
        status: 404,
        message: "Reward Not Available",
        details: "The requested reward is no longer available. It may have been claimed by another user or removed from the contest."
    },
    INSUFFICIENT_POINTS: {
        status: 400,
        message: "Insufficient Points",
        details: "You don't have enough points to claim this reward. Please participate in more activities to earn additional points."
    },

    // Network & Server Errors
    NETWORK_ERROR: {
        status: 503,
        message: "Network Connection Error",
        details: "Unable to connect to our servers. Please check your internet connection and try again."
    },
    SERVER_ERROR: {
        status: 500,
        message: "Internal Server Error",
        details: "An unexpected error occurred on our servers. Our team has been notified and is working to resolve this issue."
    },
    SERVICE_UNAVAILABLE: {
        status: 503,
        message: "Service Temporarily Unavailable",
        details: "Our service is temporarily unavailable due to maintenance. Please try again in a few minutes."
    },
    RATE_LIMIT_EXCEEDED: {
        status: 429,
        message: "Too Many Requests",
        details: "You've made too many requests in a short time. Please wait a moment before trying again."
    },

    // Validation Errors
    INVALID_CONTEST_ID: {
        status: 400,
        message: "Invalid Contest ID",
        details: "The contest ID is missing or contains invalid characters. Please check your link and ensure it contains a valid contest identifier."
    },
    INVALID_USER_ID: {
        status: 400,
        message: "Invalid User ID",
        details: "The user ID provided is invalid or missing. Please ensure you're logged in with a valid account."
    },
    INVALID_REQUEST_DATA: {
        status: 400,
        message: "Invalid Request Data",
        details: "The data provided in your request is invalid or incomplete. Please check all required fields and try again."
    },
    MISSING_REQUIRED_PARAMS: {
        status: 400,
        message: "Missing Required Parameters",
        details: "Some required parameters are missing from your request. Please ensure all necessary information is provided."
    },

    // File & Media Errors
    FILE_TOO_LARGE: {
        status: 413,
        message: "File Too Large",
        details: "The file you're trying to upload is too large. Please choose a smaller file or compress it before uploading."
    },
    INVALID_FILE_TYPE: {
        status: 400,
        message: "Invalid File Type",
        details: "The file type you're trying to upload is not supported. Please use a supported file format."
    },
    FILE_UPLOAD_FAILED: {
        status: 500,
        message: "File Upload Failed",
        details: "Failed to upload your file. Please try again or contact support if the problem persists."
    },

    // User Account Errors
    USER_NOT_FOUND: {
        status: 404,
        message: "User Not Found",
        details: "The user account could not be found. Please check your login credentials or contact support."
    },
    ACCOUNT_SUSPENDED: {
        status: 403,
        message: "Account Suspended",
        details: "Your account has been suspended. Please contact support for more information about your account status."
    },
    EMAIL_NOT_VERIFIED: {
        status: 403,
        message: "Email Not Verified",
        details: "Please verify your email address before claiming rewards. Check your inbox for a verification link."
    },

    // Generic Errors
    UNKNOWN_ERROR: {
        status: 500,
        message: "An Unexpected Error Occurred",
        details: "Something went wrong that we didn't expect. Please try again later or contact support if the problem persists."
    },
    TIMEOUT_ERROR: {
        status: 408,
        message: "Request Timeout",
        details: "Your request took too long to process. Please try again or contact support if the problem continues."
    }
};

// Helper function to get error by type
export const getErrorByType = (errorType) => {
    return ErrorTypes[errorType] || ErrorTypes.UNKNOWN_ERROR;
};

// Helper function to create custom error
export const createCustomError = (status, message, details) => {
    return {
        status: status || 500,
        message: message || "An unexpected error occurred",
        details: details || "Please try again later or contact support."
    };
};

// Helper function to handle API errors
export const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const data = error.response.data;

        switch (status) {
            case 400:
                return createCustomError(400, "Bad Request", data?.message || "Invalid request data provided");
            case 401:
                return ErrorTypes.AUTH_TOKEN_INVALID;
            case 403:
                return ErrorTypes.ACCESS_DENIED;
            case 404:
                return ErrorTypes.CONTEST_NOT_FOUND;
            case 409:
                return ErrorTypes.REWARD_ALREADY_CLAIMED;
            case 429:
                return ErrorTypes.RATE_LIMIT_EXCEEDED;
            case 500:
                return ErrorTypes.SERVER_ERROR;
            case 503:
                return ErrorTypes.SERVICE_UNAVAILABLE;
            default:
                return createCustomError(status, "Request Failed", data?.message || "An error occurred while processing your request");
        }
    } else if (error.request) {
        // Network error
        return ErrorTypes.NETWORK_ERROR;
    } else {
        // Other error
        return ErrorTypes.UNKNOWN_ERROR;
    }
};

// Helper function to validate contest ID format
export const validateContestId = (contestId) => {
    if (!contestId) return false;
    return /^[a-zA-Z0-9-_]+$/.test(contestId);
};

// Helper function to validate token format
export const validateToken = (token) => {
    if (!token) return false;
    return token.length >= 10;
};
