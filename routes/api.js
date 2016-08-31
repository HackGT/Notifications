var express = require('express');
var router = express.Router();

var AuthService = require('../services/AuthService');

var Notification = require('../models/Notification.js');

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

module.exports = router;
