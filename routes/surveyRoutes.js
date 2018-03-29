const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// if required directly there'll be an issue with testing mongoose
const Survey = mongoose.model('surveys');

// Create survey and send a big email (many recipients)
module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });
  // 1. user must be logged in
  // 2. user has enough credits to send a survey
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      // _user points to user that owns this particular survey
      _user: req.user.id,
      dateSent: Date.now()
    });

    // send the email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      // persist survey to db
      await survey.save();
      // subtract credits when survey has been sent
      req.user.credits -= 1;
      const user = await req.user.save;
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
