import { User } from "../shared/models/User.js";

export default class UserRepository {
  constructor() {}

  async findByEmail(email) {
    return User.findOne({
      where: { email },
    });
  }
  async register(data) {
    return User.create(data);
  }
}
