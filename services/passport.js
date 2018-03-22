const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // route where user will be sent after they gran permission to app:
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(
        'access token',
        accessToken,
        'refresh token:',
        refreshToken,
        'profile',
        profile
      );
    }
  )
);
