const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/admin_controller');
const { userPrefix } = require('../Configs');

module.exports = () => {
    // router.post(userPrefix + `/signUp`, createUser);

    return router;
};