import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Table from "../table";
import { encode, decode } from "../utils/tokens";
import { Strategy as BearerStrategy } from "passport-http-bearer";
let usersTable = new Table("users");
let tokensTable = new Table("Tokens");
import { checkPassword } from "../utils/security";

async function configurePassport(app) {
  let configurationObject = {
    usernameField: "email",
    passwordField: "password",
    sessions: false
  };
  passport.use(
    new LocalStrategy(configurationObject, async (email, password, done) => {
      try {
        let user = (await usersTable.find({ email }))[0];
        if (user && user.hash) {
          let matches = await checkPassword(password, user.hash);
          if (matches)
            return done(null, {
              token: encode(
                (await tokensTable.insert({ userid: user.id })).id
              )
            });
          else return done(null, false, { message: "Invalid login" });
        }
      } catch (err) {
        throw err;
      }
    })
  );

  passport.use(
    new BearerStrategy((token, done) => {
      let tokenId = decode(token); //will give you 1, 2, 3, etc.
      if (!tokenId) {
        return done(null, false, { message: "Invalid token" });
      }
      tokensTable
        .getOne(tokenId)
        .then(tokenRecord => {
          return usersTable.getOne(tokenRecord.userid);
        })
        .then(user => {
          if (user) {
            delete user.password;
            return done(null, user); //after this, req.user is SET
          } else {
            return done(null, false, { message: "Invalid token" });
          }
        })
        .catch(err => {
          return done(err);
        });
    })
  );

  app.use(passport.initialize()); //pass in the express application; turn on passport and use it
}

export default configurePassport;
