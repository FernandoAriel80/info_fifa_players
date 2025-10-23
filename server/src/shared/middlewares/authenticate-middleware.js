import TokenService from "../service/token-service";

const authenticateToken = (req, res, next) => {
  try {
    const token = TokenService.extractToken(req);

    if (!token) {
      return res.status(401).json({ message: "Token is required" });
    }

    const user = TokenService.varifyToken(token);
    if (!user) {
      return res.status(403).json({ message: "Token inválido" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Unauthorized: " + error.message });
  }
};

export default authenticateToken;
