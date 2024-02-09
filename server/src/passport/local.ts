import passport from "passport";
import { Strategy as Local } from "passport-local";
import { userModel } from "@/mongodb/userSchema.js";

passport.use(
  new Local(async (username: string, password: string, done: any) => {
    const user = await userModel.findOne({ username }).lean();
    const ok = user != null && user.password === password;

    if (!ok) {
      return done(null, false, "Invalid username or password!");
    }

    // Success
    return done(null, user);
  })
);
