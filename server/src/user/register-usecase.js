import PasswordService from "../shared/service/password-service.js";
import TokenService from "../shared/service/token-service.js";
export default class RegisterUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.passwordService = new PasswordService();
  }
  async execute(data) {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw new Error("Email already registered");

    const passwordHashed = await this.passwordService.hashPassword(data.password);
    if (!passwordHashed) throw new Error("Error to hash password");

    const user = await this.userRepository.register({
      ...data,
      password: passwordHashed,
    });
    if (!user) throw new Error("Error to create user");

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const accessToken = TokenService.createToken(userPayload)
    if (!accessToken) throw new Error("Error to create token");

    return {
      access_token: accessToken,
      user: userPayload,
      expires_in: 3600,
    };
  }
}
