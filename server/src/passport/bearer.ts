import passport from "passport";
import { Strategy as Bearer } from "passport-http-bearer";
import { userModel } from "@/mongodb/userSchema.js";

passport.use(
  new Bearer(async (token: string, done: any) => {
    const user = await userModel.findOne({ token });
    if (user == null) {
      return done(null, false);
    }
    return done(null, user, { scope: "all" });
  })
);
