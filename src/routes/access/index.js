"use strict";

const express = require("express");
const router = express.Router();
const accessController = require("../../controller/access.controller");

// signUp
router.post("/shop/sign-up", async (req, res, next) => {
  accessController.signUp(req, res, next);
});

module.exports = router;
