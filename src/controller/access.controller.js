const accessService = require("../services/access.service");

const { OK, CREATED, SuccessResponse } = require("../core/success.response");
// Controller for handling access-related requests
class AccessController {
  login = async (req, res) => {
    return new SuccessResponse({
      message: "Login successful",
      metadata: await accessService.login(req.body),
    }).send(res);
  };

  signUp = async (req, res) => {
    return new CREATED({
      message: "User created successfully",
      metadata: await accessService.signUp(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
