const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
// if required directly there'll be an issue with testing mongoose
const Survey = mongoose.model('surveys');

// Create survey and send a big email (many recipients)
module.exports = app => {
  // 1. user must be logged in
  // 2. user has enough credits to send a survey
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipient } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      // _user points to user that owns this particular survey
      _user: req.user.id,
      dateSent: Date.now()
    });
  });
};
