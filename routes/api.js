var express = require('express');
var router = express.Router();
var request = require('superagent');

var config = require('../config.json');


var AuthService = require('../services/AuthService');

var Notification = require('../models/Notification.js');

var twilioClient = require('twilio')(config.twilioAccountSid, config.twilioAuthToken);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/notifications', function(req, res) {
  Notification.find({}).sort({date: 'descending'}).exec(function(err, notifs) {
      if (err) {
        res.send(400, err);
      } else {
        res.json(notifs);
      }
  });
});

router.post('/notifications', function(req, res) {
  var newNotif = new Notification(req.body);
  newNotif.save(function(err, notif) {
    if (err) {
      res.send(400, err);
    } else {
      sendPush(notif);
      sendTexts(notif, req.session.token);
      res.json(notif);
    }
  });
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  AuthService.login(email, password)
    .then(function(token) {
      req.session.token = token;
      res.redirect('/console');
    })
    .catch(function(err) {
      res.error(err);
    });
});

var sendPush = function(notif) {
  request.post('https://onesignal.com/api/v1/notifications')
  .send({
    "app_id": config.onesignalAppID,
    "included_segments": ["All"],
    "headings": {"en": notif.title},
    "contents": {"en": notif.description}
  })
  .set('Content-Type', 'application/json')
  .set('Authorization', config.onesignalAPIKey)
  .end(function(err, response) {
    if (err || !response) {
      console.error(err);
    } else {
      console.log(response.body);
    }
  });
}

var sendTexts = function(notif, token) {
  request.get('https://apply.hackgt.com/api/contact/sms')
  .set('Content-Type', 'application/json')
  .set('x-access-token', token)
  .end(function(err, response) {
    response.body.forEach(function(user) {
      var options = {
        to: user.confirmation.phoneNumber,
        from: config.notificationPhoneNumber,
        body: "[HackGT] " + notif.title + " - " + notif.description
      };

      twilioClient.sendMessage(options, function(err, twilioResponse) {
        if (err) {
          console.error(err);
        } else {
          console.log(twilioResponse);
        }
      });

    });
  });
}

module.exports = router;
