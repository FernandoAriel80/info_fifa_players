import jwt from "jsonwebtoken";
export default class TokenService {
  static createToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        username: user.name,
        email: user.email,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );
  }

  static varifyToken(token) {
    const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return user ? user : null;
  }

  static extractToken(request) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new Error("Invalid token format");
    }

    return authHeader.substring(7);
  }
}
