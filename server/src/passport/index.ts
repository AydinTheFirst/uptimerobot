import passport from "passport";
import "./bearer";
import "./local";

export const isLoggedIn = passport.authenticate("bearer", {
  session: false,
});

export default passport;
