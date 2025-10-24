import TokenService from "../shared/service/token-service.js";

export default class ValidateAndRenewTokenUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(request) {
    const token = TokenService.extractToken(request);
    const payload = TokenService.varifyToken(token);

    if (!payload) throw new Error("Token is invalid");

    const user = await this.userRepository.findByEmail(payload.email);
    if (!user) throw new Error("User not found");

    const userPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const newToken = TokenService.createToken(userPayload);

    return {
      access_token: newToken,
      user: userPayload,
      expires_in: 3600,
      valid: true,
    };
  }
}
