const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const { errorResponse } = require("./responses");

dotenv.config();

/* Generate a json web token */
const generateToken = (userId, expiration) => {
    const payload = {
        user_id: userId
    };

    const secretKey = process.env.SECRET_KEY;
    const options = { expiresIn: expiration };

    return jwt.sign(payload, secretKey, options);
};

/* Verify a json web token */
const authorization = async (req, res, next) => {
    
    try {
        if (!req.signedCookies['authCookie']) {
            console.log("Cookie not found!\n", error)
            errorResponse(res, 401, "Unauthorized Access!!");
        } else {
            const secretKey = process.env.SECRET_KEY;
            const token = req.signedCookies['authCookie'];

            if (!token) {
                errorResponse(res, 404, "No token provided");
            } else {
                jwt.verify(token, secretKey);
                next();
            };
        };
    } catch (error) {
        console.log("Error decoding token!\n", error)
        errorResponse(res, 401, "Unauthorized Access!!");
    };
};

module.exports = { generateToken, authorization };
