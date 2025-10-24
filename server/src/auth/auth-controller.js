export default class AuthController {
  constructor(loginUseCase, validateAndRenewTokenUseCase) {
    this.loginUseCase = loginUseCase;
    this.validateAndRenewTokenUseCase = validateAndRenewTokenUseCase;
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUseCase.execute(email, password);

      return res.status(201).json({
        message: "User successfully login",
        user: result.user,
        token: result.access_token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error", error });
    }
  }

  async refreshToken(req, res) {
    try {
      const result = await this.validateAndRenewTokenUseCase.execute(req);

      return res.status(201).json({
        message: "Successfully refresh token",
        user: result.user,
        token: result.access_token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error", error });
    }
  }
}
