import { IUser } from "./mongodb/userSchema";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      monitorId: string;
    }
  }
}
