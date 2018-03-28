const https = require('https');
const fs = require('fs');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// user must be before passport bc of order of execution
require('./models/User');
require('./services/passport');

// connect mongoose to mongodb
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    // how long can cookie exist before it is automatically expired. pass as miliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // encrypt cookie so that ppl cant change the id being stuffed in (Additional level of security)
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// require statement returns a function which is immediately called with the app object
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;

// if (process.env.NODE_ENV === 'production') {
app.listen(PORT);
// } else {
//   const options = {
//     key: fs.readFileSync('/Users/marian/server.key'),
//     cert: fs.readFileSync('/Users/marian/server.crt'),
//     requestCert: false,
//     rejectUnauthorized: false
//   };
//   https.createServer(options, app).listen(PORT);
// }
