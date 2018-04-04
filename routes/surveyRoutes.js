const _ = require('lodash');
const Path = require('path-parser').default;
// integrated in node system - used to parse URLs
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
// if required directly there'll be an issue with testing mongoose
const Survey = mongoose.model('surveys');

// Create survey and send a big email (many recipients)
module.exports = app => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    // using path parser here
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ url, email }) => {
        const match = p.test(new URL(url).pathname);

        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            // _id is used in moongose || .exec executes the query
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();
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
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
