const LocalStrategy = require("passport-local").Strategy;

const initialize = (passport, userbyEmail, userbyId) => {
  const authenticateUser = (username, password, done) => {};

  passport.use(
    new LocalStrategy({ usernameField: "username" }, authenticateUser)
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
};

module.exports = initialize;
