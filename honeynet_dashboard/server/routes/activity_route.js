const express = require('express');
const router = express.Router();
const { getDetailsOfPis } = require('../controllers/activity_controller');
const { authorization } = require('../utils/tokens');
const { activityPrefix } = require('../Configs');

module.exports = () => {
    router.get(activityPrefix + `/:userId`,  [authorization], getDetailsOfPis);
    
    return router;
};
