import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import { encode, decode } from "../utils/tokens";
import Table from "../table";
let usersTable = new Table("users");
let tokensTable = new Table("tokens");

function configurePassport(app) {
  console.log('I am in configurePassport');
  let confObj = {
    usernameField: "email",
    passwordField: "password",
    sessions: false
  };
  let localStrategy = new LocalStrategy(
    confObj,
    async (email, password, done) => {
      try {
        console.log('I am in local strategy');
        let user = (await usersTable.find({ email }))[0];
        if (user && user.password && user.password === password) {
          let tokenId = await tokensTable.insert({ userid: user.id }).id;
          let tokenValue = await encode(tokenId);
          done(null, { token: tokenValue });
        } else return null, false, { message: "Invalid Login" };
      } catch (err) {
        return done(err);
      }
    }
  );
  passport.use(localStrategy);

  let bearerStrategy = new BearerStrategy(async (token, done) => {
    console.log('I am in bearer strategy');
    try {
      let tokenId = decode(token);
      console.log(`I have a token it is ${tokenId}`);
      if (!tokenId) return done(null, false, { message: "Invalid token" });
      let tokenRecord = await tokensTable.getOne(tokenId);
      let userRecord = await usersTable.getOne(tokenRecord.userid);
      if (userRecord) {
        delete userRecord.password;
        return done(null, user);
      } else return done(null, false, { message: "Invalid token" });
    } catch (err) {
      return done(err);
    }
  });
  passport.use(bearerStrategy);

  app.use(passport.initialize());
}

export default configurePassport;
