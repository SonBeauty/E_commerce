"use strict";
const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const reasonStatusCode = {
  OK: "OK",
  CREATED: "Resource created successfully",
};

class SuccessResponse {
  constructor({ message, statusCode = StatusCode.OK, metadata = {} }) {
    this.statusCode = statusCode;
    this.message = !message ? reasonStatusCode[statusCode] : message;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.statusCode).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata = {} }) {
    super({ message, statusCode: StatusCode.OK, metadata });
  }
}

class CREATED extends SuccessResponse {
  constructor({ message, metadata = {} }) {
    super({ message, statusCode: StatusCode.CREATED, metadata });
  }
}

module.exports = { OK, CREATED, SuccessResponse };
