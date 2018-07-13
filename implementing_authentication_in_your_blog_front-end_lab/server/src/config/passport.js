import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Table from "../table";
import { encode, decode } from "../utils/tokens";
import { Strategy as BearerStrategy } from "passport-http-bearer";
let usersTable = new Table("users");
let tokensTable = new Table("Tokens");

function configurePassport(app) {
  passport.use(
    //configuring local strategy and using it at once
    new LocalStrategy(
      {
        //the configuration object
        usernameField: "email",
        passwordField: "password",
        sessions: false
      },
      (email, password, done) => {
        //the verify callback
        //this is a gap
        usersTable
          .find({ email })
          .then(results => {
            return results[0];
          })
          .then(result => {
            //result is the user we found
            if (result && result.password && result.password === password) {
              //we found a user in the db with the same email and password
              //here, we would generate a token of some kind
              tokensTable
                .insert({
                  userid: result.id
                })
                .then(idObj => {
                  return encode(idObj.id); //encode 1, 2, 3, ...
                })
                .then(tokenValue => {
                  return done(null, { token: tokenValue });
                });
              //done is an alias for the authenticate method in auth.js
            } else {
              return done(null, false, { message: "Invalid login" });
            }
          })
          .catch(err => {
            return done(err);
          });
      }
    )
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
