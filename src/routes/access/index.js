"use strict";

const express = require("express");
const router = express.Router();
const accessController = require("../../controller/access.controller");
const { asyncHandler } = require("../../auth/checkAuth");

// signUp
router.post("/shop/sign-up", asyncHandler(accessController.signUp));

module.exports = router;
