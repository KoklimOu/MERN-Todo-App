const apiResponse = (res, status, message, data = null) => {
    const responseObj = {
        status,
        message
    };

    // Only include data if it is not null
    if (data !== null) {
        responseObj.data = data;
    }

    return res.status(status).json(responseObj);
};

module.exports = apiResponse;