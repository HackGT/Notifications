var express = require('express');
var router = express.Router();

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
      console.log("Notification saved");
      res.json(notif);
    }
  });
});

module.exports = router;
