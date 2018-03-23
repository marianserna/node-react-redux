const passport = require('passport');

module.exports = app => {
  // -> gets code
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // -> code already exists: exchanges code for user profile
  app.get('/auth/google/callback', passport.authenticate('google'));

  // For Facebook
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['email']
    })
  );

  app.get('/auth/facebook/callback', passport.authenticate('facebook'));

  app.get('/api/logout');

  // totally making out route to test req.user and make sure user is logged in
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
