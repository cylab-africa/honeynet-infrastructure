const { getUser, saveUser } = require('../models/user');
const uuid = require('uuid');
const { hashPassword, validatePasswordStrength, validateEmail } = require("../utils/email_pass_validations");
const { successResponse, errorResponse } = require("../utils/responses");
const dotenv = require('dotenv');

dotenv.config();

/* User creation function */
const createUser = async (req, res) => {
    const { email, password, institution } = req.body;

    const emailCheck = validateEmail(email);
    const passwordStrength = validatePasswordStrength(password);

    if (!emailCheck) {
        errorResponse(res, 400, "Invalid email provided!");
    } else if (!passwordStrength) {
        errorResponse(res, 400, "Password must be eight or characters, contain upper and lowercase letters, digits and symbols!");
    } else {
        const userId = uuid.v1();
        const hashedPassword = hashPassword(password, process.env.SALT);
        const joinDate = new Date();

        getUser(email)
            .then(user => {
                if (user.length === 0) {
                    saveUser(userId, email, hashedPassword, institution, joinDate)
                        .then(result => {
                            successResponse(res, 200, "User creation successful!");
                        })
                        .catch((err) => {
                            console.error(err);
                            errorResponse(res, 400, "User creation unsuccessful");
                        });
                } 
                else {
                    errorResponse(res, 400, "User already exists. Please proceed to login!");
                };
            })
            .catch((err) => {
                console.error(err);
            });
    };
};

module.exports = { createUser };
