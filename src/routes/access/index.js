"use strict";

const express = require("express");
const router = express.Router();
const accessController = require("../../controller/access.controller");
const { asyncHandler } = require("../../auth/checkAuth");

// signUp
router.post("/shop/sign-up", asyncHandler(accessController.signUp));
router.post("/shop/login", asyncHandler(accessController.login));

//authentication
router.post('/shop/logout', asyncHandler(accessController.))
module.exports = router;
