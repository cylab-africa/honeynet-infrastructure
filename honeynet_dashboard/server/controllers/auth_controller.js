const { getUser } = require('../models/user');
const { verifyPassword } = require("../utils/email_pass_validations");
const { errorResponse } = require("../utils/responses");
const dotenv = require('dotenv');
const { generateToken } = require('../utils/tokens');

dotenv.config();

/* Get cookie function */
const userAuth = async (req, res) => {
    const { email, password } = req.body;

    await getUser(email)
        .then(user => {
            if (user.length === 0) {
                errorResponse(res, 400, "Incorrect email entered!");
            } else {
                const hashedPassword = user[0].password;
                const hashStatus = verifyPassword(password, hashedPassword);

                if (hashStatus) {
                    const token = generateToken(user[0].user_id, '5h');
                    const expTimeInHours = 5;
                    const expDate = new Date();
                    expDate.setTime(expDate.getTime() + expTimeInHours * 60 * 60 * 1000);

                    res.cookie("authCookie", token, {
                        path: "/",
                        expires: expDate,
                        httpOnly: true,
                        // secure: true,
                        sameSite: 'strict',
                        signed: true
                    }).json()
                } else {
                    errorResponse(res, 400, "Incorrect password entered");
                };
            };
        })
        .catch(err => {
            console.error(err);
        });
};

/* Verify cookie function */
const verifyCookie = async (req, res) => {
    if (req?.signedCookies?.authCookie) {
        res.send({ isAuthenticated: true });
    } else {
        res.clearCookie('authCookie');
        res.send({ isAuthenticated: false });
    };
};

module.exports = { userAuth, verifyCookie };
