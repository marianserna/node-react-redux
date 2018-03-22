const express = require('express');
require('./services/passport');

const app = express();

// require statement returns a function which is immediately called with the app object
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
