const express = require("express");
const userRoute = require("./user_route");
const adminRoute = require("./admin_route");
const activityRoute = require("./activity_route");
const { mainPrefix } = require("../Configs");

const router = express.Router();

router.use(express.json());
router.use(mainPrefix, userRoute());
router.use(mainPrefix, adminRoute());
router.use(mainPrefix, activityRoute());

module.exports = router;
