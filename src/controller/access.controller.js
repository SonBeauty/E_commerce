class AccessController {
  async signUp(req, res, next) {
    try {
      // Handle sign-up logic

      return res.status(201).json({ code: "20001", metadata: { userid: 1 } });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AccessController();
