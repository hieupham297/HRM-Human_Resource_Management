const express = require("express");
const userRoute = require("./user.route");
const hrmRoute = require("./hrm.route");

const router = express.Router();

router.use("/user", userRoute);
router.use("/hrm", hrmRoute);

module.exports = router;
