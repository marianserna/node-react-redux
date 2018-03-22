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
};
