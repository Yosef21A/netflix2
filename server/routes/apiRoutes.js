const express = require("express");
const {
    trackUserActivity,
    updateSessionRoute,
    checkBlockedIP,
    blockUser
} = require("../controller/apiController");

const router = express.Router();

// Define API endpoints
router.post("/insights/data_54zL", trackUserActivity);
router.post("/sessionUpdate_X92m", updateSessionRoute);
router.get("/is-rest-bot", checkBlockedIP);
router.post("/audit/review", blockUser);

module.exports = router;
