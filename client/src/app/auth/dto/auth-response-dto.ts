import { User } from "../../shared/models/user-model";

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}