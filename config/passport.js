var passportFacebook  = require('passport-facebook'),
    LocalStrategy     = require('passport-local').Strategy,
    passportGoogle    = require('passport-google-oauth'),
    User              = require('../app/models/user');


module.exports = function(passport) {
  passport.serializeUser(function(user, next) {
    next(null, user.id);
  });

  passport.deserializeUser(function(id, next) {
    User.findById(id, function(err, user) {
      next(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, next) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return next(err); }
      else if (user) {
        return next(null, false, { message: 'Email already in use.' });
      }
      else {
        var user = new User({
          email: email,
          password: password,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        });

        user.save(function(err, user) {
          if (err)
            throw err;
            return next(null, user);
        });
      }
    });
  }
  ));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, next) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return next(err); }
      if (!user) {
        return next(null, false, { message: 'No user found with this Email' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect email/password supplied.' })
      }
      return next(null, user);
    });
  }
  ));
}
