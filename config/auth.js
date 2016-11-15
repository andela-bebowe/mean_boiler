module.exports = function(router, passport) {
  router.post('/signup',
    passport.authenticate('local-signup', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/profile');
    }
  );

  router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.html', {
      user: req.user
    });
  });

  router.get('/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.post('/login',
    passport.authenticate('local-login', { failureRedirect: '/' }),
    function(req, res) { res.redirect('/profile');}
  );
}

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
