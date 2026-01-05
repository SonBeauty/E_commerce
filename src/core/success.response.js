"use strict";

class SuccessResponse extends Success {
  constructor(message, metadata) {
    this.status = "success";
    this.code = 200;
    this.message = message;
    this.metadata = metadata;
  }
}

module.exports = SuccessResponse;
