const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    // who this email appears to be sent from
    this.from_email = new helper.Email('no-reply@nodereactredux.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    // addContent comes from helper.Mail
    this.addContent(this.body);
    // enable click tracking
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    // send to sendGrid
    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
