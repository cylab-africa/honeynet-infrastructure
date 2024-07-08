const { getUser } = require('../models/user');
const { errorResponse } = require("../utils/responses");
const dotenv = require('dotenv');

dotenv.config();

/* User details function */
const userDetails = async (req, res) => {
    const { email } = req.body;

    await getUser(email)
        .then(user => {
            res.send(user[0].user_id).json();
        })
        .catch(err => {
            console.error(err);
            errorResponse(res, 400, "Error sending details!");
        });
};

/* User logout function */
const userLogout = async (req, res) => {
    res.clearCookie('authCookie').json({
        status: 200,
        message: "Logout successful"
    })
};

module.exports = { userDetails, userLogout };
 