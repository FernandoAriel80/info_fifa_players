export default class UserController {
  constructor(registerUseCase) {
    this.registerUseCase = registerUseCase;
  }

  async register(req, res) {
    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      const result = await this.registerUseCase.execute(data);
      return res.status(201).json({
        message: "User successfully registered",
        user: result.user,
        token: result.access_token,
      });
    } catch (error) {
        console.error(error)
       return res.status(500).json({ msg: 'Server error', error });
    }
  }
}
