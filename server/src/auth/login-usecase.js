import PasswordService from "../shared/service/password-service.js";
import TokenService from "../shared/service/token-service.js";
import bcrypt from "bcrypt";
export default class LoginUsecase {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.passwordService = new PasswordService();
  }
  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const validPassword = await this.passwordService.comparePassword(
      password,
      user.password
    );
    if (!validPassword) throw new Error("Incorrect password");

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const accessToken = TokenService.createToken(userPayload);
    if (!accessToken) throw new Error("Error to create token");

    return {
      access_token: accessToken,
      user: userPayload,
      expires_in: 3600,
    };
  }
}
