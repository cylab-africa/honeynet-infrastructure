const bcrypt = require('bcryptjs');
const passwordValidator = require('password-validator');
const { validate } = require('deep-email-validator');
const dotenv = require('dotenv');

dotenv.config();
const hashPassword = (password) => bcrypt.hashSync(password, Number(process.env.saltRounds));
const verifyPassword = (password, hash) => bcrypt.compareSync(password, hash);

const validatePasswordStrength = (password) => {
    const schema = new passwordValidator();
    schema
        .is().min(8)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().symbols();

    return schema.validate(password);
};

const validateEmail = async (email) => {
    const { valid } = await validate(email);
    return valid;
};

module.exports = { hashPassword, verifyPassword, validatePasswordStrength, validateEmail };
