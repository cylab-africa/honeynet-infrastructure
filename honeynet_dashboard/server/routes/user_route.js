const express = require('express');
const router = express.Router();
const { authorization } = require('../utils/tokens');
const { userDetails, userLogout } = require('../controllers/user_controller');
const { userAuth, verifyCookie } = require('../controllers/auth_controller');
const { userPrefix } = require('../Configs');

module.exports = () => {
    router.post(userPrefix + `/set-cookie`, userAuth);
    router.post(userPrefix + `/get-user-details`, [authorization], userDetails);
    router.get(userPrefix + `/verify-cookie`, verifyCookie);
    router.get(`/logout/:userId`, [authorization], userLogout);
      
    return router;
};
