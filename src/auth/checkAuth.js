"use strict";

const { findById } = require("../services/apiKey.service");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};
const apiKey = async (req, res, next) => {
  const key = req.headers[HEADER.API_KEY]?.toString();
  if (!key) {
    return res.status(403).json({ message: "Forbidden Error" });
  }

  const objKey = await findById(key);
  if (!objKey) {
    return res.status(403).json({ message: "Forbidden Error" });
  }

  req.objKey = objKey;

  return next();
};

// closure -> return 1 ham su dung cac bien cua parents
const permissions = (permissions) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({ message: "Permission Denied" });
    }

    const hasPermission = req.objKey.permissions.includes(permissions);
    if (!hasPermission) {
      return res.status(403).json({ message: "Permission Denied" });
    }

    return next();
  };
};

module.exports = {
  apiKey,
  permissions,
};
