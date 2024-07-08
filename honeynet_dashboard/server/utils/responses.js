function successResponse (response, status, responseMessage, payload = null) {
    return response.json({ status, message: responseMessage, payload });
};

function errorResponse (response, status, responseError) {
    return response.json({ status, message: responseError });
};

const emptyResponse = (response, status) => {
    return response.status(status).json({});
};

module.exports = { successResponse, errorResponse, emptyResponse };
